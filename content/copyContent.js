(function sendTextToBackgroundScript() {
    browser.runtime.sendMessage({
        text: getUserSelectedText()
    });
})();

function getUserSelectedText () {
    if (document.getSelection().toString() !== '') {
        return window.location.href + '>' + document.getSelection().toString();
    }
};