const express=require('express')
const router=express.Router()
const logindb = require('../models/signIn.js')
const bcryptjs = require('bcryptjs')

router.post('/login',async(req,res)=>{
  try{
    const {userName,email,password}=req.body

    const user=await logindb.findOne({userName})
    if(!user){
      return res.status(404).json({message:"user not found"})
    }

    const isPasswordCorrect=await bcryptjs.compare( password, user.password)

    if(!isPasswordCorrect){
        return res.status(401).json("please enter valid password")
    }
    return res.status(201).json({message:"successfully login",
      userName:user.userName,
      email:user.email
    })
  }  
  catch(err){
    res.status(501).json()
  }
})

module.exports=router