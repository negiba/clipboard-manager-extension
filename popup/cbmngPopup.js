var gettingPage = browser.runtime.getBackgroundPage();
gettingPage.then(getStorageFromBackgroundScript, onError);

function getStorageFromBackgroundScript(storage) {
    var storageParsed = JSON.parse(storage.getFromStorage());
    transformStorageToListOfItems(storageParsed);
}

function transformStorageToListOfItems(parsed) {
    for (var itemInParsed = 0; itemInParsed < parsed.length; itemInParsed++) {
        var p = document.createElement("p");
        console.log(parsed[itemInParsed].copy);
        p.setAttribute("class", "elementFromCopies");
        p.textContent = parsed[itemInParsed].copy;
        document.getElementById("copiedText").insertAdjacentElement("afterbegin", p);
    }
}

function onError(error) {
    console.log("Error: " + error)
}

function showListOfItems() {

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

function sendSelectedCopyToContentScript() {
    
}