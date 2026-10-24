const moongose = require('mongoose')
const cors = require('cors')
const express = require('express')
const port = 3000
const app = express()
const projectdb = require('./models/project.js');

app.use(express.json())

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
app.post('/create-new-project', async (req, res) => {

    try {
        const createNewProject = await projectdb.create(req.body)

        res.status(200).json(createNewProject)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})
app.get('/getProjects', async (req, res) => {
    try {
        const getProject = await projectdb.find()

        if (getProject.length === 0) {
            return res.status(200).json({ message: "no data avialable" })
        }

        res.status(200).json(getProject)

    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})
app.p