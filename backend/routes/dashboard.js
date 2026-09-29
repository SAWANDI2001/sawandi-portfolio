const express = require("express");
const Project = require("../models/Project");
const Message = require("../models/Message");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Dashboard Stats - Admin only
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const projectCount = await Project.countDocuments();
    const messageCount = await Message.countDocuments();

    res.json({
      projects: projectCount,
      messages: messageCount,
      skills: 13,
    });
  } catch (error) {
    console.error("DASHBOARD ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch dashboard stats",
      error: error.message,
    });
  }
});

module.exports = router;