import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Tasklist = () => {
    const axiosSecure = useAxiosSecure();
    const {data : tasks = []} = useQuery({
        queryKey : ['tasks'],
        queryFn : async() => {
            const res = await axiosSecure.get('/alltasks');
            return res.data;
        }
    })

    const filterData = tasks.filter(task => task.availability > 0);
    return (
        <div className="mt-32 mx-5 lg:12">
            <h3 className='my-7 text-3xl font-medium'>Available Tasks</h3>
            {
                filterData.map((task) => {
                    return <div key={task._id} className="space-y-3 mb-5 border border-[#e5d5fa] p-5 rounded-2xl">
                    <h5 className="text-2xl font-medium">{task.task_title}</h5>
                    <div className="flex flex-col justify-between lg:flex-row">
                        <p><span className="font-semibold hidden lg:block">Creator</span> <br /> {task.creator_name}</p>
                        <p><span className="font-semibold hidden lg:block">Deadline</span> <br /> {task.completion_date}</p>
                        <div className="flex justify-between lg:hidden">
                        <p><span className="font-semibold">Creator</span> <br /> {task.creator_name}</p>
                        <p><span className="font-semibold">Deadline</span> <br /> {task.completion_date}</p>
                        </div>
                        <p><span className="font-semibold">Amount</span> <br /> {task.payable_amount}</p>
                    </div>
                   <Link to={`/dashboard/task-list/details/${task._id}`}><button className="bg-[#8849da] text-white mt-3 px-7 py-2 rounded-full">Details</button></Link>
                </div>
                })
            }
            
        </div>
    );
};

export default Tasklist;