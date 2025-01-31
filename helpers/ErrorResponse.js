import { ErrorHandler } from "./ErrorHandler.js";

/**
 * errorMiddleware          - Express error-handling middleware.
 * @param {Object} err      - Error object containing message & statusCode
 * @param {Object} req      - Express request object
 * @param {Object} res      - Express response object
 * @param {Function} next   - Express next function
 * @returns {Object}        - JSON response with error message and status code
 */
const errorMiddleware = (err, req, res, next) => {
    err.message     = err.message || "Internal Server Error";
    err.statusCode  = err.statusCode || 500;

    if(err.name === "CastError"){
        const errorPath  = err.path;
        err.message      = `Invalid Format of ${errorPath}`;
        err.statusCode   = 400;
    }
    
    if(err.code === 11000){
        const error     = Object.keys(err.keyPattern).join(",");
        err.message     = `Duplicate field - ${error}`;
        err.statusCode  = 400;
    }

    if(err.name === "JsonWebTokenError"){
        const message   = `Json web token is invalid, try again`;
        err             = new ErrorHandler(message, 400);
    }

    if(err.name === "TokenExpiredError"){
        const message   = "Json web token is Expired, try again";
        err             = new ErrorHandler(message, 400);
    }

    const response = {
        success: false,
        message: err.message,
    }

    return res.status(err.statusCode).json(response);
}

/**
 * TryCatch                     - A higher-order function for handling async errors in Express routes.
 * @param {Function} passedFunc - The async function to be wrapped in a try-catch block.
 * @returns {Function}          - Returns a new async function with error handling.
 */
const TryCatch = (passedFunc) => async(req, res, next) => {
    try {
        await passedFunc(req, res, next);
    }
    catch(error){
        next(error);
    }
}

export { errorMiddleware, TryCatch };