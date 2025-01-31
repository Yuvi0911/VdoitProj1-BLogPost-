import { compare } from "bcrypt";
import { ErrorHandler } from "../helpers/ErrorHandler.js";
import { User } from "../models/userModel.js";

/**
 * registerUserService      - It generates a new user.
 * @param {String} username - Username of the user
 * @param {String} email    - Email of the user
 * @param {String} password - Password of the user
 * @returns {Object} user   - Returns the user object
 */
export const registerUserService = async ({ username, email, password }) => {
    const user = await User.create({
        username,
        email,
        password
    })
    return user;
}

/**
 * loginUserService         - It checks if the user exists and matches the password.
 * @param {String} email    - Email of the user
 * @param {String} password - Password of the user
 * @returns {Object} user   - Returns the user object
 */
export const loginUserService = async ({ email, password }) => {
    const user              = await User.findOne({ email }).select("+password");   
    if(!user){
        throw new ErrorHandler("Invalid email or password", 401);
    }
    const isPasswordMatched = await compare(password, user.password);
    if(!isPasswordMatched){
        throw new ErrorHandler("Invalid email or password", 401);
    }
    return user;
}

/**
 * logoutUserService - It logs out the user.
 * @returns {Object} - Returns the logout response
 */
export const logoutUserService = async () => {
    return {
        success: true,
        message: "Logout Successfully",
        cookieOptions: {maxAge: 0}
    }
}