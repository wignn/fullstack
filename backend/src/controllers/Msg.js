const prisma = require("../config/db");
const {z} = require('zod')

const GetAllMsg = async (req, res) => {

    try {
      const Msg = await prisma.message.findMany();
      res.status(200).json(Msg);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };

  const CreateMsg = async (req, res) => {
    try {
        const { sender, content } = req.body;
      
      const newMessage = await prisma.message.create({
        data: {
          sender: sender,
          content:content,
      
        },
      });
  
      res.status(201).json(newMessage);
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