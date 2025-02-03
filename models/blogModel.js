import mongoose, {Schema, model} from "mongoose";

const blogPostSchema = new Schema
({
    title: 
    {
        type: String,
        required: [true, "Please enter Title"],
        trim: true,
        minLength: [3, "Title should be greater than 3 characters"],
        maxLength: [50, "Title should be less than 50 characters"]
    },
    content: 
    {
        type: String,
        required: [true, "Please enter content"],
        minLength: [50, "Content should be greater than 50 characters"],
        maxLength: [1000, "Content should be less than 1000 characters"]
    },
    author: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please enter author"]
    }
},
{
    timestamps: true
})

export const BlogPost = mongoose.models.BlogPost || model("BlogPost", blogPostSchema);