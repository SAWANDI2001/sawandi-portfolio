const express = require("express");
const router = express.Router();

const Message = require("../models/Message");
const authMiddleware = require("../middleware/authMiddleware");

// Get all messages - Admin only
router.get("/", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch messages",
      error: error.message,
    });
  }
});

// Create a message - Public
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Message({
      name,
      email,
      message,
    });

    const savedMessage = await newMessage.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({
      message: "Failed to save message",
      error: error.message,
    });
  }
});

// Delete a message - Admin only
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);

    if (!deletedMessage) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    res.json({
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete message",
      error: error.message,
    });
  }
});

module.exports = router;