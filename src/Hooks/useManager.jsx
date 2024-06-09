import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useManager = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data : isTaskCreator,isLoading} = useQuery({
        queryKey : ['taskCreator',user?.email],
        queryFn : async () => {
            const res = await axiosSecure.get(`/users/task-creator/${user.email}`);
            return res.data.manager;
        }
    })
    return [isTaskCreator,isLoading];
};

export default useManager;