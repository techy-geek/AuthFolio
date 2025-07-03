import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import { removeUnverifiedAccounts } from "./automation/removeUnverifiedAccounts.js";
export const app = express();
config({ path: "./config.env" });
import cors from "cors";

app.use(
  cors({
    origin: [process.env.FRONTEND_URL], 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Add base route for testing
app.get("/", (req, res) => {
  res.send("AuthFolio backend running ✅");
});

// ✅ API Routes
app.use("/api/v1/user", userRouter);

// ✅ Housekeeping
removeUnverifiedAccounts();
connection();

// ✅ Global error handler
app.use(errorMiddleware);
