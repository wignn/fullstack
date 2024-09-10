
const prisma = require("../config/db");
const { z } = require("zod");
const { broadcast } = require('../middleware/websocket');

const GetAllMsg = async (req, res) => {
  try {
    const Msg = await prisma.message.findMany();
    res.status(200).json(Msg);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const CreateMsg = async (req, res) => {
  try {
    const { sender, content, img, UserId } = req.body;
    if (!sender || !content || !img || UserId){
      return res.status(400).json({message: "err"})
    }
    

    const newMessage = await prisma.message.create({
      data: {
        sender: sender,
        content: content,
        Avater: img,
        userId: UserId
      },
    });

    res.status(201).json(newMessage);

    broadcast(newMessage);

    const MAX_MESSAGES = 100;
    const totalMessages = await prisma.message.count();

    if (totalMessages > MAX_MESSAGES) {
      const oldestMessages = await prisma.message.findMany({
        orderBy: {
          sentAt: "asc",
        },
        take: totalMessages - MAX_MESSAGES,
      });

      const oldestMessageIds = oldestMessages.map((message) => message.id);

      await prisma.message.deleteMany({
        where: {
          id: {
            in: oldestMessageIds,
          },
        },
      });
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({
        message: "Validation Error",
        errors: err.errors,
      });
    } else {
      console.error("Error creating message:", err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  }
};

module.exports = {
  GetAllMsg,
  CreateMsg,
};
