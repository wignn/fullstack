const prisma = require("../config/db");

let wss;

const updateUserStatus = async (userId, status) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { onlineStatus: status },
    });
  } catch (error) {
    console.error(`Error updating user status for user ${userId}:`, error);
  }
};

const handleUserConnection = (client, userId) => {
  client.on('close', async () => {
    await updateUserStatus(userId, 'offline');
  });
};

const handleUserOnline = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Update user status to online
    await updateUserStatus(userId, 'online');

    res.status(200).json({ message: "User status updated to online" });

    if (wss) {
      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          // Notify other users about the status change (optional)
          client.send(JSON.stringify({ userId, status: 'online' }));
        }
      });
    }
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const setWss = (webSocketServer) => {
  wss = webSocketServer;

  wss.on('connection', (client) => {
    const userId = client.userId; 
    
    if (userId) {
      handleUserConnection(client, userId);
    }
  });
};

module.exports = {
  handleUserOnline,
  setWss,
};
