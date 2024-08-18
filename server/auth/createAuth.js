const {userModel,adminModel2}=require('../models/userModels')
function createAuth(req,res,next){
    console.log('entered user session');
    console.log(req.session);//&& Object.keys(req.session.data).length==5
    console.log(req.session.data);
    if(req.session && req.session.data ){
        console.log('authentic create user');
        next();
    }else{
        return res.send({status:400,msg:'user session expired'})
    }
}

async function loginAuth(req,res,next){
    if(!req.session.user) return res.send({status:404,msg:'user session has expired'})
    const userdata= await userModel.findById(req.session.user);
    if(userdata!==null){
        let demodata= {fname:userdata.fname, lname:userdata.lname,email:userdata.email}
        req.logindata=demodata;
        next();
    }else{
        return res.send({status:404,msg:'user not authenticated'})
    }
}

async function adminAuth(req,res,next){
    if(!req.session.admin) return res.send({status:404,msg:'user session has expired'});
    const admindata=await adminModel2.findById(req.session.admin);
    if(admindata!=null){
        let demodata={fname:admindata.fname,lname:admindata.lname,email:admindata.email}
        req.logindata=demodata;
        next()
    }else{
        return res.send({status:404,msg:'user not authenticated'})
    }
}

function forgotAuth(req,res,next){
    //        req.session.resetData={token:token,email:email};
    console.log('entered authForgot');
    const passwd=req.body.passwd;
    console.log(passwd);
    const resetData=req.session.resetData;
    console.log(resetData);
    if(resetData && resetData.token && resetData.email &&passwd){
        console.log(resetData);
        console.log('resetDAta is present');
        next(); 
    }else{
        res.send({status:400,msg:'Session expired please send a new request for forgot password'})
    }
}

module.exports={createAuth,loginAuth,forgotAuth,adminAuth};