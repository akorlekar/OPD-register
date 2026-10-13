# OPD Register — laptop app

Clinic reception software: patient registration, diagnosis and history, treatment and payments, pending balances, today's cash, multiple staff logins.

Default login: **Aparna / PIN 1234**. Add your own staff on the login screen ("+ Add new staff login"), then remove the default one from the **Backup** tab.

All patient data stays on the laptop. Nothing is ever uploaded to GitHub or the internet.

---

## Way 1 — Use it right now (no install)

1. Unzip this folder on the reception laptop.
2. Double-click **index.html**. It opens in Chrome or Edge.
3. Right-click it → Send to → Desktop (create shortcut) so staff can find it.

Always open it in the **same browser**, because the data is stored inside that browser. Do not use "Clear browsing data" with "cookies and site data" ticked.

## Way 2 — Proper Windows app (installer), built free by GitHub

1. Create a free account at https://github.com and click **New repository**. Name it `opd-register`. Keep it **Public**.
2. On the repo page click **Add file → Upload files**. Drag in **everything from this folder**, including the `.github` folder. Click **Commit changes**.
3. Open the **Actions** tab. Open **Build Windows app** (it starts by itself after the upload; if not, click **Run workflow**).
4. Wait about 5 minutes for the green tick. Click the run, scroll to **Artifacts**, download **OPD-Register-Windows**.
5. Unzip it. You get:
   - `OPD-Register-Setup.exe` — installs with a desktop shortcut
   - `OPD-Register-Portable.exe` — runs without installing (pen drive friendly)

Windows may show "Windows protected your PC" because the app is not signed. Click **More info → Run anyway**. This is normal for free apps.

In the installed app, data is saved as a file at `C:\Users\<name>\AppData\Roaming\opd-register\opd-data.json`, and one automatic copy per day is kept in the `auto-backups` folder next to it (last 30 days).

## Way 3 — Free web link with GitHub Pages (optional)

After step 2 above: repo **Settings → Pages → Deploy from a branch → main → / (root) → Save**. Your link will be `https://<your-username>.github.io/opd-register/`.

Data is stored in the browser of whichever computer opens the link. Each computer has its own separate register, so use this on one reception computer only.

## Backups (please do this)

Open the **Backup** tab:
- **Save Backup File** — saves everything in one file. Do it daily and keep a copy on a pen drive or email it to yourself.
- **Export to Excel (CSV)** — full patient list with totals and balances.
- **Restore From Backup** — loads a backup file (replaces current data).

## Notes

- Staff PINs are for knowing who entered each record. They are not strong security, so keep the laptop itself locked with a Windows password.
- To change the app icon, replace `icon.png` (512 x 512) before uploading to GitHub.
