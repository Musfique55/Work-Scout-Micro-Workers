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

    const handleApprove = (id) => {
        const action = {
            approve : 'approve'
        }
        axiosSecure.patch(`/submissions/${id}`,action)
        .then(res => {
            if(res.data.modifiedCount > 0){
                refetch();
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
    return (
        <div className="mt-12">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="text-base">
                    <tr>
                        <th>
                        
                        </th>
                        <th>Task</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Task Id</th>
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
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={submission.task_img_url}  />
                                </div>
                                </div>
                            </div>
                            </td>
                            <td>
                                {submission.task_title}
                            </td>
                            <td >
                                <p className={`px-3 py-1 rounded-full  w-fit ${submission.status === 'approve'? 'bg-[rgba(65,221,65,0.438)] text-green-600' : submission.status === 'rejected' ? 'text-red-600 bg-[rgba(223,48,48,0.39)]' : 'bg-[rgba(255,255,0,0.29)] text-yellow-600'}`}>
                                {submission.status}
                                </p>
                                
                            </td>
                            <td>
                                {submission.task_id}
                            </td>
                            <th>
                                {submission.current_date}
                            </th>
                            <td className="flex gap-4">
                                <MdOutlineDone onClick={() => handleApprove(submission._id)} className="text-4xl p-2 rounded-full text-green-600 bg-[rgba(65,221,65,0.438)] cursor-pointer"/>
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