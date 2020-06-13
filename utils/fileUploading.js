const multer = require("multer");

exports.fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "syllabuss") {
      cb(null, "uploads/syllabuss");
    } else if (file.fieldname === "testfile") {
      cb(null, "uploads/tests");
    } else {
      cb(null, "uploads/imagess");
    }
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});
exports.fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "text/plain" ||
    file.mimetype === "application/vnd.oasis.opendocument.text" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword" ||
    file.mimetype === "application/vnd.ms-powerpoint" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    cb(null, true);
  } else {
    console.log("wrong format");
    cb(null, false);
  }
};
