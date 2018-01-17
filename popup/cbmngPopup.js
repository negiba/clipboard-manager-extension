function fromBackground(page) {
    page.fireMessage();    
}

function onError(error) {
    console.log(`Error: ${error}`)
}

// var gettingPage = browser.runtime.getBackgroundPage();
// gettingPage.then(fromBackground, onError)

// let fromContent = "";
// function handleMessage(request, sender, sendResponse) {
//     document.getElementById("copiedText").textContent = request.greeting;
//     sendResponse({ response: "fromStorage" });
// }

// browser.runtime.onMessage.addListener(handleMessage);

// let gettingItem = browser.storage.local.get();
// gettingItem.then(onGot, onError);