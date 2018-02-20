function getUserSelectedText() {

    return window.location.href + '>' + document.getSelection().toString();
}

function handleResponse(message) {
    console.log("Message from the background script:" + message.response);
}

function handleError(error) {
    console.log("Error: " + error);
}

(function sendTextToBackgroundScript() {
    browser.runtime.sendMessage({
        text: getUserSelectedText()
    }).then(handleResponse, handleError);
})();