const express=require('express');
const {userModel}=require('../models/userModels');
const {hashPassword,comparePassword}=require('../utils/securePassword');
//const mongoose= require('mongoose')
const loginRouter=express.Router();
const {sendOtp,sendResetLink}=require('../utils/mail')
const {createAuth,loginAuth}=require('../auth/createAuth');

function generateOtp(){
    var otp= Math.floor(100000+Math.random()*900000).toString();
    console.log(otp);
    return otp;
 }
//console.log(generateOtp()); 

loginRouter.post('/login-user',async(req,res,next)=>{
    console.log('entered login user');
    console.log(req.body);
    const {email,passwd}=req.body;
    if(email===''|| passwd===''){
        return res.send({status:400,msg:'Missing input elements'})
    }
    const user=await userModel.findOne({email:email});
    console.log(user);
    if(user===null) return res.send({status:404,msg:'No such user exist,try creating an account'});
    
    if(!comparePassword(passwd,user.passwd)){
        return res.send({status:403,msg:'Invalid credentials'})
    }//if valid
    console.log('valid');
    req.session.user=user._id;
    console.log(req.session.user);
    return res.send({status:200,msg:'ok validated'})
})

loginRouter.post('/create-user',async(req,res,next)=>{
    console.log(req.body);
    const {fname,lname,email,passwd,confirmpasswd}=req.body;
    if(fname==='' || lname=='' || email===''||passwd==='') return res.send({status:403,msg:'Some input fields are missing'});
    const user=await userModel.findOne({email:email});
    if(user!==null) return res.send({status:400,msg:'user with similar mail id already exist,try logging in instead'})
    const otp=generateOtp();
    console.log(otp);
    const hashOtp=hashPassword(otp);
    const hashedPasswd=hashPassword(passwd);
    let otpData={fname,to:email,otp}
    //sending otp
    const mailinfo=await sendOtp(otpData)
        console.log(mailinfo);
        if(mailinfo==='Success'){
            console.log('otp send');
            //if otp is send in mail
            req.session.data={fname,lname,email,hashedPasswd,hashOtp};
            console.log(req.session.user);
            console.log(req.session);
            res.send({status:200,msg:'success'})    
        }else return res.send({status:300,msg:'some issue occured please try again later'});
})

loginRouter.post('/verify-otp',createAuth,async(req,res,next)=>{
    console.log('entered verify otp');
    const otp=req.body.otpval;
    console.log(typeof otpval);
    const sessiondata=req.session.data;
    console.log(sessiondata);
    const {fname,lname,email,hashedPasswd,hashOtp}=req.session.data;
    if(comparePassword(otp,hashOtp)){
        console.log('otp is correct');
        userModel.create({fname,lname,email,passwd:hashedPasswd})
        .then(async(data)=>{
            console.log(data);
            const userdata= await userModel.findOne({email:email})
            req.session.user=userdata._id;
            delete req.session.data;
            console.log('printing req.session');
            console.log(req.session);
            res.send({status:200,msg:'success'})
        }).catch((err)=>{
            console.log('error');
            return res.send({status:402,msg:'some issue occured',err:err})
        })
    } else{
        return res.send({status:400,msg:'invalid otp '})
    }    
})

loginRouter.post('/logout-user',(req,res,next)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            res.send({status:400,msg:'there is some issues in logging out',err:err})
        }else{
            console.log('login success');
            res.send({status:200,msg:'Logout success'})
        }
    })
})

loginRouter.get('/',(req,res,next)=>{
    console.log('in / route');
    res.send({status:200,msg:'success'})
})

module.exports=loginRouter