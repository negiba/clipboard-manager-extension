console.log("usao");

function handleResponse(message) {
    console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
    console.log(`Error: ${error}`);
}

browser.runtime.sendMessage({
    text: window.getSelection().toString()
}).then(handleResponse, handleError);
