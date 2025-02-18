const ws = new WebSocket("ws://localhost:8082");
let inputMessage = document.getElementById("input-message");
let sendButton = document.getElementById("submit");

function sendMessage() {
    console.log(inputMessage.value);
    inputMessage.value = "";
}

ws.addEventListener("open", () => {
    console.log("We are connected!");

    ws.send("Hey, how's it going?");
});

ws.addEventListener("message", e => {
    console.log(e);
});