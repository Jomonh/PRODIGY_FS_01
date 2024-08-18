import {useContext} from 'react'
import { Link } from 'react-router-dom'
import { ProtectedContext } from '../App'
export default function Navbar() {
  const {isLoggedIn,userType}=useContext(ProtectedContext)
  return (
    <nav >
      <div className="navDiv d-flex flex-row align-items-center gap-3 justify-content-around p-2 bg-light" style={{minHeight:'12vh'}}>
          <h3>Demo App</h3>
          <div className="navGrp d-flex flex-row align-items-center gap-3">
            {!isLoggedIn ?
              (<>
                <div className="navElem"><Link to="/user-login">User Login</Link> </div>
                <div className="navElem"><Link to="/admin-login">Admin Login</Link> </div>
              </>):(userType==='user'?
                  <>
                    <div className="navElem"><Link to="/home">Home</Link> </div>
                    <div className="navElem"><Link to="/profile">Profile</Link> </div>
                  </> :<>
                    <div className="navElem"><Link to="/admin-home">Admin DashBoard</Link> </div>
                    <div className="navElem"><Link to="/admin-profile">Profile</Link> </div>                  
                  </>
              )

            }
              <div className="navElem"><Link to="/about">About</Link> </div>
          </div>
      </div>
    </nav>
  )
}
