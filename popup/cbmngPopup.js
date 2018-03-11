let Popup = (function () {
    let privateStorage = [];
    let storageFromBackground = function () {
        browser.runtime.getBackgroundPage().then(getStorageFromBackgroundScript);
    };

    let getStorageFromBackgroundScript = function (storage) {
        let storageParsed = JSON.parse(storage.getFromStorage());
        transformStorageToListOfItems(storageParsed); // proveriti da li je potrebna ova metoda
    };

    let transformStorageToListOfItems = function (parsed) {
        for (let itemInParsed = 0; itemInParsed < parsed.length; itemInParsed++) {
            privateStorage.push(parsed[itemInParsed]);
        }
        showListOfItems(1);
        showPagination();
        defaultActivePage();
    };

    let getPrivateStorage = function () {
        return privateStorage;
    };

    let sliceListOfItems = function (pageNumber) {
        let items = getPrivateStorage();
        return items.slice((pageNumber - 1) * 10, pageNumber * 10);
    };

    let showListOfItems = function (pageNumber) {
        let sliced = sliceListOfItems(pageNumber);
        for (let item = 0; item < sliced.length; item++) {
            let tr = document.createElement("tr");
            tr.setAttribute("class", "col-md-12");
            for (let key in sliced[item]) {
                let tdCopy = tr.appendChild(document.createElement("td"));
                let tdEdit = tr.appendChild(document.createElement("td"));
                let tdDelete = tr.appendChild(document.createElement("td"));
                let imgEdit = tdEdit.appendChild(document.createElement("img"));
                let imgDel = tdDelete.appendChild(document.createElement("img"));
                imgEdit.setAttribute("src", "/icons/edit.png");
                imgDel.setAttribute("src", "/icons/delete.png");
                tdCopy.setAttribute("class", "elementFromCopies");
                tdCopy.addEventListener("click", sendSelectedCopyToContentScript);
                tdCopy.setAttribute("title", key);
                tdCopy.textContent = sliced[item][key];
                tdEdit.addEventListener("click", editItem);
                tdEdit.setAttribute("title", "Edit copy");
                tdDelete.addEventListener("click", deleteItem);
                tdDelete.setAttribute("title", "Delete copy");

                document.getElementById("copiedText").appendChild(tr);
            }
        }
    };

    let clearTable = function () {
        let rows = document.getElementById("copiedText").rows;
        for (let i = rows.length - 1; i >= 0; i--) {
            document.getElementById("copiedText").deleteRow(i);
        }
    };

    let calcPagination = function (elementsPerPage) {
        let elementsToShow = getPrivateStorage().length;
        let numsOfPages;

        if (elementsToShow <= 10) {
            numsOfPages = 0;
        } else {
            let calcNumsOfPages = Math.floor(elementsToShow / elementsPerPage);
            numsOfPages = elementsToShow % elementsPerPage !== 0 ? calcNumsOfPages + 1 : calcNumsOfPages;
        }
        return numsOfPages;
    };

    let showPagination = function () {
        let numberOfPages = calcPagination(10);
        if (numberOfPages !== 0) {
            for (let index = 0; index < numberOfPages; index++) {
                let pageNum = document.createElement("input");
                pageNum.setAttribute("type", "button");
                pageNum.setAttribute("class", "pageNums")
                pageNum.setAttribute("value", index + 1);
                document.getElementById("pagination").appendChild(pageNum);
            }
        }
    };

    let defaultActivePage = function () {
        if (document.getElementById("pagination").firstChild !== null) {
            let els = document.getElementById("pagination").firstChild;
            els.setAttribute("class", "active");
        }
    };

    let setActivePage = function (pageNumber) {
        let els = document.getElementById("pagination").childNodes;
        for (let index = 0; index < els.length; index++) {
            if (els[index].value == pageNumber) {
                els[index].setAttribute("class", "active");
            } else {
                els[index].removeAttribute("class");
            }
        }
    };


    let getActivePage = function () {
        let currentActive = document.getElementsByClassName("active");
        if (currentActive[0] == undefined) {
            return 1;
        } else {
            return currentActive[0].value;
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
        getElementsToShow: getPrivateStorage,
        showItems: showListOfItems,
        clear: clearTable,
        active: setActivePage,
        getActive: getActivePage,
    };

})();

Popup.storage();

// Event pagination
document.getElementById("pagination").addEventListener("click", function (event) {
    if (event.target.value !== undefined) {
        Popup.clear();
        Popup.active(event.target.value);
        Popup.showItems(event.target.value);
    }
});

// Creating custom copy on Enter button
document.getElementById("textForCopy").addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        Popup.addItem("Custom copy" + ">" + document.getElementById("textForCopy").value);
        document.getElementById("textForCopy").value = "";
        location.reload();
    }
});

function editItem() {
    let textToEdit = this.parentNode.firstChild.textContent;
    let title = this.parentNode.firstChild.title;
    this.parentNode.firstChild.textContent = "";
    this.parentNode.firstChild.title = "";
    let edit = document.createElement("input");
    edit.setAttribute("class", "editElement");
    edit.value = textToEdit;
    // this.parentNode.replaceChild(edit, this.parentNode.firstChild);
    this.parentNode.firstChild.appendChild(edit);
    edit.focus();

    edit.addEventListener("blur", function () {
        this.parentNode.firstChild.textContent = textToEdit;
        edit.remove();
        location.reload();
    });

    edit.addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            let storage = Popup.getElementsToShow();
            for (let items in storage) {
                if (items == this.parentNode.parentNode.rowIndex + (Popup.getActive() - 1) * 10) {
                    for (let item in storage[items]) {
                        storage[items][item] = edit.value;
                    }
                }
            }
            Popup.setItems(storage);
            location.reload();
        }
    });
}

// todo - srediti da na klik obrise kopiju i ali da ne refresuje stranu
function deleteItem() {
    let storage = Popup.getElementsToShow();
    for (let items in storage) {
        if (items == this.parentNode.rowIndex + (Popup.getActive() - 1) * 10) {
            storage.splice(items, 1);
        }
    }
    Popup.setItems(storage);
    location.reload();
}


function sendSelectedCopyToContentScript(event) {
    browser.tabs.query({active: true, currentWindow: true}, function (tabs) {
        let activeTab = tabs[0];
        browser.tabs.sendMessage(activeTab.id, {userCopy: event.target.textContent});
    });
}