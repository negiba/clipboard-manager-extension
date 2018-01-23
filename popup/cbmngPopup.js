var gettingPage = browser.runtime.getBackgroundPage();
gettingPage.then(getStorageFromBackgroundScript, onError);

function getStorageFromBackgroundScript(storage) {
    var storageParsed = JSON.parse(storage.getFromStorage());
    var arrayOfItems = transformStorageToListOfItems(storageParsed);
    showListOfItems(arrayOfItems);
}

function onError(error) {
    console.log("Error: " + error)
}

function transformStorageToListOfItems(parsed) {
    var arrayOfItems = [];
    for (var itemInParsed = 0; itemInParsed < parsed.length; itemInParsed++) {
        arrayOfItems.push(parsed[itemInParsed].copy);
    }
    return arrayOfItems;
}

function showListOfItems(items) {
    for (var item = 0; item < items.length; item++) {
        var p = document.createElement("p");
        p.setAttribute("class", "elementFromCopies");
        p.addEventListener("click", sendSelectedCopyToContentScript);
        p.textContent = items[item];
        document.getElementById("copiedText").insertAdjacentElement("afterbegin", p);
    }
}

function createItem() {

}

function editItem() {

}

function deleteItem() {

}

function packItemsForSaving() {

}

function sendPackedItemsToBackgroundScript() {

}

function sendSelectedCopyToContentScript(event) {
    console.log(event.target.textContent);
    browser.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var activeTab = tabs[0];
        browser.tabs.sendMessage(activeTab.id,{userCopy: event.target.textContent});
    });
}