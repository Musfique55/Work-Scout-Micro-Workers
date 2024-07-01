import useUserInfo from "../Hooks/useUserInfo";
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { BiCoinStack, BiMoneyWithdraw } from "react-icons/bi";
import { VscTasklist } from "react-icons/vsc";

const WorkerDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const userInfo = useUserInfo();
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
                    <div className="flex items-center border-2 flex-1 gap-5 bg-[#f6faff] text-[#295dfa] p-8 rounded-2xl">
                        <div>
                           <h5 className="text-2xl font-medium text-black">Available Coins</h5>         
                           <p className="text-4xl mt-2 font-medium">{userInfo[0]?.coins}</p>     
                        </div>
                        <BiCoinStack className="text-4xl"></BiCoinStack>
                    </div>
                    <div className="flex items-center border-2 gap-5 bg-[#f6faff] text-[#295dfa] p-8 rounded-2xl">
                        <div>
                           <h5 className="text-2xl font-medium text-black">Total Submissions</h5>         
                           <p className="text-4xl mt-2 font-medium">{count.length}</p>     
                        </div>
                        <VscTasklist className="text-5xl" />
                    </div>
                    <div className="flex items-center gap-5 border-2 bg-[#f6faff] text-[#295dfa] p-8 rounded-2xl">
                        <div>
                           <h5 className="text-2xl font-medium text-black">Total Earnings</h5>         
                           <p className="text-4xl mt-2 font-medium">{totalIncome}</p>     
                        </div>
                        <BiMoneyWithdraw  className="text-5xl"/>
                    </div>
               </div>
            </div>

            <div className="overflow-x-auto mt-10">

                <h3 className="text-3xl font-semibold mb-10">
                    Approved Tasks
                </h3>
                <table className="table">
                    {/* head */}
                    <thead className="text-base text-[#295dfa]">
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
                            return (<tr key={submission._id} className="text-black">
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