const { Schema, model } = require("mongoose");

const experienceSchema = Schema(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    roles: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Experience = model("Experience", experienceSchema);

module.exports = Experience;
