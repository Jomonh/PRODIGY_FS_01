import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form'
import signin from '../assets/signin.svg';
//import axios from 'axios';
import OtpDiv from '../components/Otp';
import ForgotPassword from '../components/ForgotPassword';
//axios.defaults.withCredentials=true;
import fetchApi from '../utils/fetchApi';
import { ProtectedContext } from '../App';
import Navbar from '../components/Navbar';
function UserLogin(){
    const initailVal={
        fname:'',
        lname:'',
        email:'',
        passwd:'',
        confirmpasswd:''
    };
    const [isNewUser,setIsNewUser]=useState(false);
    const [showOtp,setShowOtp]=useState(false)
    const [forgotPass,setForgotPass]=useState(false);
    const {login}=useContext(ProtectedContext)
    
    //const [user,setUser]=useState(initailVal);
    const navigate=useNavigate();
    
    function handleRegister(data){
        let userData=data
        reset(initailVal)
        event.preventDefault();
        console.log(data);
        console.log('entered handle register');
        // isLoggedIn => true, userType => user
        if(isNewUser){
            fetchApi('/create-user',userData,()=>{ setShowOtp(true) },
                (msg)=>{ alert(msg) } 
            )
        }else{ //   isLoggedIn => true, userType => user
            let loginuser={email:userData.email,passwd:userData.passwd};      
            fetchApi('/login-user',loginuser,()=>{
                console.log('login success');
                login('user');
                console.log('from userLogin');
                navigate('/home',{replace:true});        
            },(msg)=>{
                alert(msg)
            })
        }
    }
    
    const loginSchema =yup.object().shape({
        email:yup.string().email('Invalid email').required('Email is required'),
        passwd:yup.string().required('Password is required').min(8,'password should be atleast 8 letters').max(24,'maximum characters of password is 24')
    })

    const createAccountSchema=yup.object().shape({
        fname:yup.string().required('First name is required').min(3,'Firstname should be atleast 8 letters').max(15,'Lastname should not exceed 15 letter'),
        lname:yup.string().required('Last name is required').max(15),
        email:yup.string().email('Invalid email').required('Email is required'),
        passwd:yup.string().required('Password is required').min(8,'password should be atleast 8 letters').max(24,'maximum characters of password is 24'),
        confirmpasswd:yup.string().oneOf([yup.ref('passwd')],'password doesnt match').required('Confirm password is required')
    })

    const {register,handleSubmit,reset,formState:{errors}}=useForm({
        resolver:yupResolver(isNewUser? createAccountSchema: loginSchema)
    })
  
    return(
        <div className=" border register col-10 col-sm-10 col-lg-5 col-md-8 w-100" style={{minHeight:'100vh'}}>
            <Navbar/>
            <main className='d-flex flex-column align-items-center justify-content-center p-3 ' style={{minHeight:'80vh'}} >
                <h2>User Login page</h2>
                <form className="row m-0 p-3 border d-flex flex-column gap-1 w-100" style={{
                    maxWidth:'450px',borderRadius:'13px' }} onSubmit={handleSubmit(handleRegister)}  >
                    <h3 className='my-3'>Create an Account</h3>
                    {isNewUser ? 
                        <>
                        <label htmlFor="#fname" className='label-bold'>First Name:</label>
                        <input className='form-control mb-1' type="text" id='fname' name='fname' {...register('fname')}   placeholder='eg. John '  />
                        <p className='errors'>{errors.fname?.message}</p>
                        <label htmlFor="#fname" className='label-bold'>Last Name:</label>
                        <input className='form-control mb-1' type="text" id='lname' name='lname' {...register('lname')}   placeholder='eg. Doe '  />
                        <p className='errors'>{errors.lname?.message}</p>
                        </> :''}
                    <label htmlFor="#email" className='label-bold'>Email:</label>
                    <input className='form-control mb-1' type="email" name="email" id="email" {...register('email')}   placeholder='eg. john454@gmail.com' />
                        <p className='errors'>{errors.email?.message}</p>
                    <label htmlFor="#passwd" className='label-bold'>Password:</label>
                    <input className='form-control mb-1' type="password" name="passwd" id="passwd" {...register('passwd')}   placeholder='eg. password123' />
                        <p className='errors'>{errors.passwd?.message}</p>
                    {isNewUser? <>
                        <label htmlFor="#confirmpasswd" className='label-bold'>Confirm Password</label>
                        <input className='form-control mb-1' type="password" name="confirmpasswd" id="confirmpasswd" {...register('confirmpasswd')}  placeholder='eg. password123' /> 
                        <p className='errors'>{errors.confirmpasswd?.message}</p>
                    </>:''}
                    <button className='sbtn btn btn-success m-0 my-2 ' type="submit" disabled={ forgotPass || showOtp } >
                        <p className='m-0 py-2 d-flex align-items-center justify-content-center gap-3'>{ isNewUser? 'Create Account' :'Login Account'}
                            <img src={signin} height='20px' width='20px' alt="" />
                        </p>
                    </button>
                    <div >
                        {isNewUser?
                            <p className='linktext' onClick={()=>setIsNewUser(!isNewUser)}> Already have a account</p>
                            :<p className='d-flex flex-row justify-content-between'>
                                <span className='linktext text-danger' onClick={()=>setForgotPass(true)}>Forgot password</span>
                                <span className='linktext' onClick={()=>setIsNewUser(!isNewUser)} >{"Don't have a account"}</span>
                            </p>
                        }
                    </div>     
                </form>

                { showOtp ? <OtpDiv setShowOtp={setShowOtp} />:'' }
                {forgotPass ? <ForgotPassword setForgotPass={setForgotPass} />  :''}
            </main>
        </div>
    )
}
export default UserLogin;
