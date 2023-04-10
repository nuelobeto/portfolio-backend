const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");

const {
  addSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");

router.post("/addSkill", upload.single("image"), addSkill);

router.get("/getSkills", getSkills);

router.put("/updateSkill/:id", upload.single("image"), updateSkill);

router.delete("/deleteSkill/:id", deleteSkill);

module.exports = router;
