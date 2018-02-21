let CopyScript = (function () {
    let getUserSelectedText = function () {
        if (document.getSelection().toString() !== '') {
            return window.location.href + '>' + document.getSelection().toString();
        }
    };

    let sendTextToBackgroundScript = function () {
        browser.runtime.sendMessage({
            text: getUserSelectedText()
        }).then(handleError);
    };

    return {
        toBackground: sendTextToBackgroundScript
    }
})();

CopyScript.toBackground();