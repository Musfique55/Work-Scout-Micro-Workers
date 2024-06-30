import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useNotifications = () => {
    const {user,loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data : notifications =[],refetch} = useQuery({
        queryKey : ['notifications',user?.email],
        enabled : !loading,
        queryFn : async () => {
            const res = await axiosSecure(`/notifications?email=${user.email}`);
            return res.data;
        }
    })
    return [notifications,refetch]
};

export default useNotifications;