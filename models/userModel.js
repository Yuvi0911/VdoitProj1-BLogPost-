import mongoose, {Schema, model} from "mongoose";
import { hash } from 'bcrypt';
import validator from "validator";

const userSchema = new Schema
({
    username: 
    {
        type: String,
        required: [true, "Please enter username"],
    },
    email: 
    {
        type: String,
        required: [true, " Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: 
    {
        type: String,
        minLength: [8, "Password should be greater than 8 characters"],
        select: false
    }
},
{
    timestamps: true,
})


userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await hash(this.password, 10);
})

export const User = mongoose.models.User || model("User", userSchema);