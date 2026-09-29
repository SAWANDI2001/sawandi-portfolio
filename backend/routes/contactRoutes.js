const express = require("express");
const Contact = require("../models/Contact");
const Message = require("../models/Message");

const router = express.Router();

// Send contact message - Public
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Save to Contact collection
    const contact = new Contact({
      name,
      email,
      message,
    });

    const savedContact = await contact.save();

    // Save to Message collection for Admin Messages
    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();

    res.status(201).json({
      message: "Message sent successfully",
      contact: savedContact,
    });
  } catch (error) {
    console.error("CONTACT ERROR:", error);

    res.status(500).json({
      message: "Failed to send message",
      error: error.message,
    });
  }
});

module.exports = router;
