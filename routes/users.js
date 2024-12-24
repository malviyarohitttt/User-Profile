var express = require("express");
var router = express.Router();
let User = require("../controller/user.controller");
let upload = require("../middleware/multer");
const multer = require("multer");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/saveProfile", upload.single("image"), User.saveProfile);

module.exports = router;
