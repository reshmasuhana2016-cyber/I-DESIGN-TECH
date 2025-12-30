import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads folder exists
const uploadsFolder = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder, { recursive: true });
}

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsFolder); // absolute path
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
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
    "video/quicktime",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images, PDF, and video files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
