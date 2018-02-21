let Popup = (function () {
    let privateStorage = [];
    let storageFromBackground = function () {
        browser.runtime.getBackgroundPage().then(getStorageFromBackgroundScript);
    };

    let getStorageFromBackgroundScript = function (storage) {
        let storageParsed = JSON.parse(storage.getFromStorage());
        transformStorageToListOfItems(storageParsed);
    };

    let transformStorageToListOfItems = function (parsed) {
        for (let itemInParsed = 0; itemInParsed < parsed.length; itemInParsed++) {
            privateStorage.push(parsed[itemInParsed]);
        }
        showListOfItems(privateStorage);
    };

    let showListOfItems = function (items) {
        for (let item = 0; item < items.length; item++) {
            let tr = document.createElement('tr');
            tr.setAttribute('class', 'col-md-12');
            for (let key in items[item]) {
                let tdCopy = tr.appendChild(document.createElement("td"));
                let tdEdit = tr.appendChild(document.createElement("td"));
                let tdDelete = tr.appendChild(document.createElement("td"));
                let imgEdit = tdEdit.appendChild(document.createElement('img'));
                let imgDel = tdDelete.appendChild(document.createElement('img'));
                imgEdit.setAttribute('src', '/icons/edit.png');
                imgDel.setAttribute('src', '/icons/delete.png');
                tdCopy.setAttribute("class", "elementFromCopies");
                tdCopy.addEventListener("click", sendSelectedCopyToContentScript);
                tdCopy.setAttribute("title", key);
                tdCopy.textContent = items[item][key];
                tdEdit.addEventListener("click", editItem);
                tdEdit.setAttribute('title', 'Edit copy');
                tdDelete.addEventListener("click", deleteItem);
                tdDelete.setAttribute('title', 'Delete copy');

                document.getElementById("copiedText").appendChild(tr);
            }
        }
    };

    return {
        storage: storageFromBackground,
        setItems: function (items) {
            browser.runtime.sendMessage({
                text: items
            });
        },
        addItem: function (item) {
            browser.runtime.sendMessage({
                text: item
            });

        },

    };

})();

Popup.storage();


document.getElementById('textForCopy').addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        Popup.addItem('Custom copy' + '>' + document.getElementById('textForCopy').value);
        document.getElementById('textForCopy').value = '';
        location.reload();
    }
});

function editItem() {
    document.getElementById('textForCopy').value = this.parentNode.firstChild.textContent;
    this.parentNode.remove();
    let itemsToBackground = [];
    for (let i = 0; i < document.getElementById('copiedText').rows.length; i++) {
        let title = document.getElementById('copiedText').rows[i].firstChild.title;
        let text = document.getElementById('copiedText').rows[i].firstChild.textContent;
        let objectToPush = {};
        objectToPush[title] = text;
        itemsToBackground.push(objectToPush);
    }
    Popup.setItems(itemsToBackground);

}


function deleteItem() {
    this.parentNode.remove();
    let itemsToBackground = [];
    for (let i = 0; i < document.getElementById('copiedText').rows.length; i++) {
        let title = document.getElementById('copiedText').rows[i].firstChild.title;
        let text = document.getElementById('copiedText').rows[i].firstChild.textContent;
        let objectToPush = {};
        objectToPush[title] = text;
        itemsToBackground.push(objectToPush);
    }
    Popup.setItems(itemsToBackground);
}


function sendSelectedCopyToContentScript(event) {
    browser.tabs.query({active: true, currentWindow: true}, function (tabs) {
        let activeTab = tabs[0];
        browser.tabs.sendMessage(activeTab.id, {userCopy: event.target.textContent});
    });
}