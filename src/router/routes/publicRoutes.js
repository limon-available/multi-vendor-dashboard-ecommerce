import { lazy } from "react";    
import { Navigate } from "react-router-dom";
import getLoginPath from "../../utils/getLoginPath";
const Login = lazy(()=> import('../../views/auth/Login'))   
const Register = lazy(()=> import('../../views/auth/Register')) 
const AdminLogin = lazy(()=> import('../../views/auth/AdminLogin')) 
const Home = lazy(()=> import('../../views/Home'))   
const UnAuthorized = lazy(()=> import('../../views/UnAuthorized'))   
const Success = lazy(()=> import('../../views/Success'))   

const publicRoutes = [
    {
        path: '/',
        element : getLoginPath() === "/admin/login"
            ? <Navigate to="/admin/login" replace />
            : <Home/>, 
    },
    {
        path : '/login',
        element : <Login/>
    },
    {
        path : '/register',
        element : <Register/>
    },
    {
        path : '/admin/login',
        element : <AdminLogin/>
    },
    {
        path : '/unauthorized',
        element : <UnAuthorized/>
    },
    {
        path : '/success?',
        element : <Success/>
    }
]

export default publicRoutes