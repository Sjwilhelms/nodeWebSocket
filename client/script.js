const ws = new WebSocket("ws://localhost:8082");

// take user name on landing

const screenContainer = document.getElementById("screen-container");
const chatHistory = document.getElementById("chat-history");
const chatControls = document.getElementById("chat-controls");
const usernameContainer = document.getElementById("username");
const userInfo = document.getElementById("user-info");
let myUsername;
let remoteUsername;
let isLoggedIn = false;

// join the party
// take username and pass it to remote client

addEventListener("DOMContentLoaded", () => {
    chatHistory.style.display = "none";
    chatControls.style.display = "none";
    screenContainer.style.justifyContent = "center";
});


// take user name from client

function takeUsername() {
    let usernameInput = document.getElementById("username-input");
    myUsername = usernameInput.value;

    if (myUsername === "") {
        alert("Please enter a valid username");
        return;
    }
    isLoggedIn = true;

    sendUserNameMessage();

    // update UI

    userInfo.textContent = `Hello ${myUsername}, waiting for someone to join...`;
    usernameContainer.style.display = "none";
    chatHistory.style.display = "flex";
    chatControls.style.display = "flex";
    // send username to other client
}

function sendUserNameMessage() {
    const usernameMessage = {
        type: 'username',
        username: myUsername,
        isAnnouncement: true
    };
    ws.send(JSON.stringify(usernameMessage));
}



// messenger application

// sending and recieving messages

let inputMessage = document.getElementById("input-message");
let sendButton = document.getElementById("submit");

// handle incoming messages

ws.onmessage = function(event) {

    // handle usernames
    try {
        const message = JSON.parse(event.data);

        if (message.type === "username") {
            remoteUsername = message.username;
            userInfo.textContent = `Hello ${myUsername}, you are connected with ${remoteUsername}`;

            if (message.isAnnouncement && isLoggedIn) {
                setTimeout(() => {
                    const responseMessage = {
                        type: 'username',
                        username: myUsername,
                        isAnnouncement: false
                    };
                    ws.send(JSON.stringify(responseMessage));
                }, 100);
            }
            return;
        }


    } catch (error) {
        console.log("Recieved chat message");
    }

    // handle chat messages
    const recievedMessage = event.data;

    // handle the message bubble
    const messageBubble = document.createElement("div");
    messageBubble.className = "message-bubble recieved-messages";

    // Add message text
    const messageOutput = document.createTextNode(recievedMessage);

    // handle the time
    const now = new Date();
    const timestring = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // write the timestamp to the message bubble
    const timestamp = document.createElement("div");
    timestamp.className = "timestamp";
    timestamp.textContent = timestring;

    // write the recieved message to the message bubble
    messageBubble.appendChild(messageOutput);

    // append timestamp and sent message to bubble
    messageBubble.appendChild(timestamp);
    chatHistory.appendChild(messageBubble);
}

// handle sending messages

function sendMessage() {

    messageText = inputMessage.value;

    // send message to server
    ws.send(messageText);

    // handle the message bubble
    const messageBubble = document.createElement("div");
    messageBubble.className = "message-bubble sent-messages";

    // handle the text
    messageOutput = document.createTextNode(messageText);

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




// connection event handlers

// connected to server
ws.onopen = function() {
    console.log("Connected to server");
};


// error handling
ws.onerror = function(error) {
    console.error("WebSocket error:", error);
};

ws.onclose = function() {
    console.log("Disconnected from server");
};