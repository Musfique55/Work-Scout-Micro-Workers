import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {data : isAdmin,isPending} = useQuery({
        queryKey : ['admin',user?.email],
        queryFn : async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            return res.data.admin;
        }
    })
    return [isAdmin,isPending]
};

export default useAdmin;