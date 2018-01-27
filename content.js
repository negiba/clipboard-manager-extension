console.log("usao");
var focusedElement;
document.body.addEventListener("focus", function (ev) {
    console.log(ev.target.id);
    if (ev.target.localName === "input" || ev.target.localName === "textarea") {
        focusedElement = ev.target.id;
    }

}, true);

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

function getTextFromPopupScript(request, sender, sendResponse) {
    pasteText(request.userCopy);

}

browser.runtime.onMessage.addListener(getTextFromPopupScript);


function pasteText(text) {
    document.getElementById(focusedElement).textContent = text;
}

