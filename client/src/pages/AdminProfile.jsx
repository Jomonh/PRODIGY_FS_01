//import React from 'react'
import Navbar from '../components/Navbar'
import userFetch from '../utils/userFetch';
import ProfileComponent from '../components/ProfileComponent';

export default function AdminProfile() {
  const {user}=userFetch('http://localhost:3000/get-admindata','admin');

  return (
    <div className='bg-primary' style={{minHeight:'100vh'}}>
    <Navbar/>
    <div className="userAccount  p-3 px-1 d-flex flex-column align-items-center justify-content-center gap-4 bg-primary " 
    style={{
        minWidth:'280px', boxSizing:'border-box',
        position:'relative',minHeight:'420px'
    }}>
        <ProfileComponent user={user} usertype={'admin'} setShowDelete={'setShowDelete'} />
    </div>
    </div>
  )
}
