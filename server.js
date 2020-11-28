const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3030 });

wss.on("connection", function connection(ws, req) {
  console.log("new connection: " + req.connection.remoteAddress);
  ws.on("message", function incoming(data) {
    console.log(req.connection.remoteAddress + " send: " + data);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(req.connection.remoteAddress + ": " + data);
      }
    });
  });
});
