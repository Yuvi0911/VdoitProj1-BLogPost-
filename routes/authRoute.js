import express from "express";
import { login, logout, signup } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const app = express.Router();

app.post("/signup", signup);

app.post("/login", login);

app.use(isAuthenticated);

app.get("/logout", logout);

export default app;