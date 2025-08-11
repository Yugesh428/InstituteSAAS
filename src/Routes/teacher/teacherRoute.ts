import express, { Router } from "express";
import asyncErrorHandler from "../../Services/asyncErrorHandler";
import { teacherLogin } from "../../controller/Teacher/teacherController";
const router: Router = express.Router();

router.route("/login").post(asyncErrorHandler(teacherLogin));

export default router;
