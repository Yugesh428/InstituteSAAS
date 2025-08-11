import express, { Application } from "express";

// --- IMPORTS ---
import authroute from "./Routes/globals/auth/authRoute";
import instituteRouter from "./Routes/institueRoute"; // FIX #1 and #2
import courseRouter from "./Routes/courseRoute";
import categoryRouter from "./Routes/categoryRoute";
import teacherRouter from "./Routes/teacherRoute";
import teacherRoute from "./Routes/teacher/teacherRoute";
import lessonRoute from "./Routes/teacher/course/lessons/lessonRoute";
import chapterRoute from "./Routes/teacher/course/chapters/courseChapterRoute";

import cors from "cors";
const app: Application = express(); // <-- Initialize express app here

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
); // <-- Middleware to parse JSON body

// --- ROUTES ---
// More specific route paths are better
app.use("/api/auth", authroute);
app.use("/api/institute", instituteRouter);
app.use("/api/institute/course", courseRouter);
app.use("/api/institute/category", categoryRouter);
app.use("/api/institute/teacher", teacherRouter);
app.use("/api/teacher", teacherRoute);
app.use("/api/teacher/course", chapterRoute);
app.use("/api/teacher/course", lessonRoute);

export default app;
