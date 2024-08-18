const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    passwd:{
        type:String,
        required:true
    }
})

const userModel= mongoose.model('userModel',userSchema,'users');
const adminModel2=mongoose.model('adminModel',userSchema,'admin');
module.exports={userModel,adminModel2};