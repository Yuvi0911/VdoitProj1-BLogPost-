import { ErrorHandler } from "../helpers/ErrorHandler.js";
import { BlogPost } from "../models/blogModel.js"
import { prisma } from "./../prisma/index.js";

/**
 * createBlogService        - It creates a new blog.
 * @param {String} title    - Title of the blog
 * @param {String} content  - Content of the blog
 * @param {String} userId   - UserId of the user
 * @returns {Object} blog   - Returns the blog object
 */
export const createBlogService = async ({title, content, userId}) => {
    const blog = await prisma.blogPost.create({
        data: {
            title,
            content,
            author: { connect: { id: userId } }
        }
    })
    
    return blog;
}

/**
 * getAllBlogsService                   - It gets all blogs.
 * @returns {Promise<BlogPost[]>} blogs - Returns an array of blogs
 */
export const getAllBlogsService = async () => {
    const blogs = await prisma.blogPost.findMany();
    return blogs;
}

/**
 * getAllMyBlogsService                 - It gets all blogs of the user.
 * @param {String} userId               - UserId of the user
 * @returns {Promise<BlogPost[]>} blogs - Returns an array of blogs
 */
export const getAllMyBlogsService = async (userId) => {
    const blogs = await prisma.blogPost.findMany({
        where: {
            authorId: userId,
        }
    })
    return blogs;
}

/**
 * getBlogByIdService                   - It gets a blog by id.
 * @param {String} blogId               - Id of the blog
 * @returns {Promise<BlogPost>} blog    - Returns the blog object
 */
export const getBlogByIdService = async (blogId) => {
    const blog = await prisma.blogPost.findUnique({
        where: { id: blogId },
        include: {
            author: {
                select: {
                    username: true,
                    email: true
                }
            }
        }
    })
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
export const updateBlogService = async ({ title, content, blogId, userId }) => 
{
    const blog      = await prisma.blogPost.findUnique({
        where: { id: blogId },
        include: {
            author: true
        }
    })
    if(!blog)
    {
        throw new ErrorHandler("Blog not found", 404);
    }
    if(blog.authorId !== userId)
    {
        throw new ErrorHandler("You are not the author of this blog", 401);
    }
    const updateBlog = await prisma.blogPost.update({
        where: { id: blogId },
        data: 
        {
            title: title || blog.title,
            content: content || blog.content
        }
    });
    return updateBlog;
}

/**
 * deleteBlogService        - It deletes a blog.
 * @param {String} blogId   - Id of the blog
 * @param {String} userId   - UserId of the user
 * @returns {Object} blog   - Returns the blog object
 */
export const deleteBlogService = async (blogId, userId) => 
{
    const blog = await prisma.blogPost.findUnique
    ({
        where: { id: blogId },
        include: { author: true }
    });
    if(!blog)
    {
        throw new ErrorHandler("Blog not found", 404);
    }
    if(blog.authorId !== userId)
    {
        throw new ErrorHandler("You are not the author of this blog", 401);
    }
    await prisma.blogPost.delete({
        where: { id: blogId }
    })
    return {message: "Blog deleted successfully"};
}