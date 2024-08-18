import { useEffect, useState, useContext } from 'react';
import userFetch from '../utils/userFetch';
import Navbar from '../components/Navbar';
import { ProtectedContext } from '../App';
import fetchApi from '../utils/fetchApi';

export default function AdminHome() {
  // eslint-disable-next-line no-unused-vars
  const {user,setUser,navigate,axios}=userFetch('http://localhost:3000/get-admindata','admin');
  const [userList,setUserList]=useState([])
  const {logout}=useContext(ProtectedContext)

  useEffect(()=>{
    getUserdata();
  },[user])

  function adminLogout(){
    console.log('in admin logout');
    fetchApi('/admin-logout','',()=>{
      console.log('admin logged out success');
      alert('logout success')
      logout()
      navigate('/')
    },(msg)=>{
      console.log('some problem in logging out user');
      console.log(msg);
      navigate('/')
    })
    
  }
  function getUserdata(){
    axios.get('http://localhost:3000/get-usersdata')
    .then(res=>res.data)
    .then(data=>{
      if(data.status===200){
        console.log(data.users);
        setUserList(data.users)
      }else{
        console.log(data.status,data.msg);
        console.log('some issue in getting user data');
      }
    }).catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div className='bg-light' style={{minHeight:'100vh'}}>
      <Navbar/>
      <div className="main d-flex flex-column align-items-center py-3 mt-5">
        <h2>Hello, Admin  {user.fname}</h2>
        <br />
        <button className="btn btn-outline-danger p-2" onClick={adminLogout}>Logout</button>

        { userList.length>0? 
            (<div className='mt-5 p-2' style={{maxWidth:'100vw',overflowX:'scroll'}}>
              <h3>users list</h3>
              <table className="table table-responsive table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First_Name</th>
                    <th scope="col">Last_Name</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                { userList.map((users,index)=>{
                  return (<tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{users.fname}</td>
                    <td>{users.lname}</td>
                    <td>{users.email}</td>
                  </tr>)
                })} 
                </tbody>
              </table>
            </div>):(<h1>NO users</h1>)
        
      
        }
            
      </div>
    </div>
  )
}
