import mongoose from "mongoose";


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