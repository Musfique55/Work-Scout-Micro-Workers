import { FaCoins } from "react-icons/fa";
import useUserInfo from "../Hooks/useUserInfo";
import { AiOutlineFileDone } from "react-icons/ai";
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { HiCurrencyDollar } from "react-icons/hi";
import useAuth from "../Hooks/useAuth";

const WorkerDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const [userInfo] = useUserInfo();
    const {user} = useAuth();
    const [count,setCount] = useState([]);
    const [income,setIncome] = useState([]);
    useEffect(() => {
        axiosSecure.get(`/submissions/${user?.email}`)
        .then(res => {
            setCount(res.data);
        })
        axiosSecure.get(`/approved?email=${user?.email}`)
        .then(res => {
            setIncome(res.data);
        })
    },[axiosSecure,user]);
   
    const totalIncome = income.reduce((acc,curr) => acc + curr.payable_amount,0);
    return (
        <div className="mx-5 my-7">
            <h3 className="text-5xl font-medium mb-8">Welcome Back</h3>
            <div className="flex gap-6 items-center">
               <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="flex items-center gap-5 bg-[#9169c5b0] text-white p-8 rounded-2xl">
                        <FaCoins className="text-3xl"></FaCoins>
                        <div>
                           <p className="text-4xl font-medium">{userInfo?.coins}</p>     
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
                           <p className="text-4xl font-medium">{totalIncome}</p>     
                           <h5 className="text-2xl font-medium">Total Earnings</h5>         
                        </div>
                    </div>
               </div>
            </div>

            <div className="overflow-x-auto mt-10">

                <h3 className="text-3xl font-semibold mb-10">
                    Approved Tasks
                </h3>
                <table className="table">
                    {/* head */}
                    <thead className="text-base">
                    <tr>
                        <th>
                        
                        </th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Creator Name</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {
                        income.map((submission,idx) => {
                            return (<tr key={submission._id}>
                            <th>
                                {idx+1}
                            </th>
                            <td>
                                {submission.task_title}
                            </td>
                            
                            <td className="font-semibold flex" >
                               <p>{submission.payable_amount}</p> 
                            </td>
                            <td>
                                {submission.creator_name}
                            </td>
                            <td >
                                <p className="px-3 py-1 rounded-full  w-fit bg-[rgba(65,221,65,0.438)] text-green-600 ">
                                {submission.status}
                                </p>
                                
                            </td>
                            
                           
                        </tr>)
                        })
                    }
                    
                    </tbody>
                  
                </table>
            </div>
        </div>
    );
};

export default WorkerDashboard;