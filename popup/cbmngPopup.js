let storageText = localStorage.getItem("something");
console.log("Popup: " + storageText);
document.getElementById("copiedText").textContent = JSON.parse(localStorage.getItem("something"));