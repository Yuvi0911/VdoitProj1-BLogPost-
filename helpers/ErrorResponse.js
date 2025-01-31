import { ErrorHandler } from "./ErrorHandler.js";

const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if(err.name === "CastError"){
        const errorPath = err.path;
        err.message = `Invalid Format of ${errorPath}`;
        err.statusCode = 400;
    }
    
    if(err.code === 11000){
        const error = Object.keys(err.keyPattern).join(",");
        err.message = `Duplicate field - ${error}`;
        err.statusCode = 400;
    }

    if(err.name === "JsonWebTokenError"){
        const message = `Json web token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }

    if(err.name === "TokenExpiredError"){
        const message = "Json web token is Expired, try again";
        err = new ErrorHandler(message, 400);
    }

    const response = {
        success: false,
        message: err.message,
    }

    return res.status(err.statusCode).json(response);
}

const TryCatch = (passedFunc) => async(req, res, next) => {
    try {
        await passedFunc(req, res, next);
    }
    catch(error){
        next(error);
    }
}

export { errorMiddleware, TryCatch };