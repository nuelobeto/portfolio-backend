const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const cloudinary = require("../middlewares/cloudinary");

const addProject = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Please upload a project image");
  }

  const image = await cloudinary.uploader.upload(req.file.path);

  if (Object.values(req.body).some((item) => item === "")) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const existingProject = await Project.findOne({
    title: new RegExp("^" + req.body.title + "$", "i"),
  });

  if (existingProject) {
    res.status(400);
    throw new Error("Project already exists");
  }

  const project = await Project.create({
    ...req.body,
    image: image.secure_url,
  });

  res.status(201).json(project);
});

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();
  res.status(200).json(projects);
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  let image;

  if (!req.file) {
    image = project.image;
  } else {
    image = await cloudinary.uploader.upload(req.file.path);
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      image: req.file ? image.secure_url : image,
    },
    {
      new: true,
    }
  );

  res.status(200).json(updatedProject);
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  res.status(200).json(project);
});

module.exports = {
  addProject,
  getProjects,
  updateProject,
  deleteProject,
};
