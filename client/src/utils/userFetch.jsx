import {useState,useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { ProtectedContext } from '../App';
import axios from 'axios';
axios.defaults.withCredentials=true;
export default function userFetch(url,type) { 
    const navigate=useNavigate();
    const [user,setUser]=useState({})
    const {isLoggedIn,login,logout}=useContext(ProtectedContext)
    useEffect(()=>{
      console.log('useEffect executed');
      if(Object.keys(user).length ===0 && isLoggedIn ){
        axios.get(url)//http://localhost:3000/get-userdata
        .then((res)=>res.data)
        .then((data)=>{
          if(data.status===200){
            console.log(data.data);
            console.log('type from userFetch '+type);
            setUser({...data.data}) //isLoggedIn => true, userType?
            login(type)
          }else{
            console.log('some issue');
            console.log(data.msg, data.status);
            logout()
           // navigate('/login')
          }
        }).catch((err)=>{
          console.log('some error occured');
          console.log(err);
          logout()
          navigate('/demo')
        })
      }      
    },[user])
    return {user,setUser,navigate,axios}
}
