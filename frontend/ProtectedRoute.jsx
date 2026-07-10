import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import Loader from './src/Components/Loader';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { showErr } from './src/utils/toast';

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const {user,loading} = useContext(AuthContext);
    if (loading)
        return <Loader/>
    if(!user)
    {
        showErr("You need to login to access this feature")
        return <Navigate to={"/login"}/>
    }
    
    return <Outlet/>
}


export default ProtectedRoute