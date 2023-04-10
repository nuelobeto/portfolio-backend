const express = require("express");
const router = express.Router();

const {
  addExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
} = require("../controllers/experienceController");

router.post("/addExperience", addExperience);

router.get("/getExperiences", getExperiences);

router.put("/updateExperience/:id", updateExperience);

router.delete("/deleteExperience/:id", deleteExperience);

module.exports = router;
