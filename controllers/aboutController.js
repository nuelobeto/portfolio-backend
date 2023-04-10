const asyncHandler = require("express-async-handler");
const About = require("../models/aboutModel");
const cloudinary = require("../middlewares/cloudinary");

const addAbout = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Please upload a about image");
  }

  const image = await cloudinary.uploader.upload(req.file.path);

  if (Object.values(req.body).some((item) => item === "")) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const about = await About.create({
    ...req.body,
    image: image.secure_url,
  });

  res.status(201).json(about);
});

const getAbout = asyncHandler(async (req, res) => {
  const about = await About.find();
  res.status(200).json(about);
});

const updateAbout = asyncHandler(async (req, res) => {
  const about = await About.findById(req.params.id);
  let image;

  if (!req.file) {
    image = about.image;
  } else {
    image = await cloudinary.uploader.upload(req.file.path);
  }

  const updatedAbout = await About.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      image: req.file ? image.secure_url : image,
    },
    {
      new: true,
    }
  );

  res.status(200).json(updatedAbout);
});

module.exports = {
  addAbout,
  getAbout,
  updateAbout,
};
