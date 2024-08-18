import {useContext} from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ProtectedContext } from "../App";

function ProtectedRoutes(){
    const {isLoggedIn,userType}=useContext(ProtectedContext);
    console.log('from protectd routes');
    console.log(isLoggedIn);
    console.log(userType);
    return isLoggedIn===true? <Outlet/> : <Navigate to='login' />
}
export default ProtectedRoutes;