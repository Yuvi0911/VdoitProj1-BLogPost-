import { compare } from "bcrypt";
import { ErrorHandler } from "../helpers/ErrorHandler.js";
import { User } from "../models/userModel.js";

export const registerUserService = async ({ username, email, password }) => {
    const user = await User.create({
        username,
        email,
        password
    })
    return user;
}

export const loginUserService = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");
    if(!user){
        throw new ErrorHandler("Invalid email or password", 401);
    }
    const isPasswordMatched = await compare(password, user.password);
    if(!isPasswordMatched){
        throw new ErrorHandler("Invalid email or password", 401);
    }
    return user;
}

export const logoutUserService = async () => {
    return {
        success: true,
        message: "Logout Successfully",
        cookieOptions: {maxAge: 0}
    }
}