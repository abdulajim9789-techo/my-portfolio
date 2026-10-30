const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    organization: {
      type: String,
      default: "",
      trim: true,
    },

    date: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    link: {
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
  "Achievement",
  achievementSchema
);
