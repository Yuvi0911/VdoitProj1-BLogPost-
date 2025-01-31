import mongoose from "mongoose";

/**
 * connectDB            - Connects to the MongoDB database.
 * @param {string} uri  - MongoDB connection URI
 * @returns {Promise<void>} Resolves if connection is successful, rejects on error
 */
export const connectDB = async (uri) => {
    mongoose.connect(uri, {
        dbName: "VdoitProj1",
    })
    .then((c) => {
        console.log(`DB Connected to ${c.connection.host}`)
    })
    .catch((e) => {
        console.log(e);
        throw e;
    })
}