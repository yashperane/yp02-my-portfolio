const express=require('express')
const router=express.Router()
const projectdb = require('../models/project.js');

//-----project releted api started at this point-------
// this post request endpoint creates new projects
router.post('/create-new-project', async (req, res) => {
    try {
        const createNewProject = await projectdb.create(req.body)

        res.status(200).json(createNewProject)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// this get request endpoint sends all projects to client
router.get('/getProjects', async (req, res) => {
    try {
        const getProject = await projectdb.find({isPublished:true})

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
// this get request endpoint sends all projects to admin access
router.get('/getProjects/admin', async (req, res) => {
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
router.patch('/update-project/:id', async (req, res) => {
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
router.delete('/delete-project/:id', async (req, res) => {
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

module.exports=router