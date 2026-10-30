const express = require("express");
const Profile = require("../models/Profile");

const router = express.Router();

// GET profile
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne();

    res.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// CREATE profile
router.post("/", async (req, res) => {
  try {
    // Remove existing profile if one exists
    await Profile.deleteMany({});

    const profile = await Profile.create(req.body);

    res.status(201).json({
      success: true,
      message: "Profile created successfully!",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;