const Blog = require('../models/Blog');

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate('createdBy', '-password');
        
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getUserBlogs = async(req, res) => {
    try {
        const {userId} = req.params;

        if(JSON.stringify(userId) !== JSON.stringify(req.user._id)) {
            res.status(401).json({
                message: "Blog owner can only access his/her blogs."
            })
        }else {
            const blogs = await Blog.find({createdBy: userId}).populate('createdBy','-password');

            res.status(201).json(blogs);
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const addBlog = async (req, res) => {
    try {
        const {title, description} = req.body;

        if(req.user) {
            const blog = new Blog({
                title,
                description,
                createdBy: req.user._id
            })
            await blog.save();
            const resBlog = await blog.populate('createdBy', '-password');
            res.status(201).json(resBlog);
        }else {
            res.status(400).json({
                message: "user not found."
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



const editBlog = async (req,res) => {
    try {
        const {title, description} = req.body;
        const {id} = req.params;

        const blog = await Blog.findById(id);

        if(!blog) {
            res.status(400).json({
                message: "Blog not found."
            })
        }else {
            const author = JSON.stringify(blog.createdBy);
            
            if(author !== JSON.stringify(req.user._id)) {
                res.status(400).json({
                    message: "Blog owner can edit the blog only."
                })
            }else {
                blog.title = title
                blog.description = description;
                await blog.save();
                const updatedBlog = await blog.populate('createdBy','-password');
                res.status(201).json(updatedBlog);
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const deleteBlog = async (req, res) => {
    try {
        const {id} = req.params;
        const blog = await Blog.findById(id);
        if(!blog) {
            res.status(400).json({
                message: "Blog not found."
            })
        }else { 
            const author = JSON.stringify(blog.createdBy);
            if(author !== JSON.stringify(req.user._id)) {
                res.status(400).json({
                    message: "Blog owner can delete the blog only."
                })
            }else {
                await blog.remove();
                res.status(201).json({
                    message: "blog deleted."
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {getAllBlogs, addBlog, editBlog, deleteBlog, getUserBlogs};