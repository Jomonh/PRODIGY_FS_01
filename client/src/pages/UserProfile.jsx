import Navbar from '../components/Navbar'
import userFetch from '../utils/userFetch';
import { useState,useContext } from 'react';
import fetchApi from '../utils/fetchApi';
import ProfileComponent from '../components/ProfileComponent';
import { ProtectedContext } from '../App';

export default function UserProfile() {
    const [showDelete,setShowDelete]=useState(false)
    const {logout}=useContext(ProtectedContext)
    // eslint-disable-next-line no-unused-vars
    const {user,setUser,navigate,axos}=userFetch('http://localhost:3000/get-userdata','user');
    
    function deleteAccount(){
        console.log('deleteAccount fn');
        fetchApi('/delete-user',{email:user.email},()=>{
            console.log('account deleted successfully');
            alert('account deleted successfully');
            navigate('/')
            logout();    
        },(msg)=>{
            alert(msg)
        })
    }
    return (
    <div className='bg-primary' style={{minHeight:'100vh'}}>
        <Navbar/>
        <div className="userAccount  p-3 px-1 d-flex flex-column align-items-center justify-content-center gap-4 bg-primary " 
        style={{
            minWidth:'280px', boxSizing:'border-box',
            position:'relative',minHeight:'420px'
        }}>
            <ProfileComponent user={user} usertype={'user'} setShowDelete={setShowDelete} />
            {
            showDelete ? 
            <div className='SignoutDiv d-flex flex-column justify-content-between p-4  gap-2 showmsg' >
                <h3 className="text-center m-0 mt-1  mb-3 text-danger"><b> Delete Account</b></h3>
                <p className="text-center m-0  mb-4" style={{fontWeight:'bold'}}>Are you sure want to <b className='text-danger' style={{fontSize:'18px'}}>Delete your account</b>   </p>
                <div className="d-flex flex-row w-100 sbtndiv   gap-2">
                    <button className="accBtn btn btn-outline-dark " onClick={()=>setShowDelete(false)} >Cancel </button>
                    <button className="accBtn btn " style={{color:'white',backgroundColor:'#e82626'}}  onClick={deleteAccount}> Delete Account </button>
                </div>
                </div>
            :''
            }

        </div>
    </div>
  )
}
