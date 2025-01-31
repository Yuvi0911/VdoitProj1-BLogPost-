import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import blogRouter from "./routes/blogRoute.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./helpers/ErrorResponse.js";

dotenv.config({
    path: "./.env",
})

const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

connectDB(mongoURI);

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