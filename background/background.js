function setToStorage(userSelectedText) {
    var storage = getFromStorage();
    if (storage === null) {
        storage = "[]";
    }
    var storageParsed = JSON.parse(storage);
    storageParsed.push({
        copy: userSelectedText
    });
    localStorage.setItem('copies', JSON.stringify(storageParsed));
}

function getFromStorage() {
    return localStorage.getItem('copies');
}

function getTextFromContentScript(request, sender, sendResponse) {
    sendResponse({
        response: "User selected text copied to database"
    });
    console.log(request.text);
    setToStorage(request.text);
}

browser.runtime.onMessage.addListener(getTextFromContentScript);



browser.contextMenus.create({
    id: "log-selection",
    title: "Save copy",
    contexts: ["selection"]
});

function callContentScript() {
    browser.tabs.executeScript({
        file: "content.js"
    });
}

(function waitForUserToSaveSelectedText() {
    browser.commands.onCommand.addListener(function (command) {
        if (command === "execute_copy_to_clipboard") {
            callContentScript();
        }
    });
    browser.contextMenus.onClicked.addListener(function (info) {
        if (info.menuItemId === "log-selection") {
            callContentScript();
        }
    });
})();

