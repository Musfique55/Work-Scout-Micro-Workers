import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useWorker = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data : isWorker,isFetching} = useQuery({
        queryKey : ["worker",user?.email],
        queryFn : async () => {
            const res  = await axiosSecure.get(`/users/worker/${user.email}`);
            return res.data.worker;
        }
    })
    return [isWorker,isFetching];
};

export default useWorker;