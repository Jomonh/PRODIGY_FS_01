import Navbar from '../components/Navbar';
import userFetch from '../utils/userFetch';
import fetchApi from '../utils/fetchApi';
import { useContext } from 'react';
import { ProtectedContext } from '../App';

export default function UserHome() {
  // eslint-disable-next-line no-unused-vars
  const {user,setUser,navigate,axios}=userFetch('http://localhost:3000/get-userdata','user');
  const {logout}=useContext(ProtectedContext)
 
  function signout(){// isLoggedIn -> false
    fetchApi('/logout-user','',()=>{
      console.log('logout success');
      alert('logout success')
      logout()
      console.log('from userHome');
      navigate('/')
    },(msg)=>{
      alert(msg)
    });
  }
  return (<>
    <Navbar/>
    <div className='d-flex flex-column align-items-center justify-content-center gap-2 bg-success' style={{minHeight:'88vh'}}>    
      <h3 className="text-center">Home Page</h3>
      <h5>hello, {user?.fname}</h5>
      <button className="btn btn-outline-danger" onClick={signout}>SignOut</button>
    </div>
  </>

  )
}
