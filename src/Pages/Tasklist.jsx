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
    console.log(tasks);
    return (
        <div className="m-5">
            {
                tasks.map((task) => {
                    return <div key={task._id} className="space-y-3 mb-5 border border-[#e5d5fa] p-5 rounded-2xl">
                    <h5 className="text-2xl font-medium">{task.title}</h5>
                    <div className="flex justify-between">
                        <p><span className="font-semibold">Creator</span> {task.name}</p>
                        <p><span className="font-semibold">Deadline</span> {task.deadline}</p>
                        <p><span className="font-semibold">Amount</span> {task.amount}</p>
                    </div>
                   <Link to={`/dashboard/task-list/details/${task._id}`}><button className="bg-[#8849da] text-white mt-3 px-7 py-2 rounded-full">Details</button></Link>
                </div>
                })
            }
            
        </div>
    );
};

export default Tasklist;