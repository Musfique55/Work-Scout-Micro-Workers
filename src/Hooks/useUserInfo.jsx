import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserInfo = () => {
    const {user,loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data : userInfo = {},refetch} = useQuery({
        queryKey : ['users',user?.email],
        enabled : !loading,
        queryFn : async() => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    })
    return {userInfo,refetch}
};

export default useUserInfo;