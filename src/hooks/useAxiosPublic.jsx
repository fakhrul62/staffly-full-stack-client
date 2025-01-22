import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://employee-management-server-rho.vercel.app/",
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;