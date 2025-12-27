import multer from "multer";
import path from "path";

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");  // folder for images + pdf + videos
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

// File Filter (allow images + pdf + videos)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
    "video/mp4",
    "video/mpeg",
    "video/quicktime"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images, PDF, and video files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
