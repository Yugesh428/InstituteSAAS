import express, { Router, Request } from "express";
import isLoggedIn from "../middleware/middleware";
import asyncErrorHandler from "../Services/asyncErrorHandler";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getSingleCourse,
} from "../controller/courseController";
import multer, { FileFilterCallback } from "multer";
import { storage } from "../Services/cloudinaryConfig";

const router: Router = express.Router();

// Multer setup for file upload
const upload = multer({
  storage: storage,
  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are supported (PNG, JPEG, JPG)."));
    }
  },
  limits: {
    fileSize: 4 * 1024 * 1024, // 4 MB
  },
});

// ✅ POST a new course | GET all courses
router
  .route("/")
  .post(
    isLoggedIn,
    upload.single("courseThumbnail"), // This expects 'courseThumbnail' field in form-data
    asyncErrorHandler(createCourse)
  )
  .get(asyncErrorHandler(getAllCourse));

// ✅ GET a single course by ID | DELETE a course by ID
router
  .route("/:id")
  .get(asyncErrorHandler(getSingleCourse))
  .delete(isLoggedIn, asyncErrorHandler(deleteCourse));

export default router;
