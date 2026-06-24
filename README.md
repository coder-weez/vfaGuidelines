# VFA Documentation Standards

A Chrome MV3 extension that injects inline documentation hints into EMSCharts PCR fields. A small **ⓘ icon** appears next to each field that has a defined standard; clicking it shows a tooltip with the organization's documentation guidance for that field.

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
  docassist.js     — Content script; injects icons and tooltip
  docassist.css    — Styles for icons and tooltip
  popup.html       — Extension popup (static instructions)
```

## Supported pages

The extension runs on EMSCharts PCR pages 2–5 and 8 (`page2.cfm` through `page8.cfm`).
