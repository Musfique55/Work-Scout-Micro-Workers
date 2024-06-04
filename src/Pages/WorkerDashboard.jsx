import { FaCoins } from "react-icons/fa";
import useUserInfo from "../Hooks/useUserInfo";
import { AiOutlineFileDone } from "react-icons/ai";
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { HiCurrencyDollar } from "react-icons/hi";

const WorkerDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const {userInfo} = useUserInfo();
    const [count,setCount] = useState([]);
    useEffect(() => {
        axiosSecure.get(`/submissions/${userInfo?.email}`)
        .then(res => {
            setCount(res.data);
        })
    },[axiosSecure,userInfo])
    return (
        <div className="mx-5 my-12">
            <h3 className="text-5xl font-medium mb-8">Welcome Back</h3>
            <div className="flex gap-6 items-center">
               <div className="grid grid-cols-3 gap-6">
                    <div className="flex items-center gap-5 bg-[#9169c5b0] text-white p-8 rounded-2xl">
                        <FaCoins className="text-3xl"></FaCoins>
                        <div>
                           <p className="text-4xl font-medium">{userInfo.coins}</p>     
                           <h5 className="text-2xl font-medium">Available Coins</h5>         
                        </div>
                    </div>
                    <div className="flex items-center gap-5 bg-[#9169c5b0] text-white p-8 rounded-2xl">
                        <AiOutlineFileDone className="text-4xl"/>
                        <div>
                           <p className="text-4xl font-medium">{count.length}</p>     
                           <h5 className="text-2xl font-medium">Total Submissions</h5>         
                        </div>
                    </div>
                    <div className="flex items-center gap-5 bg-[#9169c5b0] text-white p-8 rounded-2xl">
                        <HiCurrencyDollar className="text-4xl"/>
                        <div>
                           <p className="text-4xl font-medium">{count.length}</p>     
                           <h5 className="text-2xl font-medium">Total Earnings</h5>         
                        </div>
                    </div>
               </div>
            </div>
        </div>
    );
};

export default WorkerDashboard;