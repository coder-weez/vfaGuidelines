# VFA Documentation Standards — Claude Code Guide

## What this project is

A Chrome MV3 extension that injects a small **ⓘ icon** next to EMSCharts PCR fields. Clicking the icon shows a tooltip with the organization's documentation standard for that field. It runs independently of EMSCharts Assist — no shared state, no messaging between the two.

## Architecture

```
src/
  manifest.json    — MV3 manifest; declares content scripts and popup
  docs.js          — Field definitions: maps EMSCharts field names to doc-standard text
  docassist.js     — Content script; injects icons and manages the tooltip
  docassist.css    — Styles for the injected icons and tooltip
  popup.html       — Extension popup (static instructions, no JS)
```

`docs.js` is loaded before `docassist.js` (declared first in the manifest `"js"` array), so `VFA_DOCS` is available as a global when `docassist.js` runs.

## How field definitions work (`docs.js`)

All documentation standards live in a single `VFA_DOCS` object. Each key is the **`name` attribute** of an EMSCharts DOM element; the value is the documentation standard string shown in the tooltip.

```js
var VFA_DOCS = {
    'PRMAIN_cc': 'Document the patient\'s chief complaint in their own words.',
    // ...
};
```

Fields are grouped by PCR page with comments. The extension matches against `document.querySelectorAll('[name="<key>"]')`, so the key must exactly match the element's `name` attribute in the EMSCharts DOM.

## How icon injection works (`docassist.js`)

`scanFields()` iterates `VFA_DOCS`, finds matching elements, and calls `injectIcon(el, docText)`:

- Sets `el.dataset.vfaDoc = '1'` as a guard to prevent double-injection.
- Creates a `<span class="vfa-doc-icon">` and inserts it **after** the field element (`insertBefore(icon, el.nextSibling)`).
- On click: toggles the shared tooltip. Clicking the same icon twice hides it; clicking elsewhere on the page also hides it.

**Double-scan pattern:** `scanFields` runs on `DOMContentLoaded` and again after 1500 ms. This catches fields EMSCharts renders dynamically after the initial DOM is ready. Do not remove the `setTimeout` call — it exists to handle late-rendered fields.

## Tooltip

A single `<div id="vfa-doc-tooltip">` is created lazily on first use and reused for all fields. It is positioned absolutely below the clicked icon and clamped to stay within the viewport width. It stores the active field name in `tip.dataset.fieldName` so the toggle logic can tell whether the same icon was clicked again.

## Adding a new field

Only `docs.js` needs to change. Add an entry to `VFA_DOCS`:

```js
'emscharts_field_name': 'Your documentation standard text here.',
```

Verify the field's `name` attribute in the EMSCharts DOM before adding — the key must match exactly (case-sensitive).

## Common pitfalls

- **Wrong attribute**: the key must match `name=`, not `id=`. Some EMSCharts fields use the same value for both, but not all.
- **Dynamic fields**: if a field doesn't get an icon, it may be rendered after the 1500 ms scan. Check whether the field exists in the DOM at `DOMContentLoaded` before investigating further.
- **No jQuery**: unlike EMSCharts Assist, this extension uses plain DOM APIs only. Do not introduce jQuery.
