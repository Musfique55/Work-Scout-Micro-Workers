import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useUserInfo = () => {
    const {user,loading} = useAuth();
    const axiosPublic = useAxiosPublic();
    const {data : userInfo = {},refetch} = useQuery({
        queryKey : ['users',user?.email],
        enabled : !loading,
        queryFn : async() => {
            const res = await axiosPublic.get(`/users/${user.email}`);
            return res.data;
        }
    })
    return {userInfo,refetch}
};

export default useUserInfo;