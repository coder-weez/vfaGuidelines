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

Two objects control which icons appear and where.

### `VFA_DOCS` — name-attribute fields

Keys are the **`name` attribute** of an EMSCharts form element. The icon is inserted **after** the element by default.

```js
var VFA_DOCS = {
    'AIR_STATUS': 'Required — do not leave blank...',
    // ...
};
```

The extension matches via `document.querySelectorAll('[name="<key>"]')` — the key must exactly match the element's `name` attribute (case-sensitive).

### `VFA_DOCS_SELECTOR` — CSS selector fields

Use this for non-form elements (e.g. section headers) where there is no `name` attribute, or when precise placement relative to the element is needed. Each value is an object with `text` and a placement flag:

```js
var VFA_DOCS_SELECTOR = {
    '.pcr-section-chief-complaint': { text: 'Your standard here.', inside: true },
    '[name="some_field"]':          { text: 'Your standard here.', before: true },
};
```

Placement options (mutually exclusive):
- `inside: true` — appends the icon as the last child of the matched element. Use for section header divs so the icon sits inline with the header text and vertically centers naturally.
- `before: true` — inserts the icon before the matched element (as a sibling).
- neither — inserts the icon after the matched element (as a sibling).

Plain string values are also accepted (treated as `before: false`).

## How icon injection works (`docassist.js`)

`scanFields()` iterates both `VFA_DOCS` and `VFA_DOCS_SELECTOR`, finds matching elements, and calls `injectIcon(el, docText, before, inside)`:

- Sets `el.dataset.vfaDoc = '1'` as a guard to prevent double-injection.
- Creates a `<span class="vfa-doc-icon">` and inserts it according to the placement flags.
- On click: toggles the shared tooltip. Clicking the same icon twice hides it; clicking elsewhere on the page also hides it.

**Double-scan pattern:** `scanFields` runs on `DOMContentLoaded` and again after 1500 ms. This catches fields EMSCharts renders dynamically after the initial DOM is ready. Do not remove the `setTimeout` call — it exists to handle late-rendered fields.

## Tooltip

A single `<div id="vfa-doc-tooltip">` is created lazily on first use and reused for all fields. It is positioned absolutely below the clicked icon and clamped to stay within the viewport width. It stores the active field identifier in `tip.dataset.fieldName` so the toggle logic can tell whether the same icon was clicked again. For `VFA_DOCS` entries the identifier is `el.name`; for `VFA_DOCS_SELECTOR` entries it is `el.className`.

## Adding a new field

### Form field (input, select, textarea)
Add to `VFA_DOCS`. Verify the `name=` attribute in the EMSCharts DOM first.

```js
'emscharts_field_name': 'Your documentation standard text here.',
```

### Section header or non-form element
Add to `VFA_DOCS_SELECTOR` with `inside: true` to place the icon inline with the header text.

```js
'.pcr-section-your-section': { text: 'Your documentation standard text here.', inside: true },
```

## Icon placement by element type

EMSCharts renders different field types differently, which affects how icons are placed:

| Element type | Rendering | Placement strategy |
|---|---|---|
| `<select>`, `<input>` | Inline | Icon inserted after element; `vertical-align: middle` centers it naturally |
| `<textarea>` | Block | Icon cannot sit beside it in normal flow. `injectIcon` wraps the textarea in a `span.vfa-textarea-wrapper` (relative-positioned) and absolutely positions the icon at `top: 2px; right: -18px` — top right corner of the textarea |
| Section header `<div>` | Block | Use `inside: true` in `VFA_DOCS_SELECTOR` to append the icon as the last child of the div; it sits inline with the header text and `vertical-align: middle` centers it against the line height |

The textarea wrapper is applied automatically whenever `el.tagName === 'TEXTAREA'` in `injectIcon` — no extra config needed.

## Common pitfalls

- **Wrong attribute**: the key must match `name=`, not `id=`. Some EMSCharts fields use the same value for both, but not all.
- **Dynamic fields**: if a field doesn't get an icon, it may be rendered after the 1500 ms scan. Check whether the field exists in the DOM at `DOMContentLoaded` before investigating further.
- **No jQuery**: unlike EMSCharts Assist, this extension uses plain DOM APIs only. Do not introduce jQuery.
- **Section header icons**: use `inside: true` so the icon is a child of the header div — this lets `vertical-align: middle` center it against the header text. Inserting as a sibling (after/before) will not center correctly.
- **Textarea icons**: do not attempt `vertical-align` or `margin-top` fixes for textareas — EMSCharts overrides these. The wrapper approach in `injectIcon` is the correct solution.
