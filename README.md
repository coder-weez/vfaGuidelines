# VFA Documentation Standards

A Chrome MV3 extension that surfaces the organization's PCR documentation standards directly inside EMSCharts. On every supported page it adds a floating **Doc Standards** button that opens the standards PDF at the section relevant to that page.

The extension also contains inline field-level hints — a small **ⓘ icon** next to individual fields that opens a tooltip with that field's standard — but these are **currently disabled** so only the button is shown. They are gated behind the `SHOW_FIELD_POPUPS` flag in [`src/docassist.js`](src/docassist.js) and can be reinstated by setting it back to `true`.

Runs independently of EMSCharts Assist — no shared state between the two extensions.

## Installation

1. Clone or download this repo.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the `src/` folder.

## Adding or updating a documentation standard

All standards live in [`src/docs.js`](src/docs.js) in a single `VFA_DOCS` object:

```js
var VFA_DOCS = {
    'PRMAIN_cc': 'Document the patient\'s chief complaint in their own words.',
    // ...
};
```

Each key is the **`name` attribute** of an EMSCharts DOM element (case-sensitive). To add a new field, append an entry and reload the extension in Chrome.

> **Tip:** verify the field's `name` attribute in the EMSCharts DOM before adding — `name=` and `id=` are not always the same value.

## Project structure

```
src/
  manifest.json    — MV3 manifest
  docs.js          — Field definitions (VFA_DOCS object)
  docassist.js     — Content script; the Doc Standards button, icon injection, and tooltip
  docassist.css    — Styles for the button, icons, and tooltip
  popup.html       — Extension popup (static instructions; not currently wired up in the manifest)
```

## Supported pages

The extension runs on EMSCharts PCR pages 1, 2, 3, 4, 5, 7, 8, and 9. All pages show the Doc Standards toolbar button. Field-level icons are defined for pages 2–5 and 8, but are currently disabled (see `SHOW_FIELD_POPUPS` above).

## Development & releases

- **Versioning is automated** via [release-please](https://github.com/googleapis/release-please). Write [Conventional Commits](https://www.conventionalcommits.org/) (`fix:` → patch, `feat:` → minor, `feat!:` → major); a release PR is opened automatically, and merging it bumps `src/manifest.json`, tags the release, and attaches an installable `.zip`.
- **CI linting** runs on every push and PR: ESLint for the source, `web-ext lint` for the manifest (`npm run lint` / `npm run lint:ext`).
- **Dependabot** keeps GitHub Actions and dev dependencies current.

To install a released build without cloning, download the `.zip` from the latest Release, unzip it, and load the folder unpacked as above.
