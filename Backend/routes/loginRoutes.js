const express=require('express')
const router=express.Router()
const logindb=require('..//models/login.js')

router.post('/create-new-account',async (req,res)=>{
    try{
        const createdAccount=await logindb.create(req.body)
        if(!createdAccount){
           return res.status(404).json("accout not created")
        }
        res.status(200).json({
            createdAccount:createdAccount
        })

    }
    catch(err){
        res.status(501).json({
            message:err.message
        })
    }
})

module.exports=router;