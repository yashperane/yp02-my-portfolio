const express = require('express')
const router = express.Router()
const logindb = require('../models/signIn.js')
const bcryptjs = require('bcryptjs')

router.post('/create-new-account', async (req, res) => {
    try {
        const { userName, email, password } = req.body

        const existingUser = await logindb.findOne({
            $or: [{ email: email }, { userName: userName }]
        })

        if (existingUser) {
            return res.status(409).json({
                status: 'fail',
                message: 'An account with this email address and UserName already exists.'
            })
        }

        
        const hashedPassword = await bcryptjs.hash(password, 10)

         const createdAccount = await logindb.create({
            userName,
            email,
            password:hashedPassword
        })
    
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully!',
            data: {
                userName: userName,
                email: createdAccount.email }
        })

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router;