import express, { Router } from "express";
import asyncErrorHandler from "../../../../Services/asyncErrorHandler";
import { isLoggedIn, restrictTo } from "../../../../middleware/middleware";
import { createCourseChapterTable } from "../../../../controller/institute/instituteController";
import {
  addChapterToCourse,
  fetchCourseChapters,
} from "../../../../controller/Teacher/courses/chapters/chapterController";
import { UserRole } from "../../../../middleware/type";

const router: Router = express.Router();

router
  .route("/:courseId/chapters/")
  .post(
    isLoggedIn,
    restrictTo(UserRole.Teacher),
    asyncErrorHandler(addChapterToCourse)
  )
  .get(isLoggedIn, asyncErrorHandler(fetchCourseChapters));

export default router;
