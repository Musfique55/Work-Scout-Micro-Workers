import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Submissions = () => {
    const {user} = useAuth(); 
    const axiosSecure = useAxiosSecure();
    const {data : submissions = []} = useQuery({
        queryKey : ['submissions',user?.email],
        queryFn :  async() => {
            const res =  await axiosSecure.get(`/submissions/${user?.email}`);
            return res.data
        }
    })
    return (
        <div className="mt-32 mx-5 lg:12">
            <h3 className='my-7 text-3xl font-medium'>My Submissions</h3>
            <div className="overflow-x-auto mb-5">
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
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {
                        submissions.map((submission,idx) => {
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
                                <p className={`px-3 py-1 rounded-full  w-fit ${submission.status === 'approved'? 'bg-[rgba(65,221,65,0.438)] text-green-600' : submission.status === 'rejected' ? 'text-red-600 bg-[rgba(223,48,48,0.39)]' : 'bg-[rgba(255,255,0,0.29)] text-yellow-600'}`}>
                                {submission.status}
                                </p>
                                
                            </td>
                            <td>
                                {submission.task_id}
                            </td>
                            <th>
                                {submission.current_date}
                            </th>
                        </tr>)
                        })
                    }
                    
                    </tbody>
                  
                </table>
            </div>
        </div>
    );
};

export default Submissions;