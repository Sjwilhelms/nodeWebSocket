const { WebSocketServer } = require("ws");
const WebSocket = require("ws");

const ws = new WebSocket.Server({ port: 8082 });

wss.on("Connection", ws => {
    console.log("New client connected!");
});