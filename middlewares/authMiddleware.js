import jwt from "jsonwebtoken";
import { ErrorHandler } from "../helpers/ErrorHandler.js";
import { TryCatch } from "../helpers/ErrorResponse.js";

export const isAuthenticated = TryCatch((req, res, next) => {
    const token = req.cookies["blogPost-token"];

    if(!token){
        const error = new ErrorHandler("Please login to access this route", 401);
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedData._id;
    console.log(req.user)
    next();
})
