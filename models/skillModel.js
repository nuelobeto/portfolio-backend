const { Schema, model } = require("mongoose");

const skillSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    level: {
      type: String,
    },
    color: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Skill = model("Skill", skillSchema);

module.exports = Skill;
