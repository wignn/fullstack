let wss;

const setWss = (webSocketServer) => {
  wss = webSocketServer;
};

const broadcast = (message) => {
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
};

module.exports = {
  setWss,
  broadcast,
};
