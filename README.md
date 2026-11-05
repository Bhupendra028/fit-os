# Fit OS — Android-ready, direct-entry fitness tracker

This release is a drop-in upgrade for the existing `fit-os` GitHub Pages repository. **No Excel file is required to use Fit OS.** All logs, nutrition references and product price changes can be entered directly in the website. The old browser storage key `fit-os-local-v3` is retained to preserve existing records on the same device/browser and origin.

## How to install on Android

1. Upload all files and `assets/` to the **root** of the existing `fit-os` repository, preserving folders. Commit to `main`. Avoid creating `fit-os/fit-os/`.
2. Confirm GitHub Pages is enabled: Settings → Pages → `main` / `(root)`. Open `https://bhupendra028.github.io/fit-os/` in Chrome on Android.
3. In Chrome tap `⋮` → **Install app** (or **Add to Home screen**) and launch **Fit OS** from the phone's launcher. You may also use the **Install Fit OS** button under **Data & Android app**.
4. Log entries inside the app. It works offline after an initial successful network load. Use **Data & Android app → Download full JSON backup** at least weekly.

This is a **Progressive Web App (PWA)**, not a native Android APK or Google Play Store listing. Android Chrome on compatible phones can install it so it appears and launches like an app. Install behavior may depend on Chrome/Android version.

## Logging food like MyFitnessPal

1. **Food database → Add a food or product.** Enter a unique name, reference quantity (example 100 g, 250 ml, 1 egg, or 39 g per scoop), and all nutrients shown on the product's label. Unsupported nutrients can remain blank (unknown).
2. **Food & nutrition → Log food.** Search the saved name and enter the number of servings or the actual quantity in the same unit as its reference record. Nutrients are scaled automatically and added to your day.
3. Use **Food database → Edit label** to change reference values. Entries using that food are recalculated when it is edited.
4. Nutrition page displays calories, protein, carbohydrate, fat, fibre, vitamins A/B/C/D/E/K, calcium, magnesium, zinc, iron, sodium, potassium, omega-3 ALA/EPA/DHA, other micronutrients, and data-coverage counts. **Missing values are unknown, not zeros.**
5. Mess items are approximations: use your actual portion weight and keep raw/cooked food separate. For multi-ingredient meals, log each ingredient or create a custom recipe with the measured total nutrients.

## Other direct entry

**Dashboard:** quick action buttons for meals, workout, weight, football, and +250 ml water.
**Sleep & habits:** log sleep hours, water litres, steps, energy, stress, soreness, skincare, fruit and vegetables.
**Strength:** sets, reps, weights and effort per exercise.
**Football:** minutes, difficulty, distance and notes.
**Body:** weight, estimated body-fat percentage, waist, chest, biceps and more.
**Grocery & budget:** buy-price comparison, direct purchase log, new grocery products and editing prices.
**Supplements:** record items and dosage; if supplement nutrient totals matter, add it to food database as a food item too and log its serving.

## Backups and privacy

Fit OS stores local entries in your browser using localStorage. They are not uploaded to GitHub or to a private server, and **will not automatically synchronize across Android, desktop or a new phone**. Clearing the browser's site data or uninstalling the PWA may erase logs. Export a private JSON backup; on a new device, import the JSON under **Data & Android app**. Optional Excel import/export remains for migration only.

Do **not** upload your JSON/Excel backups to your public GitHub repository. Also remove any personal `.xlsx` tracker previously published under `assets/` if it contains private information. This release intentionally does not include the workbook.

The nutrient library contains a few preloaded product labels from previous screenshots and generic estimates. Labels may be incomplete or differ by SKU or formulation. The app cannot know every food's micronutrients unless a reference is entered or sourced.

## Important

- Food values only as accurate as product labels and weighed servings. Unknown nutrients are represented as unknown; the app does not diagnose deficiencies.
- **No refrigerator:** buy fresh chicken/fish/dairy only if you can keep it safely chilled until consumption; don't batch-store cooked rice.
- The app is offline capable but is not a multi-device cloud-sync service. A cloud version needs authentication, database permissions and a migration plan.
- Initial preset 75 kg and 25% body fat are your estimated baseline; update to measured data over time.


## Firebase private sync (new)

This version adds Google sign-in and Firestore synchronization without changing the existing GitHub Pages URL. Upload the entire ZIP contents into the repository root (not the ZIP itself).

1. In Firebase Authentication enable Google provider and authorize `bhupendra028.github.io`.
2. Publish Firestore rules that permit authenticated users to read/write only `users/{userId}/documents/{documentId}` where `request.auth.uid == userId`.
3. Open Fit OS, click Google sign-in, then **export a JSON backup** from the existing app.
4. On your original device, click **Upload local** to create the first cloud copy. On a second device, sign in with the same Google account and click **Restore cloud**.
5. Once activated on each device, subsequent changes save automatically after a short delay.

**Important limitations:** The app retains localStorage for offline local entry. Offline cloud sync is not guaranteed; changes made while disconnected should be checked after reconnecting. The cloud record is a single document containing the complete app state, so simultaneous edits on two devices can overwrite one another (last write wins). Firestore documents have a 1 MiB limit. Export JSON backups regularly; do not treat cloud sync as a versioned backup. If a save fails, check the status indicator. Avoid concurrent edits until per-entry synchronization is implemented. Google popup login may be restricted in some Android/PWA browsers; sign in using Chrome if necessary. No watch integration is included.

**Security:** The Firebase web API key is public configuration, not a password. Firestore rules must be published and tested. The app does not enable anonymous public writes.
