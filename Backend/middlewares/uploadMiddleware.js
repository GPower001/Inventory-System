// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // Ensure the uploads directory exists
// const uploadDir = path.join(process.cwd(), "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({ 
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//     if (!allowedTypes.includes(file.mimetype)) {
//       return cb(new Error("Only JPEG, PNG, and JPG files are allowed"), false);
//     }
//     cb(null, true);
//   },
// });

// export default upload;

import multer from "multer";
import path from "path";
import fs from "fs";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sanitizeFilename = require('sanitize-filename');

// Configure upload directory
const UPLOAD_DIR = path.join(process.cwd(), "uploads");
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const ALLOWED_MIME_TYPES = [
  'image/jpeg', 
  'image/png', 
  'image/jpg',
  'image/webp'
];

// Ensure upload directory exists
const ensureUploadDir = () => {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
};
ensureUploadDir();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname).toLowerCase();
    const baseName = sanitizeFilename(
      path.basename(file.originalname, fileExt)
    ).replace(/\s+/g, '_');
    
    const uniqueName = `${Date.now()}-${baseName}${fileExt}`;
    cb(null, uniqueName);
  }
});

// File validation
const fileFilter = (req, file, cb) => {
  const fileExt = path.extname(file.originalname).toLowerCase();
  
  if (
    !ALLOWED_EXTENSIONS.includes(fileExt) ||
    !ALLOWED_MIME_TYPES.includes(file.mimetype)
  ) {
    return cb(new Error(
      `Only ${ALLOWED_EXTENSIONS.join(', ')} files are allowed`
    ), false);
  }
  cb(null, true);
};

// Configure Multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1 // Limit to single file upload
  }
});

export default upload;
