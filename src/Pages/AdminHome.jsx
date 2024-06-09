import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { FaCoins, FaUsers } from "react-icons/fa";
import { MdPayments } from "react-icons/md";

const AdminHome = () => {
    const [users,setUsers] = useState([]);
    const [coins,setCoins] = useState([]);
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure.get('/users')
        .then(res => {
            setUsers(res.data);
        })

        axiosSecure.get('/total-coins')
        .then(res => {
            setCoins(res.data);
        })
    },[axiosSecure])

    return (
        <div className="mx-5 mt-12">
            <div className="grid-cols-1 grid gap-10 lg:grid-cols-3">
                    <div className="flex items-center gap-5 bg-[#9169c5b0] text-white p-8 rounded-2xl">
                        <FaUsers className="text-3xl"></FaUsers>
                        <div>
                           <p className="text-4xl font-medium">{users.length}</p>     
                           <h5 className="text-2xl font-medium">Total Users</h5>         
                        </div>
                    </div>
                    <div className="flex items-center gap-5 bg-[#9169c5b0] text-white p-8 rounded-2xl">
                        <FaCoins className="text-4xl"/>
                        <div>
                           <p className="text-4xl font-medium">{coins[0]?.total_coins}</p>     
                           <h5 className="text-2xl font-medium">Total Coins</h5>         
                        </div>
                    </div>
                    <div className="flex items-center gap-5 bg-[#9169c5b0] text-white p-8 rounded-2xl">
                        <MdPayments  className="text-4xl"/>
                        <div>
                           <p className="text-4xl font-medium">0</p>     
                           <h5 className="text-2xl font-medium">Total Payments</h5>         
                        </div>
                    </div>
            </div>
            <h3 className="text-3xl font-medium mt-8">Withdraw Requests</h3>
        </div>
    );
};

export default AdminHome;