const ws = new WebSocket("ws://localhost:8082");
let inputMessage = document.getElementById("input-message");
let sendButton = document.getElementById("submit");


function sendMessage() {
    console.log(inputMessage.value);
    const chatHistory = document.getElementById("chat-history");
    let outputMessage = document.createElement("div");
    chatHistory.appendChild(outputMessage);
    outputMessage.innerHTML = `<div class= "message-bubble sent-messages">${inputMessage.value}<div class="timestamp">${Date.now()}</div></div>`;

    inputMessage.value = "";
}

ws.addEventListener("open", () => {
    console.log("We are connected!");


    ws.send(inputMessage.value);
});

ws.addEventListener("message", e => {
    console.log(e);
});