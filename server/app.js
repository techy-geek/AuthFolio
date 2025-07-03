import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import { removeUnverifiedAccounts } from "./automation/removeUnverifiedAccounts.js";

export const app = express();

// ✅ Load env variables
config();

// ✅ Handle CORS (including preflight OPTIONS)
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // e.g. https://authfolio.netlify.app
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// ✅ Preflight (OPTIONS) handler for all routes
app.options("*", cors());

// ✅ Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Simple root route to check server status
app.get("/", (req, res) => {
  res.send("AuthFolio backend running ✅");
});

// ✅ User routes
app.use("/api/v1/user", userRouter);

// ✅ Cleanup inactive accounts
removeUnverifiedAccounts();

// ✅ Connect DB
connection();

// ✅ Global error handler
app.use(errorMiddleware);
