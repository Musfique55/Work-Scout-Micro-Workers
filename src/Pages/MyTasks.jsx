import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useUserInfo from "../Hooks/useUserInfo";
import { useEffect, useState } from "react";

const MyTasks = () => {
    const {user,loading} = useAuth();
    const {userInfo,refetch} = useUserInfo();
    const [coins,setCoins] = useState(true);
    const axiosSecure = useAxiosSecure();
    const {data : mytasks = [],refetch :reload} = useQuery({
        queryKey : ['alltasks',user?.email],
        enabled : !loading,
        queryFn : async () => {
            const res = await axiosSecure.get(`/alltasks?email=${user.email}`);
            return res.data;
        }
    })
    useEffect(() => {
        if(userInfo){
            setCoins(false);
        }else{
            setCoins(true);
        }
    },[userInfo])
   
    if(coins){
        return <p>Please Wait....</p>
    }

   console.log(mytasks);

    const handleDelete =(id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to restore this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          })
          .then(async(result) => {
            if(result.isConfirmed) {
                const res = await axiosSecure.delete(`/alltasks/${id}`);
                reload();
                refetch();
                if(res.data.deletedCount > 0){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Task Deleted Successfully",
                        icon: "success"
                    });
                }   
            }
          });
        
    }

    
    return (
        <div className="mt-12 px-5">
            <h3 className='my-7 text-3xl font-medium'>My Tasks</h3>
            <div className="overflow-x-auto ">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Count</th>
                        <th>Payable Amount</th>
                        <th>Action</th>
                        <th>Trash</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {
                        mytasks.map((task,idx) => {
                            return <tr key={idx}>
                            <th>
                               <p>{idx+1}</p> 
                            </th>
                            <td>
                                <div>
                                    <div className="font-bold">{task.task_title}</div>
                                </div>
                            </td>
                            <td>
                                <p>{task.task_quantity}</p>
                            </td>
                            <td>{task.task_quantity * task.payable_amount}</td>
                            <th>
                            <Link to={`update/${task._id}`}><button className="btn bg-[#e5d5fa] btn-xs">Update</button></Link>
                            </th>
                            <td>
                                <FaTrash onClick={() => handleDelete(task._id)} className="text-lg text-red-500 cursor-pointer"></FaTrash>
                            </td>
                        </tr>
                        
                        })
                    }
                    
                    </tbody>
                </table>
            </div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" >open modal</button> */}
            
        </div>
    )
};

export default MyTasks;