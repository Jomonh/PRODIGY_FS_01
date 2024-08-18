import React from 'react'
import userIcon2 from '../assets/user.svg';

// eslint-disable-next-line react/prop-types
export default function ProfileComponent({user,setShowDelete,usertype}) {
  return (
    <div className="userContain  p-3  my-1 d-flex flex-column align-items-center " 
    style={{
        borderRadius:'13px', boxSizing:'border-box',
        backgroundColor:'aliceblue',maxWidth:'400px'
    }}>
        <h3>{usertype==='user'? 'User':'Admin'} Profile</h3>
        <div className="userInfo d-flex flex-column gap-5 justify-content-center align-items-center mt-4 py-3 " style={{width:'100%'}}>
            <div className="pimgDiv d-flex justify-content-center flex-column align-items-center">
                <img src={userIcon2} alt="userImg" width='80px' height='80px' style={{
                    borderRadius:'50%', border:'0', backgroundColor:'white' }} />
            </div>
            <div className="userDetails row" style={{padding: '3%',fontSize: '18px'}}>
                <div className="col-4 pe-0 ps-0 ps-md-2" >
                    <p className='userfield'>Firstname: </p>
                    <p className='userfield'>Lastname: </p>
                    <p className='userfield' >Email:</p>
                </div>        
                <div className="col-8 ps-1 pe-0 pe-md-2">
                    <p> <b> {user.fname} </b> </p>
                    <p> <b> {user.lname} </b> </p>
                    <p> <b style={{overflowWrap:'anywhere'}}> {user.email} </b> </p>
                </div>
                <div className="btndiv w-100  d-flex flex-row gap-3 mt-2 align-items-center ">
                    <button className="btn-primary btn">Edit profile</button>
                    {
                        usertype==='user'?
                        <button className=" btn btn-outline-danger" onClick={()=>setShowDelete(true)} >Delete Account</button>
                        :''
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
