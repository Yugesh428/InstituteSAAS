import express, { Application } from "express";

// --- IMPORTS ---
import authroute from "./Routes/globals/auth/authRoute";
import instituteRouter from "./Routes/institueRoute"; // FIX #1 and #2
import courseRouter from "./Routes/courseRoute";
import categoryRouter from "./Routes/categoryRoute";
import teacherRouter from "./Routes/teacherRoute";
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

export default app;
