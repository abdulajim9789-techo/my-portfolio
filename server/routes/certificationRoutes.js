const express = require("express");
const Certification = require("../models/Certification");

const router = express.Router();

// GET all certifications
router.get("/", async (req, res) => {
  try {
    const certifications = await Certification.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: certifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET single certification
router.get("/:id", async (req, res) => {
  try {
    const certification =
      await Certification.findById(req.params.id);

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      });
    }

    res.json({
      success: true,
      data: certification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// CREATE certification
router.post("/", async (req, res) => {
  try {
    const certification =
      await Certification.create(req.body);

    res.status(201).json({
      success: true,
      message: "Certification created successfully!",
      data: certification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE certification
router.put("/:id", async (req, res) => {
  try {
    const certification =
      await Certification.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      });
    }

    res.json({
      success: true,
      message: "Certification updated successfully!",
      data: certification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE certification
router.delete("/:id", async (req, res) => {
  try {
    const certification =
      await Certification.findByIdAndDelete(
        req.params.id
      );

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      });
    }

    res.json({
      success: true,
      message: "Certification deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;