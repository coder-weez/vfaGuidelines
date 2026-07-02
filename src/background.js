// Opens the documentation standards PDF at the section relevant to the
// active EMSCharts page when the user clicks the extension's toolbar icon.

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

chrome.action.onClicked.addListener(function(tab) {
    var match = tab.url && tab.url.match(/page(\d+)\.cfm/i);
    var pdfPage = match ? (PAGE_PDF_MAP['page' + match[1]] || 1) : 1;
    var pdfUrl = chrome.runtime.getURL('VFADocumentationStandards.pdf') + '#page=' + pdfPage;
    chrome.tabs.create({ url: pdfUrl });
});
