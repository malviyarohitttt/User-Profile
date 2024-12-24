let multer = require("multer");

let storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

let upload = multer({storage})

module.exports = upload;