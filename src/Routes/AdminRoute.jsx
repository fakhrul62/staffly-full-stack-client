import Lottie from "lottie-react";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import loadingAnimation from "../assets/loading.json";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({children}) => {
    const {user, loading}= useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    if(loading || isAdminLoading){
        return <div className="py-32 relative flex justify-center items-center"><span className='w-96 absolute '><Lottie animationData={loadingAnimation} loop={true} /></span></div>
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to="/login" state={{from : location}} replace></Navigate>
};

export default AdminRoute;