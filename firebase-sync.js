/* Fit OS Firebase bridge. No secret keys. Firestore access is enforced by server rules. */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
const config={apiKey:'AIzaSyBRw7TF0kFktFi4Jbj8ntOBeKeUnA957dE',authDomain:'fit-os-private.firebaseapp.com',projectId:'fit-os-private',storageBucket:'fit-os-private.firebasestorage.app',messagingSenderId:'93982135112',appId:'1:93982135112:web:51906eecfdb06107edd97d',measurementId:'G-GLG5KLWM47'};
const app=initializeApp(config),auth=getAuth(app),db=getFirestore(app),provider=new GoogleAuthProvider();
let user=null,unsubscribe=null,cloudReady=false,pending=false,uploadTimer=null,remoteRevision=null,ignoreLocal=false;
const status=document.getElementById('cloudStatus'),login=document.getElementById('cloudLogin'),upload=document.getElementById('cloudUpload'),download=document.getElementById('cloudDownload');
function message(s){status.textContent=s;status.title=s}
function error(e){console.error('Fit OS cloud:',e);message('Cloud error: '+(e?.code||e?.message||'unknown'));}
function path(){return doc(db,'users',user.uid,'documents','fit-os-state')}
function local(){return window.FitOSBridge?.getState()}
function apply(data){ignoreLocal=true;try{window.FitOSBridge?.applyState(data)}finally{ignoreLocal=false}}
async function getRemote(){const snap=await getDoc(path());return snap.exists()?snap.data():null}
async function uploadNow(){if(!user||!cloudReady)return;const payload=local();if(!payload)return;pending=true;message('Uploading changes…');try{await setDoc(path(),{state:payload,revision:crypto.randomUUID(),updatedAt:serverTimestamp()});message('Cloud synced ✓')}catch(e){error(e)}finally{pending=false}}
function scheduleUpload(){if(ignoreLocal||!cloudReady||!user)return;clearTimeout(uploadTimer);uploadTimer=setTimeout(()=>{uploadTimer=null;uploadNow()},950)}
window.FitOSCloud={localChanged:scheduleUpload};
async function start(u){if(unsubscribe){unsubscribe();unsubscribe=null}clearTimeout(uploadTimer);user=u;cloudReady=false;remoteRevision=null;upload.hidden=!u;download.hidden=!u;login.textContent=u?'Sign out':'Google sign-in';if(!u){message('Local only · sign in to sync');return}message('Checking cloud data…');try{const remote=await getRemote();if(remote?.state){message('Cloud data found · choose Restore cloud or Upload local');}else{message('Cloud is empty · click Upload local to start sync');} // Explicit user decision required before enabling cloud writes.
}catch(e){error(e)}}
async function enableListener(){if(unsubscribe)unsubscribe();unsubscribe=onSnapshot(path(),snap=>{if(!snap.exists()||!cloudReady||pending||uploadTimer)return;const v=snap.data();if(v.revision===remoteRevision)return;remoteRevision=v.revision;if(v.state){apply(v.state);message('Cloud synced ✓')}},error)}
login.addEventListener('click',async()=>{if(user){await signOut(auth);return}try{await signInWithPopup(auth,provider)}catch(e){if(e.code==='auth/popup-blocked'){await signInWithRedirect(auth,provider)}else error(e)}});
upload.addEventListener('click',async()=>{if(!user)return;try{const remote=await getRemote();if(remote?.state&&!confirm('Replace the CLOUD copy with this device’s current data? Export JSON backups on both devices first.'))return;if(!confirm('Upload this device’s records to your private cloud? This starts automatic synchronization.'))return;cloudReady=true;await uploadNow();await enableListener();}catch(e){error(e)}});
download.addEventListener('click',async()=>{if(!user)return;try{const remote=await getRemote();if(!remote?.state){message('No cloud backup exists yet');return}if(!confirm('Replace this device’s local Fit OS records with the cloud copy? Export a JSON backup first.'))return;apply(remote.state);cloudReady=true;remoteRevision=remote.revision;await enableListener();message('Restored cloud data · auto-sync active ✓')}catch(e){error(e)}});
getRedirectResult(auth).catch(error);
onAuthStateChanged(auth,start,error);
