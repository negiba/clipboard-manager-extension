function setToStorage(text) {
    let storage = localStorage.getItem('copies');
    if (storage === null) {
        storage = "[]";
    }
    let storageParsed = JSON.parse(storage);
    storageParsed.push({
        copy: text
    });
    localStorage.setItem('copies', JSON.stringify(storageParsed));
}
function handleMessage(request, sender, sendResponse) {
    sendResponse({ response: "User selected text copied to database" });
    console.log(request.text);
    setToStorage(request.text);
}

browser.runtime.onMessage.addListener(handleMessage);

browser.commands.onCommand.addListener(function (command) {
    if (command == "execute_copy_to_clipboard") {
        browser.tabs.executeScript({
            file: "content.js"
        });
    }
});

browser.contextMenus.create({
    id: "log-selection",
    title: "Save copy",
    contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener(function (info, tab) {
    switch (info.menuItemId) {
        case "log-selection":
            browser.tabs.executeScript({
                file: "content.js"
            });
            break;
    }
});