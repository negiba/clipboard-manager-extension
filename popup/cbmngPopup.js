let fromContent = "";
function handleMessage(request, sender, sendResponse) {
    document.getElementById("copiedText").textContent = request.greeting;
    sendResponse({ response: "fromStorage" });
}

browser.runtime.onMessage.addListener(handleMessage);

// let gettingItem = browser.storage.local.get();
// gettingItem.then(onGot, onError);