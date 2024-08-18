import { useContext, useState } from "react";
import signin from '../assets/signin.svg'
import '../assets/css/App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import fetchApi from "../utils/fetchApi";
import { ProtectedContext } from "../App";
import Navbar from "../components/Navbar";
axios.defaults.withCredentials=true;
function AdminLogin(){
    const {login}=useContext(ProtectedContext)
    const [admin,setAdmin]=useState({ email:'', password:'' });
    const navigate=useNavigate();
    function handleChange(event){
        console.log(event.target);
        const {name,value}=event.target;
        setAdmin(prev=> ({ ...prev,[name]:value }) )
        console.log(admin);
    }
    function handleAdminSubmit(){
        event.preventDefault();
        console.log(admin);
        fetchApi('/admin-login',admin,()=>{
            console.log('admin login succes');
            login('admin')
            navigate('/admin-home',{replace:true})    
        },(msg)=>{
            alert(msg);
        })
        // userType ->admin
        // isLoggedIn ->true
    }
    return(
        <div style={{minHeight:'100vh'}}>
            <Navbar/>
            <div className="AdminPage border p-3 d-flex flex-column align-items-center justify-content-center" style={{minHeight:'80vh'}}>
                <h2>Login Admin </h2>
                <form className=" row m-0 p-3  border d-flex flex-column gap-3 w-100" style={{
                        maxWidth:'450px',borderRadius:'13px' }} onSubmit={handleAdminSubmit}> 
                    <label className="label-bold" htmlFor="email">Admin Email</label>
                    <input type="email" className="form-control mb-1" name="email" id="email" value={admin.email}  onChange={handleChange} />
                    <label className="label-bold" htmlFor="password">Admin Password</label>
                    <input type="password" className="form-control mb-1" name="password" id="password" value={admin.password} onChange={handleChange}  />
                    <button type="submit" className="sbtn btn btn-success m-0 my-2 d-flex flex-row gap-3 align-items-center justify-content-center">Login
                        <img src={signin} height='20px' width='20px' alt="" />
                    </button>
                </form>
            </div>
        </div>
    )
}
export default AdminLogin;
