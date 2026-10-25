const moongoose = require('mongoose')

const projectSchema = new moongoose.Schema({
    projectName: { type: String, required: true, unique: true },
    liveLink: { type: String },
    des: { type: String },
    projectCover: { type: String, required: true },
    linkedBlog: [{ name: String, url: String }],
    isPublished: { type: Boolean, default: false }
}, { timestamps: true })

const projectdb = moongoose.model('projectdb', projectSchema)

module.exports = projectdb;