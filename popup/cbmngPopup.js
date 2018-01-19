function getObjectValue(arrayFromBackground) {
    for (var firstItemInArray = 0; firstItemInArray < arrayFromBackground.length; firstItemInArray++) {
        var p = document.createElement("p");
        console.log(arrayFromBackground[firstItemInArray].copy);
        p.textContent = arrayFromBackground[firstItemInArray].copy;
        document.getElementById("copiedText").insertAdjacentElement("afterbegin", p);
    }
}

function fromBackground(storage) {
    var itemsFromBackground = JSON.parse(storage.getFromStorage());
    getObjectValue(itemsFromBackground);
}

function onError(error) {
    console.log("Error: " + error)
}

var gettingPage = browser.runtime.getBackgroundPage();
gettingPage.then(fromBackground, onError);
