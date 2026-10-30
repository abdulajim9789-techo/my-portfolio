const express = require("express");
const Achievement = require("../models/Achievement");

const router = express.Router();

// GET all achievements
router.get("/", async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: achievements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET one achievement
router.get("/:id", async (req, res) => {
  try {
    const achievement =
      await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.json({
      success: true,
      data: achievement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// CREATE achievement
router.post("/", async (req, res) => {
  try {
    const achievement =
      await Achievement.create(req.body);

    res.status(201).json({
      success: true,
      message: "Achievement created successfully!",
      data: achievement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE achievement
router.put("/:id", async (req, res) => {
  try {
    const achievement =
      await Achievement.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.json({
      success: true,
      message: "Achievement updated successfully!",
      data: achievement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE achievement
router.delete("/:id", async (req, res) => {
  try {
    const achievement =
      await Achievement.findByIdAndDelete(
        req.params.id
      );

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.json({
      success: true,
      message: "Achievement deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;