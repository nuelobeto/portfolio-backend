const { Schema, model } = require("mongoose");

const aboutSchema = Schema(
  {
    p1: {
      type: String,
      required: true,
    },
    p2: {
      type: String,
    },
    p3: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const About = model("About", aboutSchema);

module.exports = About;
