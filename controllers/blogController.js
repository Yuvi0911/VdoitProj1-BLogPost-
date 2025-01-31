import { ErrorHandler } from "../helpers/ErrorHandler.js";
import { TryCatch } from "../helpers/ErrorResponse.js";
import { successResponse } from "../helpers/SuccessResponse.js";
import { createBlogService, deleteBlogService, getAllBlogsService, getAllMyBlogsService, getBlogByIdService, updateBlogService } from "../services/blogService.js";

/* 
    createBlog - It calls the createBlogService to create a new blog.
    @param {Object} req - Express request object
    @param {Object} res - Express response object
    @param {Function} next - Express next function
*/
export const createBlog = TryCatch(async (req, res, next) => {
    const { title, content } = req.body;
    if(!title || !content){
        return next(new ErrorHandler("Missing fields", 404))
    }
    const blog = await createBlogService({title, content, userId: req.user});
    successResponse(res, "Blog created successfully", blog, 201);
})

/* 
    getAllBlogs - It calls the getAllBlogsService to get all blogs.
    @param {Object} req - Express request object
    @param {Object} res - Express response object
    @param {Function} next - Express next function
*/
export const getAllBlogs = TryCatch(async (req, res, next) => {
    const blogs = await getAllBlogsService();
    successResponse(res, "All Blogs fetched successfully", blogs, 200);
})

/* 
    getAllMyBlogs - It calls the getAllMyBlogsService to get all blogs of the user.
    @param {Object} req - Express request object
    @param {Object} res - Express response object
    @param {Function} next - Express next function
*/
export const getAllMyBlogs = TryCatch( async(req, res, next) => {
    const blogs = await getAllMyBlogsService(req.user);
    successResponse(res, "All My Blogs fetched successfully", blogs, 200);
})

/* 
    getBlogById - It calls the getBlogByIdService to get a blog by id.
    @param {Object} req - Express request object
    @param {Object} res - Express response object
    @param {Function} next - Express next function
*/
export const getBlogById = TryCatch( async(req, res, next) => {
    const blog = await getBlogByIdService(req.params.id);

    successResponse(res, "Blog fetched successfully", blog, 200);

})

/* 
    updateBlog - It calls the updateBlogService to update a blog.
    @param {Object} req - Express request object
    @param {Object} res - Express response object
    @param {Function} next - Express next function
*/
export const updateBlog = TryCatch( async(req, res, next) => {
    const { title, content } = req.body;

    const blog = await updateBlogService({title, content, blogId: req.params.id, userId: req.user});

    successResponse(res, "Blog updated successfully", blog, 200);
})

/* 
    deleteBlog - It calls the deleteBlogService to delete a blog.
    @param {Object} req - Express request object
    @param {Object} res - Express response object
    @param {Function} next - Express next function
*/
export const deleteBlog = TryCatch(async (req, res, next) => {
    const response = await deleteBlogService(req.params.id, req.user);

    successResponse(res, response.message, {} , 200);
})