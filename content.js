console.log("usao");
var focusedElement;
document.body.addEventListener("focus", function (ev) {
    console.log(ev.target.id);
    if (ev.target.localName === "input" || ev.target.localName === "textarea") {
        focusedElement = ev.target.id;
    }

}, true);



function getTextFromPopupScript(request, sender, sendResponse) {
    pasteText(request.userCopy);
}

browser.runtime.onMessage.addListener(getTextFromPopupScript);


function pasteText(text) {
    document.getElementById(focusedElement).textContent = text;
}

