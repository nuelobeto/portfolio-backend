const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");

const {
  addAbout,
  getAbout,
  updateAbout,
} = require("../controllers/aboutController");

router.post("/addAbout", upload.single("image"), addAbout);

router.get("/getAbout", getAbout);

router.put("/updateAbout/:id", upload.single("image"), updateAbout);

module.exports = router;
