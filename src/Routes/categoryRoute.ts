import express, { Router } from "express";
import isLoggedIn from "../middleware/middleware";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../controller/category/categoryController";
import asyncErrorHandler from "../Services/asyncErrorHandler";

const router: Router = express.Router();

router
  .route("/")
  .post(isLoggedIn, asyncErrorHandler(createCategory))
  .get(isLoggedIn, asyncErrorHandler(getCategories));

router.route("/:id").delete(isLoggedIn, asyncErrorHandler(deleteCategory));

export default router;
