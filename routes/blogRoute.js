const express = require('express');
const router = express.Router();
const {getAllBlogs, addBlog, editBlog, deleteBlog, getUserBlogs} = require('../controllers/BlogController.js')
const protect = require('../middlewares/authMiddleware');

// Route : /api/blogs/
// @DESC public route : GET all blogs.
router.route('/').get(getAllBlogs);

// Route : /api/blogs/:userId
// @DESC protected route : GET all user blogs.
router.route('/:userId').get(protect, getUserBlogs);

// Route : /api/blogs/add
// @DESC protected route : POST add blog.
router.route('/add').post(protect, addBlog);

// Route : /api/blogs/edit/:id
// @DESC protected route : PUT edit blog.
router.route('/edit/:id').put(protect, editBlog);

// Route : /api/blogs/delete/:id
// @DESC protected route : DELETE delete blog.
router.route('/delete/:id').delete(protect, deleteBlog);


module.exports = router;