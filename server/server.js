const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8082 });

wss.on("connection", ws => {
    console.log("New client connected!");

    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`);
        const message = data.toString();
        ws.send(message.toUpperCase());
    });

    ws.on("close", () => {
        console.log("The client has disconnected.");
    });
});