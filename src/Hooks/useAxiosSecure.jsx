import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL : 'http://localhost:2000'
})
const useAxiosSecure = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();
    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config
    },(error) => {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use((response) => {
        return response;
    },async(error) => {
        const status = error.response.status;
       
        if(status === 400 || status === 401){
            await logout();
            navigate('/login');
        }
        return Promise.reject(error)
    })
    return axiosSecure;
};

export default useAxiosSecure;