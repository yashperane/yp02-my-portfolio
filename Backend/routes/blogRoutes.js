const express=require('express')
const router=express.Router()
const blogdb=require('../models/blog.js')

//-----blog releted api started at this point-------
// this post  request endpoint create new blog  
router.post('/create-new-blog', async (req, res) => {
    try {
        const createNewBlog = await blogdb.create(req.body)

        if (!createNewBlog) {
            return res.status(501).json("Something went wrong")
        }
        res.status(200).json({ cretedBlog: createNewBlog })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// this get request endpoint send all project to client 
router.get('/getBlog', async (req, res) => {
    try {
        const getAllBlogs = await blogdb.find({isPublished:true})

        if (getAllBlogs.length === 0) {
            return res.status(404).json("No Blogs Avialble")
        }
        res.status(200).json({
            total: getAllBlogs.length,
            allBlogList: getAllBlogs
        })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// this get request endpoint send all project to admin access 
router.get('/getBlog/admin', async (req, res) => {
    try {
        const getAllBlogs = await blogdb.find()

        if (getAllBlogs.length === 0) {
            return res.status(404).json("No Blogs Avialble")
        }
        res.status(200).json({
            total: getAllBlogs.length,
            allBlogList: getAllBlogs
        })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// this patch api endpoint updates our blog
router.patch('/update-blog/:id', async (req, res) => {
    try {
        const updatedBlog = await blogdb.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (!updatedBlog) {
            return res.status(404).json({
                Server: "Unable To Perform Operation"
            })
        }
        res.status(200).json({
            updatedBlog: updatedBlog
        })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// this delete api deletes the blog by id 
router.delete('/delete-blog/:id', async (req, res) => {
    try {
        const deletedBlog = await blogdb.findByIdAndDelete(req.params.id)

        if (!deletedBlog) {
             return res.status(404).json("not found")
        }
        res.status(200).json({
            deletedBlog:deletedBlog
        })
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

module.exports=router

