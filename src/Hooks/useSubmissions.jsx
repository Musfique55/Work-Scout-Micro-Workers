import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useSubmissions = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data : count ,refetch} = useQuery({
        queryKey : ['submissions',user?.email],
        queryFn : async () => {
            const res = await axiosSecure.get(`/total-submissions?email=${user.email}`);
            return res.data.count;
        }
    }) 
    return [count,refetch];
};

export default useSubmissions;