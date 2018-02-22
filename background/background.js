function setToStorage(userSelectedText) {
    if (Array.isArray(userSelectedText)) {
        localStorage.setItem('copies', JSON.stringify(userSelectedText));
    } else {
        let url = userSelectedText.split(">");
        let copyObject = {};
        copyObject[url[0]] = url[1];
        let storage = getFromStorage();
        if (storage === null) {
            storage = "[]";
        }
        let storageParsed = JSON.parse(storage);
        storageParsed.push(copyObject);
        localStorage.setItem('copies', JSON.stringify(storageParsed));
    }

}

function getFromStorage() {
    return localStorage.getItem('copies');
}

function getTextFromContentScript(request, sender, sendResponse) {
    sendResponse({
        response: "User selected text copied to database"
    });
    setToStorage(request.text);
}

browser.runtime.onMessage.addListener(getTextFromContentScript);



browser.contextMenus.create({
    id: "save-to-cb",
    title: "Save to Clipboard Manager",
    contexts: ["selection"]
});

function callContentScript() {
    browser.tabs.executeScript({
        file: "copyContent.js"
    });
}

(function waitForUserToSaveSelectedText() {
    browser.commands.onCommand.addListener(function (command) {
        if (command === "execute_copy_to_clipboard") {
            callContentScript();
        }
    });
    browser.contextMenus.onClicked.addListener(function (info) {
        if (info.menuItemId === "save-to-cb") {
            callContentScript();
        }
    });
})();

