const moongose = require('mongoose')
const cors = require('cors')
const express = require('express')
const port = 3000
const app = express()
const projectRoutes = require('./routes/projectRoutes.js')
const blogRoutes = require('./routes/blogRoutes.js')


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
    res.send("<h1> hello testing world </h1>")
})
app.use('/', projectRoutes);
app.use('/', blogRoutes);
