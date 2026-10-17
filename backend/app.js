import express from "express";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection from "./database/dbConnection.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, ".env") });

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: frontendUrl,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true, service: "Job Portal API" });
});

app.get("/api/health/ready", async (_req, res) => {
  try {
    await dbConnection();
    res.status(200).json({ success: true, service: "Job Portal API", database: "connected" });
  } catch (error) {
    res.status(503).json({ success: false, service: "Job Portal API", database: "unavailable" });
  }
});

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

app.use("/api/v1", async (_req, _res, next) => {
  try {
    await dbConnection();
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

app.use(errorMiddleware);
export default app;
