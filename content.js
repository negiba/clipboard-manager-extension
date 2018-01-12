console.log("usao");
// let object = {
//     copy: window.getSelection().toString()
// }
// let stringifiedObject = JSON.stringify(object);
// console.log(`${stringifiedObject}`);
// browser.storage.local.set({object});

// let onGot = (item) => {
//     console.log(`Ovo je u redu: ${JSON.parse(item)}`);
// }

// let onError = (error) => {
//     console.log(`Error: ${error}`)
// }

// document.getElementById("copiedText").textContent = JSON.parse(gettingItem);

function handleResponse(message) {
    console.log(`Message from the popup script:  ${message.response}`);
}

function handleError(error) {
    console.log(`Error: ${error}`);
}

function notifyBackgroundPage(e) {
    let sending = browser.runtime.sendMessage({
        greeting: "STRINGIFIED OBJECT"
    });
    sending.then(handleResponse, handleError);
}

window.addEventListener("click", notifyBackgroundPage);