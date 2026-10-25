const moongose = require('mongoose')
const cors = require('cors')
const express = require('express')
const port = 3000
const app = express()
const projectdb = require('./models/project.js');
const blogdb = require('./models/blog.js');


// this middleware is used for tracking every activity occurs on server 
app.use((req, res, next) => {
    console.log(req.method, req.url)

    res.on('finish', () => {
        console.log(res.statusCode)
    })

    next()
})

app.use(express.json())
app.use(cors())

moongose.connect('mongodb://localhost:27017/portfolio')
    .then(() => {
        console.log(`mongodb is connected`)
        app.listen(port, () => {
            console.log(`server is connected on ${port}`)
        })
    })
    .catch((err) => {
        console.log(" mongodb is not connected", err)
    })

app.get('/', (req, res) => {
    res.send("<h1> hello world</h1>")
})
//-----project releted api started at this point-------
// this post request endpoint creates new projects
app.post('/create-new-project', async (req, res) => {
    try {
        const createNewProject = await projectdb.create(req.body)

        res.status(200).json(createNewProject)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// this get request endpoint sends all projects to client
app.get('/getProjects', async (req, res) => {
    try {
        const getProject = await projectdb.find()

        if (getProject.length === 0) {
            return res.status(200).json({ message: "No Data Avialable" })
        }

        res.status(200).json({
            total: getProject.length,
            allprojects: getProject
        })

    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// this patch request endpoint update our project 
app.patch('/update-project/:id', async (req, res) => {
    try {
        const updatedProject = await projectdb.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedProject) {
            return res.status(404).json("Project not found")
        }
        res.status(200).json(updatedProject)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// this delete request endpoint deletes our project 
app.delete('/delete-project/:id', async (req, res) => {
    try {
        const deletedProject = await projectdb.findByIdAndDelete(req.params.id)

        if (!deletedProject) {
            return res.status(404).json("project not found in database")
        }
        res.status(200).json({
            deletedProject: deletedProject
        })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//-----blog releted api started at this point-------
// this post  request endpoint create new blog  
app.post('/create-new-blog', async (req, res) => {
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
app.get('/getBlog', async (req, res) => {
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
app.patch('/update-blog/:id', async (req, res) => {
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
app.delete('/delete-blog/:id', async (req, res) => {
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
