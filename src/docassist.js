// Injects documentation icons next to EMSCharts fields defined in docs.js.
// Runs independently of EMSCharts Assist — no shared state or messaging needed.

(function() {
    'use strict';

    var ICON_CLASS = 'vfa-doc-icon';
    var TOOLTIP_ID = 'vfa-doc-tooltip';

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

    function injectIcon(el, docText) {
        // Don't add a second icon if already injected
        if (el.dataset.vfaDoc) return;
        el.dataset.vfaDoc = '1';

        var icon = document.createElement('span');
        icon.className = ICON_CLASS;
        icon.title = 'Documentation standard';

        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            var tip = document.getElementById(TOOLTIP_ID);
            var isVisible = tip && tip.classList.contains('vfa-doc-tooltip-visible');
            var isSame = tip && tip.dataset.fieldName === el.name;
            hideTooltip();
            if (!isVisible || !isSame) {
                getTooltip().dataset.fieldName = el.name;
                showTooltip(icon, docText);
            }
        });

        el.parentNode.insertBefore(icon, el.nextSibling);
    }

    // ── Field scan ───────────────────────────────────────────────────────

    function scanFields() {
        Object.keys(VFA_DOCS).forEach(function(fieldName) {
            var els = document.querySelectorAll('[name="' + fieldName + '"]');
            els.forEach(function(el) {
                injectIcon(el, VFA_DOCS[fieldName]);
            });
        });
    }

    // ── Init ─────────────────────────────────────────────────────────────
    // EMSCharts loads content dynamically, so scan once on ready and once
    // after a short delay to catch late-rendered fields.

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scanFields);
    } else {
        scanFields();
    }
    setTimeout(scanFields, 1500);

})();
