const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    issuer: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: String,
      default: "",
      trim: true,
    },

    credentialUrl: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Certification",
  certificationSchema
);