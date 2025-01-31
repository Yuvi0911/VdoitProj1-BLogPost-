import { ErrorHandler } from "../helpers/ErrorHandler.js";
import { TryCatch } from "../helpers/ErrorResponse.js";
import { sendToken } from "../helpers/SuccessResponse.js";
import { loginUserService, logoutUserService, registerUserService } from "../services/authService.js";

/* 
    signup - It calls the registerUserService to register a new user.
    @param {Object} req - Express request object
    @param {Object} res - Express response object
    @param {Function} next - Express next function
*/
export const signup = TryCatch(async (req, res, next) => {
    const {username, email, password} = req.body;
    const user = await registerUserService({username, email, password});
    sendToken(res, user, 201, "User registered successfully");
})

/* 
    login - It calls the loginUserService to login a user.
    @param {Object} req - Express request object
    @param {Object} res - Express response object
    @param {Function} next - Express next function
*/
export const login = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password", 404));
    }
    const user = await loginUserService({email, password});
    sendToken(res, user, 200, `Welcome, ${user.username}`);
})

/* 
    logout - It calls the logoutUserService to logout a user.
    @param {Object} req - Express request object
    @param {Object} res - Express response object
    @param {Function} next - Express next function
*/
export const logout = TryCatch(async (req, res, next) => {
    const { success, message, cookieOptions: newCookieOptions} = logoutUserService();

    return res
    .status(200)
    .cookie("blogPost-token", null , { expires:new Date(Date.now()), httpOnly: true })
    .json({ success, message });
})