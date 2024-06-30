import useAxiosSecure from "../Hooks/useAxiosSecure";
import useUserInfo from "../Hooks/useUserInfo";
import { MdBlock, MdOutlineDone, MdOutlinePayment, MdOutlinePendingActions } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { FaCoins } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import useNotifications from "../Hooks/useNotifications";

const ManagerDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const [myTask,setMyTasks] = useState([]);
    const [payments,setPayments] = useState([]);
    const [userInfo] = useUserInfo();
    const [,refetch] = useNotifications();
    const {data : requests = [],refetch : reload} = useQuery({
        queryKey : ['requests',userInfo?.email],
        queryFn : async () => {
            const res = await axiosSecure.get(`/submission/${userInfo?.email}`);
            return res.data;
        }
    })

    useEffect(() => {
        axiosSecure(`/alltasks?email=${user?.email}`)
        .then(res => {
            setMyTasks(res.data);
        })
        axiosSecure.get(`/payments/${user?.email}`)
        .then(res => {
            setPayments(res.data);
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
                reload();
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
    const handleReject = (task) => {
        const action = {
            worker_email :task?.worker_email,
            payable_amount : task?.payable_amount,
            task_title : task?.task_title,
            creator_name : task?.creator_name,
            approve : 'rejected'
        }
        axiosSecure.patch(`/submissions/${task._id}`,action)
        .then(res => {
            if(res.data.modifiedCount > 0){
                reload();
                refetch();
            }
        })
    }

    const totalPayment = payments.reduce((acc,curr) => acc + curr.amount,0)

    const remainingTasks = myTask.reduce((acc,curr) => acc + curr.availability,0);
    return (
        <div className="mt-12 mx-5">

            <h3 className="text-5xl font-medium mb-8">Welcome Back</h3>
            <div className="flex gap-6 items-center">
               <div className="grid grid-cols-1 gap-14 lg:grid-cols-3">
                    <div className="flex items-center gap-5 bg-[#9169c5b0] text-white p-8 rounded-2xl">
                        <FaCoins className="text-3xl"></FaCoins>
                        <div>
                           <p className="text-4xl font-medium">{userInfo?.coins}</p>     
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
                           <p className="text-4xl font-medium">{totalPayment}</p>     
                           <h5 className="text-2xl font-medium">Total Payment</h5>         
                        </div>
                    </div>
               </div>
            </div>
            {
                requests.length > 0 ? <div>
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
                            return (<tr key={submission._id}>
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
                            {
                                submission.status === 'pending' &&
                                <td className="flex gap-4">
                                <MdOutlineDone onClick={() => handleApprove(submission)} className="text-4xl p-2 rounded-full text-green-600 bg-[rgba(65,221,65,0.438)] cursor-pointer"/>
                                <MdBlock onClick={() => handleReject(submission)} className="text-4xl p-2 rounded-full text-red-600 bg-[rgba(223,48,48,0.39)] cursor-pointer"/>
                            </td>
                            }
                        </tr>)
                        })
                    }
                    
                    </tbody>
                  
                </table>
            </div>
                </div> :
                <h3 className="text-3xl font-semibold text-center ">No Requests Found</h3>
            }
        </div>
    );
};

export default ManagerDashboard;