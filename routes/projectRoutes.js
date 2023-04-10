const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");

const {
  addProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

router.post("/addProject", upload.single("image"), addProject);

router.get("/getProjects", getProjects);

router.put("/updateProject/:id", upload.single("image"), updateProject);

router.delete("/deleteProject/:id", deleteProject);

module.exports = router;
