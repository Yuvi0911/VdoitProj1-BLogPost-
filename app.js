import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { errorMiddleware } from "./helpers/ErrorResponse.js";
import authRouter from "./routes/authRoute.js";
import blogRouter from "./routes/blogRoute.js";

dotenv.config({
    path: "./.env",
})

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blog", blogRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is working on port: ${PORT}`)
})