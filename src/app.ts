import express, { Application } from "express";

// --- IMPORTS ---
import authroute from "./Routes/globals/auth/authRoute";
import instituteRouter from "./Routes/institueRoute"; // FIX #1 and #2
import courseRouter from "./Routes/courseRoute";
import categoryRouter from "./Routes/categoryRoute";
import teacherRouter from "./Routes/teacherRoute"
const app: Application = express(); // <-- Initialize express app here

app.use(express.json()); // <-- Middleware to parse JSON body

// --- ROUTES ---
// More specific route paths are better
app.use("/api/auth", authroute);
app.use("/api/institute", instituteRouter);
app.use("/api/course", courseRouter);
app.use("/api/category", categoryRouter);
app.use("/api/teacher",teacherRouter)

export default app;
