const ws = new WebSocket("ws://localhost:8082");


let inputMessage = document.getElementById("input-message");
let sendButton = document.getElementById("submit");
let messageText;

function sendMessage() {

    messageText = inputMessage.value;
    ws.send(messageText);
    // handle the message bubble
    const chatHistory = document.getElementById("chat-history");
    const messageBubble = document.createElement("div");
    messageBubble.className = "message-bubble sent-messages";

    // handle the text
    messageOutput = document.createTextNode(inputMessage.value);

    // handle the time
    const now = new Date();
    const timestring = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // write the timestamp to the message bubble
    const timestamp = document.createElement("div");
    timestamp.className = "timestamp";
    timestamp.textContent = timestring;

    // write the user input to the message bubble
    messageBubble.appendChild(messageOutput);

    // append timestamp and sent message to bubble
    messageBubble.appendChild(timestamp);
    chatHistory.appendChild(messageBubble);


    // clear the user input which each use
    inputMessage.value = "";
}