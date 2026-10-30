const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: true,
      trim: true,
    },

    institution: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      default: "",
      trim: true,
    },

    year: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Education",
  educationSchema
);