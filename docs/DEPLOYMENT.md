# Deployment Guide

## 1. Deploying the Frontend to Netlify (via GitHub)

This repository includes a pre-configured `netlify.toml` file with the publish directory (`.`), security headers, and static asset caching rules.

### Option A — Netlify Dashboard (Recommended)

1. Sign in at [app.netlify.com](https://app.netlify.com) using your **GitHub** account.
2. Select **Add new site** → **Import an existing project**.
3. Choose **GitHub** and select **`tarekzerari-dev/Le-Gentleman`**.
4. Confirm the build settings (Netlify reads `netlify.toml` automatically):
   - **Branch to deploy:** `main`
   - **Build command:** *(leave blank)*
   - **Publish directory:** `.` *(or `/`)*
5. Click **Deploy site**.

Every subsequent push to `main` triggers an automatic redeployment.

### Option B — Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=.
```

---

## 2. Deploying the Order Backend (Google Apps Script)

Orders submitted from `order.html` are sent as JSON to a Google Apps Script Web App (`google-app-script/Code.gs`) connected to Google Sheets.

### Setup Steps

1. Create a new **Google Sheet** and name the first tab **`Orders`** *(if omitted, the script automatically falls back to the first sheet)*.
2. Open **Extensions** → **Apps Script**.
3. Replace the default code with the contents of `google-app-script/Code.gs`.
4. Click **Deploy** → **New deployment**.
5. Select **Web app**:
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
6. Authorize permissions and copy the generated **Web app URL** (`/exec`).
7. Paste that URL into `CONFIG.scriptURL` inside `js/config.js`, then commit and push to `main`.

### Sheet Columns Written by `Code.gs`

| Column | Field | Example |
|---|---|---|
| A | `Date` | `2026-11-10T10:00:00.000Z` |
| B | `Nom` | `Mohamed Zerari` |
| C | `Téléphone` | `0561069167` |
| D | `Adresse` | `Rue Didouche Mourad, Alger` |
| E | `Produit` | `Chemise Ralph Lauren Lin Blanche` |
| F | `Taille` | `L` |
| G | `Quantité` | `1` |
| H | `Wilaya` | `16 - Alger` |
| I | `Livraison (DA)` | `300` |
| J | `Prix Total (DA)` | `4300` |

> When the sheet is completely empty (`getLastRow() === 0`), `Code.gs` automatically inserts the header row before appending the first order.
