import axios from "axios";

const axiosPublic =  axios.create({
    baseURL : 'https://workscount-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;