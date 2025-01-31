import { ErrorHandler } from "../helpers/ErrorHandler.js";
import { BlogPost } from "../models/blogModel.js"

/**
 * createBlogService        - It creates a new blog.
 * @param {String} title    - Title of the blog
 * @param {String} content  - Content of the blog
 * @param {String} userId   - UserId of the user
 * @returns {Object} blog   - Returns the blog object
 */
export const createBlogService = async ({title, content, userId}) => {
    const blog = await BlogPost.create({
        title,
        content,
        author: userId
    })
    return blog;
}

/**
 * getAllBlogsService                   - It gets all blogs.
 * @returns {Promise<BlogPost[]>} blogs - Returns an array of blogs
 */
export const getAllBlogsService = async () => {
    const blogs = await BlogPost.find({});
    return blogs;
}

/**
 * getAllMyBlogsService                 - It gets all blogs of the user.
 * @param {String} userId               - UserId of the user
 * @returns {Promise<BlogPost[]>} blogs - Returns an array of blogs
 */
export const getAllMyBlogsService = async (userId) => {
    const blogs = await BlogPost.find({author: userId});
    return blogs;
}

/**
 * getBlogByIdService                   - It gets a blog by id.
 * @param {String} blogId               - Id of the blog
 * @returns {Promise<BlogPost>} blog    - Returns the blog object
 */
export const getBlogByIdService = async (blogId) => {
    const blog = await BlogPost.findById(blogId).populate("author", "username email");
    if(!blog){
        throw new ErrorHandler("Blog not found", 404);
    }
    return blog;
}

/**
 * updateBlogService        - It updates a blog.
 * @param {String} title    - Title of the blog
 * @param {String} content  - Content of the blog
 * @param {String} blogId   - Id of the blog
 * @param {String} userId   - UserId of the user 
 * @returns {Object} blog   - Returns the blog object
 */
export const updateBlogService = async ({ title, content, blogId, userId }) => {
    const blog      = await BlogPost.findById(blogId);
    if(!blog){
        throw new ErrorHandler("Blog not found", 404);
    }
    if(blog.author.toString() !== userId){
        throw new ErrorHandler("You are not the author of this blog", 401);
    }
    blog.title      = title || blog.title;
    blog.content    = content || blog.content;
    return await blog.save();
}

/**
 * deleteBlogService        - It deletes a blog.
 * @param {String} blogId   - Id of the blog
 * @param {String} userId   - UserId of the user
 * @returns {Object} blog   - Returns the blog object
 */
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