const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    blogName: { type: String, required: true, unique: true },
    des: { type: String },
    blogContent: { type: String, required: true },
    blogCover: { type: String, required: true },
    linkedProject: [{ name: String, url: String }],
    isPublished: { type: Boolean, default: false }
}, { timestamps: true })

const blogdb = mongoose.model('blogdb', blogSchema)

module.exports = blogdb