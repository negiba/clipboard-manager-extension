console.log("usao");
function getUserSelectedText() {
    return window.getSelection().toString();
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

function getTextFromPopupScript() {
    
}

function pasteText() {
    
}

