import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Submissions = () => {
    const {user} = useAuth(); 
    const axiosPublic = useAxiosPublic();
    const {data : submissions = []} = useQuery({
        queryKey : ['submissions',user?.email],
        queryFn :  async() => {
            const res =  await axiosPublic.get('/submissions');
            console.log(res.data);
            return res.data
        }
    })
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
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
                                <p className={`px-3 py-1 rounded-full  w-fit ${submission.status === 'pending'? 'bg-[rgba(255,255,0,0.29)]' : 'bg-green-200' } `}>
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