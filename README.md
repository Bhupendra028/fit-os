# Fit OS

Personal fitness dashboard configured for your IIM Mumbai routine.

A mobile-friendly personal fitness operating system combining nutrition, the IIM Mumbai Monday–Sunday mess rotation, 24 hostel-friendly recipes, strength training, football, sleep/recovery, body measurements, 12-month projections, groceries, actual spending, supplements, micronutrients, and Excel import/export.

**No backend, account, subscriptions, or installation required.** The app runs in a current browser and stores your records in that browser's localStorage. It works on GitHub Pages. A service worker provides caching after initial loading on HTTPS.

## Quick start

1. Unzip the download. Keep `index.html`, `app.js`, `xlsx-lite.js`, `styles.css`, `assets/`, `manifest.webmanifest` and `service-worker.js` together.
2. Open `index.html` in a modern browser. If your browser blocks local files, use GitHub Pages (below).
3. Go to **Excel sync & backup** and choose **Download original Excel template**.
4. Edit the green-ish data cells in the template. Add food entries to **Food Log**, exercises to **Workouts**, sleep/water to **Daily Habits**, measurements to **Measurements**, prices to **Groceries**, and purchases to **Purchases**. Save as `.xlsx`.
5. On the website, go to **Excel sync & backup → Upload** and choose the saved workbook. All detected data and plots update **immediately in that browser**. It also supports the previous IIM Mumbai 20-sheet tracker for the main logs.
6. Alternatively, log directly in the website using the quick-action buttons. Export an updated `.xlsx` when you want to edit in Excel again.
7. Export periodic **JSON** backups as a full-fidelity fallback.

## Deploy to GitHub Pages

1. Create a new repository at GitHub such as `fit-os`.
2. Upload the **contents** of this folder to the root of the repository. Do not upload a ZIP without extracting it.
3. Commit to the `main` branch.
4. Open **Settings → Pages → Build and deployment → Deploy from a branch**, select `main` and `/ (root)`, and save.
5. Your site will appear at `https://<username>.github.io/fit-os/` after GitHub Pages builds it. Open on phone and add to home screen from your mobile browser if supported.

No special build tooling, environment variables, API keys or npm packages are required. The Excel reader/writer is implemented locally in `xlsx-lite.js` using browser-native ZIP/XML support (optimized for ordinary `.xlsx` files, not binary `.xls`).

## What “Excel sync” means

- **Yes:** Excel upload immediately refreshes your dashboard, charts, nutrition and grocery summaries. Logging in the website updates everything immediately on that device. You can export a new Excel workbook.
- **No:** If you change a separate Excel document without uploading it, the website **cannot detect those changes**. There is no real-time bi-directional cloud connection, no automatic multi-device synchronization and no database.
- **Privacy:** Because GitHub Pages is public hosting, do **not** commit your personal Excel exports, medical details or progress photos to a public repository. Private records entered in the app stay in your browser unless you export/share them. Browser storage can be deleted by clearing site data, so maintain backups.
- **Import behavior:** Compatible sheets replace that category's records instead of appending duplicates. Always export a backup before uploading large revisions. Older trackers with renamed columns may require manual cleanup.
- **Precision:** Packaged food nutrition comes from supplied labels where available; mess nutrition and body composition are estimates. Check physical packaging. Invalid or incomplete cells may be ignored. The native Excel exporter keeps app data but does not preserve third-party formatting/formulas in unrelated sheets; keep your original workbook separately.

## Data model / sheets

`START HERE`, `Dashboard`, `Profile`, `Food Library`, `Food Log`, `Daily Habits`, `Workouts`, `Football`, `Measurements`, `Purchases`, `Groceries`, `Recipes`, `Mess Menu`, `Gym Plan`, `Forecast`, `Supplement Log`, `Micros Daily`, `Weekly Review`.

The **starter Excel template** has formula-based nutrition lookups and grocery price calculations; the website export saves normalized values for consistent reimport.

## Your initial settings

- 75 kg, 173 cm, estimated 25% body fat (not verified)
- Starting goals: 140 g protein/day (120–150 g target), 2,700 kcal/day adjustable, 5 gym visits including Wednesday recovery, 2 football sessions.
- First grocery checkout **₹1,176 without whey**, **₹3,575 with optional 1 kg whey**. Seasonal fruit price and delivery charges are still TBD.
- Estimated repeat-week ingredient **usage cost** is calculated from fractions of packs and differs from checkout spending.
- No fridge means no batch-storing raw chicken, cooked rice, fish, dairy, or leftovers. Country Delight product needs refrigeration below 5°C until consumed.

## Features

- Dashboard: KPI cards, macro doughnut, charts, habit progress, recipes, shopping, quick actions
- Food: nutrition library, quantity-based macro and selected micronutrient calculations, recipe logging
- Mess: Monday–Sunday repeating menu and protein strategy
- Recipes: 24 detailed quick meals, salads, rice bowls, oats, chicken, egg, soy and fish options, safety notes
- Gym/football: progressive overload, sets/reps/weights, RPE, match minutes and workload
- Wellness: sleep, water, stress, soreness, skincare, fruit/veg and supplements
- Body: weight, waist, arms, chest and estimated body fat
- Budget: Zepto/Blinkit prices, weekly consumption estimate, first-order amounts, actual spending and purchases
- Analytics: progress lines, nutrition trends and spending pie chart when records exist
- Long-term goals: illustrative 6/9/12-month outcomes, clearly distinguished from actual results
- Backup: `.xlsx`, `.json`, and food CSV downloads, `.xlsx`/`.json` imports

## Browser support

Chrome/Edge/modern Chromium browsers are recommended for importing compressed `.xlsx`. Excel XML extraction uses native `DecompressionStream('deflate-raw')`; older browsers may not support it. No personal data is sent to a server by the app itself.
