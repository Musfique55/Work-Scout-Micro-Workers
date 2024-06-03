import axios from "axios";

const axiosSecure = axios.create({
    baseURL : 'http://localhost:2000'
})
const useAxiosSecure = () => {
    return  axiosSecure;
};

export default useAxiosSecure;