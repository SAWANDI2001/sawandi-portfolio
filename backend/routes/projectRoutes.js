const express = require("express");
const mongoose = require("mongoose");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all projects - Public
router.get("/", async (req, res) => {
  try {
    console.log("----- PROJECT TEST -----");

    console.log("Connection readyState:", mongoose.connection.readyState);
    console.log("Connection database:", mongoose.connection.name);
    console.log("Model database:", Project.db.name);
    console.log("Model readyState:", Project.db.readyState);
    console.log("Model collection:", Project.collection.name);

    const projects = await Project.find({}).exec();

    console.log("Projects found:", projects.length);

    res.json(projects);
  } catch (error) {
    console.error("PROJECT ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
});

// Add a new project - Admin only
router.post("/", authMiddleware, async (req, res) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();

    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({
      message: "Failed to add project",
      error: error.message,
    });
  }
});

// Update a project - Admin only
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update project",
      error: error.message,
    });
  }
});

// Delete a project - Admin only
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json({
      message: "Project deleted successfully",
      project: deletedProject,
    });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);

    res.status(500).json({
      message: "Failed to delete project",
      error: error.message,
    });
  }
});

module.exports = router;
