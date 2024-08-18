// get-userdata
const express=require('express');
const {loginAuth}=require('../auth/createAuth');
const {userModel} = require('../models/userModels');
const userRouter=express.Router();

userRouter.get('/get-userdata', loginAuth,(req,res,next)=>{
    console.log('in get userdata');
    const data=req.logindata;
    delete req.logindata;
    console.log(1);
    console.log(data);
    console.log(2);
    return res.send({status:200,data:data})
})


userRouter.post('/delete-user',loginAuth,async(req,res,next)=>{
    console.log('entered delte user');
    if(!req.body.email) return res.send({status:300,msg:'some issues occured, try again after sometime'})
    try{
        const id=req.session.user;
        await new Promise((resolve,reject)=>{
            req.session.destroy((err)=>{
                if(err){
                    console.log('some error occured in deleting session');
                    return reject(err);
                }
                resolve();
            })
        })    
        await userModel.findByIdAndDelete(id);
        return res.send({status:200,msg:'success'})
    }catch(err){
        console.log(err);
        return res.send({status:400,msg:'sorry some issues in delting account'})
    }
})

module.exports=userRouter;
