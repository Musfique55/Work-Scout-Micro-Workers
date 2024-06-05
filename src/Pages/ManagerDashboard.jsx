import useAxiosSecure from "../Hooks/useAxiosSecure";
import useUserInfo from "../Hooks/useUserInfo";
import { MdBlock, MdOutlineDone, MdOutlinePayment, MdOutlinePendingActions } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { FaCoins } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";

const ManagerDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const [myTask,setMyTasks] = useState([]);
    const {userInfo} = useUserInfo();
    const {data : requests = [],refetch} = useQuery({
        queryKey : ['requests',userInfo.email],
        queryFn : async () => {
            const res = await axiosSecure.get(`/submission/${userInfo.email}`);
            return res.data;
        }
    })

    useEffect(() => {
        axiosSecure(`/alltasks?email=${user?.email}`)
        .then(res => {
            setMyTasks(res.data);
        })
    },[user,axiosSecure])

    const handleApprove = (task) => {
        const action = {
            approve : 'approved',
            worker_email :task?.worker_email,
            payable_amount : task?.payable_amount,
            task_title : task?.task_title,
            creator_name : task?.creator_name,
            status : task?.status
        }
        const approvedTask = {
            worker_email :task?.worker_email,
            payable_amount : task?.payable_amount,
            task_title : task?.task_title,
            creator_name : task?.creator_name,
            status : 'approved'
        }
        
        axiosSecure.patch(`/submissions/${task._id}`,action)
        .then(res => {
            if(res.data.modifiedCount > 0){
                refetch();
            }
        })

        axiosSecure.post('/approved',approvedTask)
        .then(res => {
            if(res.data.insertedId){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Task has been approved",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
    const handleReject = (id) => {
        const action = {
            approve : 'rejected'
        }
        axiosSecure.patch(`/submissions/${id}`,action)
        .then(res => {
            if(res.data.modifiedCount > 0){
                refetch();
            }
        })
    }

    const remainingTasks = myTask.reduce((acc,curr) => acc + curr.task_quantity,0);
    return (
        <div className="mt-12 mx-5">

            <h3 className="text-5xl font-medium mb-8">Welcome Back</h3>
            <div className="flex gap-6 items-center">
               <div className="grid grid-cols-3 gap-14">
                    <div className="flex items-center gap-5 bg-[#9169c5b0] text-white p-8 rounded-2xl">
                        <FaCoins className="text-3xl"></FaCoins>
                        <div>
                           <p className="text-4xl font-medium">{userInfo.coins}</p>     
                           <h5 className="text-2xl font-medium">Available Coins</h5>         
                        </div>
                    </div>
                    <div className="flex items-center gap-5 bg-[#9169c5b0] text-white p-8 rounded-2xl">
                        <MdOutlinePendingActions className="text-4xl"/>
                        <div>
                           <p className="text-4xl font-medium">{remainingTasks}</p>     
                           <h5 className="text-2xl font-medium">Pending Tasks</h5>         
                        </div>
                    </div>
                    <div className="flex items-center gap-5 bg-[#9169c5b0] text-white p-8 rounded-2xl">
                        <MdOutlinePayment className="text-4xl"/>
                        <div>
                           <p className="text-4xl font-medium">0</p>     
                           <h5 className="text-2xl font-medium">Total Payment</h5>         
                        </div>
                    </div>
               </div>
            </div>
            <h3 className="text-3xl font-semibold my-8">Submission Requests</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="text-base">
                    <tr>
                        <th>
                        
                        </th>
                        <th>Worker Info</th>
                        <th>Title</th>
                        <th>Payable Amount</th>
                        <th>Status</th>
                        <th>Submiited</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {
                        requests.map((submission,idx) => {
                            return (<tr key={submission._id} className={`${submission.status === 'approved' ? 'hidden' : submission.status === 'rejected' ? 'hidden' : ''}`}>
                            <th>
                                {idx+1}
                            </th>
                            <td>
                            <div className="flex flex-col justify-center font-medium gap-3">
                                <p>{submission.worker_email}</p>
                                <p>{submission.worker_name}</p>
                            </div>
                            </td>
                            <td>
                                {submission.task_title}
                            </td>
                            
                            <td className="font-semibold flex justify-center" >
                                {submission.payable_amount}
                            </td>
                            <td >
                                <p className={`px-3 py-1 rounded-full  w-fit ${submission.status === 'approved'? 'bg-[rgba(65,221,65,0.438)] text-green-600 ' : submission.status === 'rejected' ? 'text-red-600 bg-[rgba(223,48,48,0.39)]' : 'bg-[rgba(255,255,0,0.29)] text-yellow-600'}`}>
                                {submission.status}
                                </p>
                                
                            </td>
                            <th>
                                {submission.current_date}
                            </th>
                            <td className="flex gap-4">
                                <MdOutlineDone onClick={() => handleApprove(submission)} className="text-4xl p-2 rounded-full text-green-600 bg-[rgba(65,221,65,0.438)] cursor-pointer"/>
                                <MdBlock onClick={() => handleReject(submission._id)} className="text-4xl p-2 rounded-full text-red-600 bg-[rgba(223,48,48,0.39)] cursor-pointer"/>
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

export default ManagerDashboard;