console.log("usao");

let selectedText = window.getSelection().toString();
console.log(selectedText);

function handleResponse(message) {
    console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
    console.log(`Error: ${error}`);
}

let sending = browser.runtime.sendMessage({
    text: selectedText
});

sending.then(handleResponse, handleError);

