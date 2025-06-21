import express, { Router } from "express";
import {
  createCategoryTable,
  createCourseTable,
  createInstitute,
  createStudentTable,
  createTeacherTable,
} from "../controller/institute/instituteController";
import isLoggedIn from "../middleware/middleware";
import asyncErrorHandler from "../Services/asyncErrorHandler"; // Make sure the path is correct

const router: Router = express.Router();

router.route("/").post(
  isLoggedIn,
  asyncErrorHandler(createInstitute),
  asyncErrorHandler(createTeacherTable),
  asyncErrorHandler(createStudentTable),
  asyncErrorHandler(createCategoryTable), // ✅ added missing asyncErrorHandler + comma
  asyncErrorHandler(createCourseTable)
);

export default router;
