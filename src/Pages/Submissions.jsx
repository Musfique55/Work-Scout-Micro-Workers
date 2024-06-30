import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useSubmissions from "../Hooks/useSubmissions";

const Submissions = () => {
    const {user} = useAuth(); 
    const axiosSecure = useAxiosSecure();
    const [currentPage,setCurrentPage] = useState(1);
    const [submissions,setSubmissions] = useState([]);
    const [count] = useSubmissions();
    const limit = 10; 
    

    useEffect(() => {
        axiosSecure.get(`/submissions/${user?.email}?page=${currentPage}&limit=${limit}`)
        .then(res => {
            setSubmissions(res.data)
        })
    },[axiosSecure,currentPage,limit,user.email])

    
    const totalPages = Math.ceil(count / limit);
    const pages = [];
    for(let i = 0; i < totalPages ; i++){
        pages.push(i+1);
    }
    
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
                        submissions?.map((submission,idx) => {
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
                <div className="flex justify-center gap-3 mt-10">
                   
                    {
                        pages.map(page => {
                            return <button onClick={() => setCurrentPage(page)} className={`btn btn-ghost ${currentPage === page ? 'bg-[#B397D7] text-white' : 'bg-gray-100'} `} key={page}>{page}</button>
                        })
                    }
              
                    </div>
            </div>
        </div>
    );
};

export default Submissions;