var gettingPage = browser.runtime.getBackgroundPage();
gettingPage.then(getStorageFromBackgroundScript, onError);

function getStorageFromBackgroundScript(storage) {
    var storageParsed = JSON.parse(storage.getFromStorage());
    transformStorageToListOfItems(storageParsed);
}

function onError(error) {
    console.log("Error: " + error)
}

function transformStorageToListOfItems(parsed) {
    var arrayOfItems = [];
    for (var itemInParsed = 0; itemInParsed < parsed.length; itemInParsed++) {
        arrayOfItems.push(parsed[itemInParsed]);
    }
    showListOfItems(arrayOfItems);
}

function showListOfItems(items) {
    for (var item = 0; item < items.length; item++) {
        var tr = document.createElement('tr');
        tr.setAttribute('class', 'rows');
        for (var key in items[item]) {
            var tdCopy = tr.appendChild(document.createElement("td"));
            var tdEdit = tr.appendChild(document.createElement("td"));
            var tdDelete = tr.appendChild(document.createElement("td"));
            var imgEdit = tdEdit.appendChild(document.createElement('img'));
            var imgDel = tdDelete.appendChild(document.createElement('img'));
            imgEdit.setAttribute('src', '/icons/edit.png');
            imgDel.setAttribute('src', '/icons/delete.png');
            tdCopy.setAttribute("class", "elementFromCopies");
            tdCopy.addEventListener("click", sendSelectedCopyToContentScript);
            tdCopy.setAttribute("title", key);
            tdCopy.innerHTML = items[item][key];
            tdEdit.addEventListener("click", editItem);
            tdEdit.setAttribute('title', 'Edit copy');
            tdDelete.addEventListener("click", deleteItem);
            tdDelete.setAttribute('title', 'Delete copy');

            document.getElementById("copiedText").appendChild(tr);
        }
    }
}

document.getElementById('textForCopy').addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        createItem('Custom copy' + '>' + document.getElementById('textForCopy').value);
        document.getElementById('textForCopy').value = '';
        location.reload();
    }
});

function createItem(text) {
    browser.runtime.sendMessage({
        text: text
    });
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
        browser.tabs.sendMessage(activeTab.id, {userCopy: event.target.textContent});
    });
}