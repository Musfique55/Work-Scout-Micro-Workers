import useAxiosSecure from "../Hooks/useAxiosSecure";
import useUserInfo from "../Hooks/useUserInfo";
import { MdBlock, MdOutlineDone } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";

const ManagerDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const {userInfo} = useUserInfo();
    const {data : requests = [],refetch} = useQuery({
        queryKey : ['requests',userInfo.email],
        queryFn : async () => {
            const res = await axiosSecure.get(`/submission/${userInfo.email}`);
            return res.data;
        }
    })

    const handleApprove = (id,email,amount) => {
        const action = {
            approve : 'approved',
            worker_email : email,
            amount : parseInt(amount)
        }
        
        axiosSecure.patch(`/submissions/${id}`,action)
        .then(res => {
            if(res.data.modifiedCount > 0){
                refetch();
            }
        })
    }
    const handleReject = (id,) => {
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
    return (
        <div className="mt-12">
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
                                <p className={`px-3 py-1 rounded-full  w-fit ${submission.status === 'approved'? 'bg-[rgba(65,221,65,0.438)] text-green-600' : submission.status === 'rejected' ? 'text-red-600 bg-[rgba(223,48,48,0.39)]' : 'bg-[rgba(255,255,0,0.29)] text-yellow-600'}`}>
                                {submission.status}
                                </p>
                                
                            </td>
                            <th>
                                {submission.current_date}
                            </th>
                            <td className="flex gap-4">
                                <MdOutlineDone onClick={() => handleApprove(submission._id,submission.worker_email,submission.payable_amount)} className="text-4xl p-2 rounded-full text-green-600 bg-[rgba(65,221,65,0.438)] cursor-pointer"/>
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