const { Schema, model } = require("mongoose");

const projectSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    github: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
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

const Project = model("Project", projectSchema);

module.exports = Project;
