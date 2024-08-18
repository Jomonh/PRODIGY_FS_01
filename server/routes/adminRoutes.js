const express=require('express')
const {userModel,adminModel2}=require('../models/userModels');
const {comparePassword}=require('../utils/securePassword')
const {adminAuth}=require('../auth/createAuth')
const adminRoutes=express.Router();

adminRoutes.post('/admin-login',async(req,res,next)=>{
    console.log('entered admin login');
    console.log(req.body);
    const {email,password}=req.body;
    if(email===''||password==='') return res.send({status:300,msg:'some input fields are missing'});
    const admin=await adminModel2.findOne({email:email});
    console.log(admin);
    if(admin===null) return res.send({status:400,msg:'no such user exist'});
    if(!comparePassword(password,admin.passwd)) return res.send({status:201,msg:'Invalid credentials'});
    //if password is correct
    req.session.admin=admin._id;
    console.log(req.session);
    return res.send({status:200,msg:'admin login success'})
})

adminRoutes.post('/admin-logout',(req,res,next)=>{
    req.session.destroy((err)=>{
        if(err) {
            console.log(err);
            return res.send({status:400,msg:'some issues in deleting session'})
        }else{
            console.log('success');
            return res.send({status:200,msg:'admin user logged out successfully'})
        }
    })  
})

adminRoutes.get('/get-admindata',adminAuth,(req,res,next)=>{
    const data=req.logindata;
    console.log(data);
    delete req.logindata;
    return res.send({status:200,data:data})
})

adminRoutes.get('/get-usersdata',adminAuth,async(req,res,next)=>{
    try{
        const users= await userModel.find({},{fname:1,lname:1,email:1,_id:0}); //.project({fname:1,lname:1,email:1,_id:0,passwd:0});
        console.log(users);
        delete req.logindata;
        return res.send({status:200,users:users})    
    }catch(err){
        console.log(err);
        return res.send({status:400,err:err,msg:'some error occured in fetching users data'})
    }
})

module.exports=adminRoutes;