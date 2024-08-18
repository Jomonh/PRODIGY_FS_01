import './assets/css/App.css'
import './assets/css/bootstrap.min.css'
import {BrowserRouter,Routes,Route, Link, Navigate} from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import UserHome from './pages/UserHome';
import PasswordReset from './pages/PasswordReset';
import About from './pages/About';
import UserProfile from './pages/UserProfile';
import AdminHome from './pages/AdminHome';
import AdminProfile from './pages/AdminProfile';
import ProtectedRoutes from './utils/ProtectedRoutes';
import { createContext, useEffect, useState } from 'react';
export  const ProtectedContext=createContext()
function App() {
  //localStorage.removeItem('resetPass')
  const [isLoggedIn,setIsLoggedIn]=useState(()=>{ //null ,true
    return localStorage.getItem('isLogged')==='true'
  });
  const [userType,setUserType]=useState(()=>{ // null,user,admin
    return localStorage.getItem('userType')
  });
  const [resetPass,setResetPass]=useState(()=>{ //true,null
    return localStorage.getItem('resetPass')==='true'
  });
  
  console.log('state variables');
  console.log(isLoggedIn);
  console.log(userType);
  console.log('resetPass from app'+resetPass);

  useEffect(()=>{
    console.log('from useEffect 11',isLoggedIn);
    if(isLoggedIn!==true || (userType!=='user' && userType!=='admin') ) {
      localStorage.removeItem('userType');
      localStorage.removeItem('isLogged')
    }else{
      localStorage.setItem('isLogged',isLoggedIn);
      localStorage.setItem('userType',userType)  
    }

  },[isLoggedIn,userType])

  useEffect(()=>{
    console.log('from useEffect 33'+resetPass);
    if(resetPass!==true) return localStorage.removeItem('resetPass');
    localStorage.setItem('resetPass',resetPass)
  },[resetPass])

  function login(type){
    setIsLoggedIn(true);
    setUserType(type)
  }
  function logout(){
    setIsLoggedIn(false)
    setUserType('')
  }
  return (
    <div className='App p-0 m-0'>
      <ProtectedContext.Provider value={{
        isLoggedIn,userType,resetPass,
        setIsLoggedIn,setUserType,setResetPass,
        login,logout
      }}>
        <BrowserRouter>
            <Routes>
              {(isLoggedIn===null||isLoggedIn===false) && 
                <>
                  <Route path='/admin-login' element={<AdminLogin/>} />
                  <Route path='/user-login' element={<UserLogin/>} />      
                  <Route path='/'  element={
                    <div className='d-flex flex-column align-items-center justify-content-center gap-3' style={{minHeight:'100vh'}}>
                      <h1 className='text-danger'>No such url exist</h1>
                      <Link to='/admin-login' className='btn btn-outline-dark'>Admin Login page</Link>
                      <Link to='/user-login' className='btn btn-outline-dark'>User Login page8</Link>
                    </div>                     
                  } />        
                  <Route path='/login'  element={<UserLogin/>} />   
                  {resetPass && <Route path='/reset-pass/:token' element={<PasswordReset/>} />}

                  <Route path='*' element={<Navigate to='/' />} />     
                </>
              }

                <Route element={<ProtectedRoutes/>}>
                  { userType==='user'?
                    <>
                      <Route path='/home' element={<UserHome/>} />
                      <Route path='/profile' element={<UserProfile/>} />
                      {/* it needs extra protection */}
                      <Route path='*' element={<Navigate to={'/home'} />} />
                    </>:(userType==='admin')&&<>
                      <Route path='/admin-profile' element={<AdminProfile/>} />
                      <Route path='/admin-home' element={<AdminHome/>} />     
                      <Route path='*' element={<Navigate to='/admin-home' />} />       
                    </>
                  }
                </Route>

                <Route path='/about' element={<About/>} />

            </Routes>
        </BrowserRouter>        
      </ProtectedContext.Provider>
    </div>
  )
}

export default App
/*
!isLoggedIn?
:(userType==='user'? <UserHome/> : <AdminHome/>)
*//*
  useEffect(()=>{
    console.log('from useEffect 22',userType);
    if(userType!=='user' && userType!=='admin') return localStorage.removeItem('userType')
    localStorage.setItem('userType',userType)
  },[userType])
  */