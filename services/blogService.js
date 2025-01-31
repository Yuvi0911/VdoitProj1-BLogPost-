import { ErrorHandler } from "../helpers/ErrorHandler.js";
import { BlogPost } from "../models/blogModel.js"

export const createBlogService = async ({title, content, userId}) => {
    const blog = await BlogPost.create({
        title,
        content,
        author: userId
    })
    return blog;
}

export const getAllBlogsService = async () => {
    const blogs = await BlogPost.find({});
    return blogs;
}

export const getAllMyBlogsService = async (userId) => {
    const blogs = await BlogPost.find({author: userId});
    return blogs;
}

export const getBlogByIdService = async (blogId) => {
    const blog = await BlogPost.findById(blogId).populate("author", "username email");
    if(!blog){
        throw new ErrorHandler("Blog not found", 404);
    }
    return blog;
}

export const updateBlogService = async ({ title, content, blogId, userId }) => {
    const blog = await BlogPost.findById(blogId);
    if(!blog){
        throw new ErrorHandler("Blog not found", 404);
    }
    if(blog.author.toString() !== userId){
        throw new ErrorHandler("You are not the author of this blog", 401);
    }
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    return await blog.save();
}

export const deleteBlogService = async (blogId, userId) => {
    const blog = await BlogPost.findById(blogId);
    if(!blog){
        throw new ErrorHandler("Blog not found", 404);
    }
    if(blog.author.toString() !== userId){
        throw new ErrorHandler("You are not the author of this blog", 401);
    }
    await blog.deleteOne();
    return {message: "Blog deleted successfully"};
}