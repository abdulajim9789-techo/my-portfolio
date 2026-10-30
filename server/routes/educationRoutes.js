const express = require("express");
const Education = require("../models/Education");

const router = express.Router();

// GET all education
router.get("/", async (req, res) => {
  try {
    const education = await Education.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: education,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET one education
router.get("/:id", async (req, res) => {
  try {
    const education = await Education.findById(
      req.params.id
    );

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    res.json({
      success: true,
      data: education,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// CREATE education
router.post("/", async (req, res) => {
  try {
    const education = await Education.create(req.body);

    res.status(201).json({
      success: true,
      message: "Education created successfully!",
      data: education,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE education
router.put("/:id", async (req, res) => {
  try {
    const education =
      await Education.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    res.json({
      success: true,
      message: "Education updated successfully!",
      data: education,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE education
router.delete("/:id", async (req, res) => {
  try {
    const education =
      await Education.findByIdAndDelete(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    res.json({
      success: true,
      message: "Education deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;