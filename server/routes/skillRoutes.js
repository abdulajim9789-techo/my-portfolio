const express = require("express");
const Skill = require("../models/Skill");

const router = express.Router();

// GET all skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// CREATE skill
router.post("/", async (req, res) => {
  try {
    const skill = await Skill.create(req.body);

    res.status(201).json({
      success: true,
      message: "Skill created successfully!",
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE skill
router.put("/:id", async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.json({
      success: true,
      message: "Skill updated successfully!",
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE skill
router.delete("/:id", async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.json({
      success: true,
      message: "Skill deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;