const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true }
} ,{timestamps:true})

const logindb=mongoose.model('logindb',loginSchema)

module.exports=logindb;