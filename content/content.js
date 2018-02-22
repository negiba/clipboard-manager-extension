console.log("usao");

let FocusingScript = (function () {
    let focusedElement = '';

    let pasteText = function (text) {
        console.log("Greska " + focusedElement);
        document.getElementById(focusedElement).value = "" + text;
    };

    return {
        paste: pasteText,
        setFocus: function (id) {
            focusedElement = id;
        }
    }
})();

browser.runtime.onMessage.addListener(function (request) {
    FocusingScript.paste(request.userCopy);
});

document.body.addEventListener("focus", function (event) {
    if (event.target.localName === "input" || event.target.localName === "textarea") {
        if (event.target.id === '') {
            event.target.setAttribute('id', 'myId' + Math.random() * 100);
        }
        FocusingScript.setFocus(event.target.id);
    }
}, true);