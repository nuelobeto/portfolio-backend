const asyncHandler = require("express-async-handler");
const Skill = require("../models/skillModel");
const cloudinary = require("../middlewares/cloudinary");

const addSkill = asyncHandler(async (req, res) => {
  let image;

  if (!req.file) {
    image = null;
  } else {
    image = await cloudinary.uploader.upload(req.file.path);
  }

  if (Object.values(req.body).some((item) => item === "")) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const existingSkill = await Skill.findOne({
    name: new RegExp("^" + req.body.name + "$", "i"),
  });

  if (existingSkill) {
    res.status(400);
    throw new Error("Skill already exists");
  }

  if (image === null) {
    const skill = await Skill.create({
      ...req.body,
    });
    res.status(201).json(skill);
  } else {
    const skill = await Skill.create({
      ...req.body,
      image: image.secure_url,
    });
    res.status(201).json(skill);
  }
});

const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find();
  res.status(200).json(skills.map((skill) => skill));
});

const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  let image;

  if (!req.file) {
    image = skill.image;
  } else {
    image = await cloudinary.uploader.upload(req.file.path);
  }

  const updatedSkill = await Skill.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      image: req.file ? image.secure_url : image,
    },
    {
      new: true,
    }
  );

  res.status(200).json(updatedSkill);
});

const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  res.status(200).json(skill);
});

module.exports = {
  addSkill,
  getSkills,
  updateSkill,
  deleteSkill,
};
