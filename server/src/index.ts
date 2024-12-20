import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route";
import formRouter from "./routes/form.route";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/form", formRouter);

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
