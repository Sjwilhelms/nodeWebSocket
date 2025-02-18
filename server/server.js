const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8082 });

const clients = new Set();

wss.on("connection", ws => {
    console.log("New client connected!");
    clients.add(ws);

    ws.on("message", data => {
        const messageString = data.toString();


        clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(messageString);
            }
        });
    });

    ws.on("close", () => {
        console.log("The client has disconnected.");
        clients.delete(ws);
    });

    // error handling
    ws.on("error", (error) => {
        console.error("WebSocket error:", error);
        clients.delete(ws);
    });
});