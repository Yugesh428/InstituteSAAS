import express, { Router } from "express";
import asyncErrorHandler from "../../../../Services/asyncErrorHandler";
import { isLoggedIn, restrictTo } from "../../../../middleware/middleware";
import { UserRole } from "../../../../middleware/type";
import {
  createChapterLesson,
  fetchChapterLesson,
} from "../../../../controller/Teacher/courses/lessons/lessonController";

const router: Router = express.Router();

router
  .route("/:chapterId/lessons")
  .post(
    isLoggedIn,
    restrictTo(UserRole.Teacher),
    asyncErrorHandler(createChapterLesson)
  )
  .get(isLoggedIn, asyncErrorHandler(fetchChapterLesson));

export default router;
