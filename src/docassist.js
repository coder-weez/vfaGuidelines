// Injects documentation icons next to EMSCharts fields defined in docs.js.
// Runs independently of EMSCharts Assist — no shared state or messaging needed.

(function() {
    'use strict';

    var ICON_CLASS = 'vfa-doc-icon';
    var TOOLTIP_ID = 'vfa-doc-tooltip';

    // Feature flag: the on-page field ⓘ icons and their documentation tooltips
    // (the "popup information elements") are temporarily disabled so the
    // extension only shows the "Doc Standards" toolbar button. All of the
    // supporting code below is intentionally retained — flip this back to
    // true to reinstate the field popups.
    var SHOW_FIELD_POPUPS = false;

    // ── Tooltip ──────────────────────────────────────────────────────────

    function getTooltip() {
        var tip = document.getElementById(TOOLTIP_ID);
        if (!tip) {
            tip = document.createElement('div');
            tip.id = TOOLTIP_ID;
            document.body.appendChild(tip);
            document.addEventListener('click', function(e) {
                if (!e.target.classList.contains(ICON_CLASS)) {
                    hideTooltip();
                }
            });
        }
        return tip;
    }

    function showTooltip(icon, text) {
        var tip = getTooltip();
        tip.textContent = text;
        tip.classList.add('vfa-doc-tooltip-visible');

        var rect = icon.getBoundingClientRect();
        var scrollY = window.scrollY || document.documentElement.scrollTop;
        var scrollX = window.scrollX || document.documentElement.scrollLeft;

        tip.style.top = (rect.bottom + scrollY + 6) + 'px';
        tip.style.left = (rect.left + scrollX) + 'px';

        // Keep tooltip within viewport width
        var tipWidth = 280;
        var overflowRight = (rect.left + tipWidth) - window.innerWidth;
        if (overflowRight > 0) {
            tip.style.left = Math.max(8, rect.left + scrollX - overflowRight - 8) + 'px';
        }
    }

    function hideTooltip() {
        var tip = document.getElementById(TOOLTIP_ID);
        if (tip) { tip.classList.remove('vfa-doc-tooltip-visible'); }
    }

    // ── Icon injection ───────────────────────────────────────────────────

    function injectIcon(el, docText, before, inside) {
        // Don't add a second icon if already injected
        if (el.dataset.vfaDoc) return;
        el.dataset.vfaDoc = '1';

        var fieldId = el.name || el.className;

        var icon = document.createElement('span');
        icon.className = ICON_CLASS;
        icon.title = 'Documentation standard';

        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            var tip = document.getElementById(TOOLTIP_ID);
            var isVisible = tip && tip.classList.contains('vfa-doc-tooltip-visible');
            var isSame = tip && tip.dataset.fieldName === fieldId;
            hideTooltip();
            if (!isVisible || !isSame) {
                getTooltip().dataset.fieldName = fieldId;
                showTooltip(icon, docText);
            }
        });

        if (inside) {
            el.appendChild(icon);
        } else if (el.tagName === 'TEXTAREA') {
            // Wrap textarea so the icon can be absolutely positioned at the top right
            var wrapper = document.createElement('span');
            wrapper.className = 'vfa-textarea-wrapper';
            el.parentNode.insertBefore(wrapper, el);
            wrapper.appendChild(el);
            wrapper.appendChild(icon);
        } else if (before) {
            el.parentNode.insertBefore(icon, el);
        } else {
            el.parentNode.insertBefore(icon, el.nextSibling);
        }
    }

    // ── Field scan ───────────────────────────────────────────────────────

    function scanFields() {
        Object.keys(VFA_DOCS).forEach(function(fieldName) {
            var els = document.querySelectorAll('[name="' + fieldName + '"]');
            els.forEach(function(el) {
                injectIcon(el, VFA_DOCS[fieldName], false);
            });
        });
        Object.keys(VFA_DOCS_SELECTOR).forEach(function(selector) {
            var entry = VFA_DOCS_SELECTOR[selector];
            var text = typeof entry === 'object' ? entry.text : entry;
            var before = typeof entry === 'object' ? entry.before : false;
            var inside = typeof entry === 'object' ? entry.inside : false;

            // Support "selector|Match Text" to filter by trimmed inner text
            var parts = selector.split('|');
            var cssSelector = parts[0];
            var matchText = parts[1] ? parts[1].trim() : null;

            var els = document.querySelectorAll(cssSelector);
            els.forEach(function(el) {
                if (matchText && el.textContent.trim() !== matchText) return;
                injectIcon(el, text, before, inside);
            });
        });
    }

    // ── Documentation toolbar ────────────────────────────────────────────

    var PAGE_PDF_MAP = {
        'page1': 4,
        'page2': 6,
        'page3': 7,
        'page4': 9,
        'page5': 10,
        'page7': 13,
        'page8': 14,
        'page9': 15
    };

    function getDocPage() {
        var match = window.location.pathname.match(/page(\d+)\.cfm/i);
        if (!match) return 1;
        return PAGE_PDF_MAP['page' + match[1]] || 1;
    }

    function createDocToolbar() {
        if (document.getElementById('vfa-doc-toolbar')) return;

        var pageMatch = window.location.pathname.match(/page(\d+)\.cfm/i);
        var pageNum = pageMatch ? pageMatch[1] : '';

        var toolbar = document.createElement('div');
        toolbar.id = 'vfa-doc-toolbar';

        var btn = document.createElement('button');
        btn.id = 'vfa-doc-toolbar-btn';
        btn.innerHTML = 'Page ' + pageNum + '<br>Doc Standards';
        btn.addEventListener('click', function() {
            var pdfUrl = chrome.runtime.getURL('VFADocumentationStandards.pdf') + '#page=' + getDocPage();
            window.open(pdfUrl, '_blank');
        });

        toolbar.appendChild(btn);
        document.body.appendChild(toolbar);
    }

    // ── Init ─────────────────────────────────────────────────────────────
    // EMSCharts loads content dynamically, so scan once on ready and once
    // after a short delay to catch late-rendered fields.

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (SHOW_FIELD_POPUPS) { scanFields(); }
            createDocToolbar();
        });
    } else {
        if (SHOW_FIELD_POPUPS) { scanFields(); }
        createDocToolbar();
    }
    if (SHOW_FIELD_POPUPS) { setTimeout(scanFields, 1500); }

})();
