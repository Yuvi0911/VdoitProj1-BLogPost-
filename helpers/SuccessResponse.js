import jwt from "jsonwebtoken";

export const successResponse = (res, message, data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    })
}

export const cookieOptions = {
    maxAge: 15*24*60*60*1000,
    sameSite: "none",
    httpOnly: true,
    // secure: true,
}

export const sendToken = (res, user, code, message) => {
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

    return res.status(code).cookie("blogPost-token", token, cookieOptions).json({
        success: true,
        user,
        message,
    })
}
