import { Navigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    if(loading){
        return <div className="py-32 relative flex justify-center items-center"><span className='w-96 absolute '><Lottie animationData={loadingAnimation} loop={true} /></span></div>
    }
    if(user){
        return children;
    }
    return <Navigate to="/login" state={{from : location}} replace></Navigate>
};

export default PrivateRoute;