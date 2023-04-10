const asyncHandler = require("express-async-handler");
const Experience = require("../models/experienceModel");

const addExperience = asyncHandler(async (req, res) => {
  if (Object.values(req.body).some((item) => item === "")) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const existingExperience = await Experience.findOne({
    company: new RegExp("^" + req.body.company + "$", "i"),
  });

  if (existingExperience) {
    res.status(400);
    throw new Error("Experience already exists");
  }

  const experience = await Experience.create({
    ...req.body,
  });

  res.status(201).json(experience);
});

const getExperiences = asyncHandler(async (req, res) => {
  const experirnces = await Experience.find();
  res.status(200).json(experirnces);
});

const updateExperience = asyncHandler(async (req, res) => {
  const updatedExperience = await Experience.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    {
      new: true,
    }
  );

  res.status(200).json(updatedExperience);
});

const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findByIdAndDelete(req.params.id);
  res.status(200).json(experience);
});

module.exports = {
  addExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
};
