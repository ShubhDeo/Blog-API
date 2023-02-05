const mongoose = require('mongoose');


const blogSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;