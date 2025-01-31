import jwt from "jsonwebtoken";

/**
 * successResponse                  - Sends a standardized success response.
 * @param {Object} res              - Express response object
 * @param {string} message          - Success message to be sent in the response
 * @param {Object} [data={}]        - Optional data to include in the response (default is an empty object)
 * @param {number} [statusCode=200] - HTTP status code (default is 200)
 * @returns {Object}                - JSON response with success status, message, and optional data
 */
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
}

/**
 * sendToken                - Generates a JWT token for the user and sends it in a cookie with the response.
 * 
 * @param {Object} res      - Express response object
 * @param {Object} user     - User object containing at least `_id`
 * @param {number} code     - HTTP status code for the response
 * @param {string} message  - Success message to send in response
 * @returns {Object}        - JSON response with success status, user data, and token stored in a cookie
 */
export const sendToken = (res, user, code, message) => {
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

    return res.status(code).cookie("blogPost-token", token, cookieOptions).json({
        success: true,
        user,
        message,
    })
}
