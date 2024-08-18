const express =require('express');
const expressSession = require('express-session');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const cors=require('cors');
const {userModel}=require('./models/userModels');
const mongoose=require('mongoose');
const MongoStore = require('connect-mongo');
const app=express();

mongoose.connect('mongodb://127.0.0.1:27017/project1')

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
    methods:['GET','POST'],        
}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(expressSession({
    secret:'this_is_my_secret',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:5*60*1000,
        httpOnly:true,
        //secure:true
    },
    store:MongoStore.create({
        client:mongoose.connection.getClient(),
    })
}));
app.use(express.json())

app.use('/',require('./routes/loginRoutes'))
app.use('/',require('./routes/userRoutes'))
app.use('/',require('./routes/forgotRoutes'))
app.use('/',require('./routes/adminRoutes'))
async function demo(){
    let a = await userModel.countDocuments()
    console.log(a);
}
demo()

app.listen(3000,()=>{
    console.log('the server is running on port 3000');
})