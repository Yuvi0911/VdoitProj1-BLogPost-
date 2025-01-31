import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { createBlog, deleteBlog, getAllBlogs, getAllMyBlogs, getBlogById, updateBlog } from "../controllers/blogController.js";

const app = express.Router();

app.post("/create", isAuthenticated, createBlog);

app.get("/all", getAllBlogs);

app.get("/myBlogs", isAuthenticated, getAllMyBlogs);

app.get("/:id", getBlogById);

app.put("/:id", isAuthenticated, updateBlog);

app.delete("/:id", isAuthenticated, deleteBlog);

export default app;