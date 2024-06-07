import { useQuery } from "@tanstack/react-query";
import { FaEye, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Player } from "@lottiefiles/react-lottie-player";

const ManageTasks = () => {
    const axiosSecure = useAxiosSecure();
    const {data : alltasks = [],refetch,isLoading} = useQuery({
        queryKey : ['alltasks'],
        queryFn : async () => {
            const result = await axiosSecure.get('/alltasks')
            return result.data;
        }
    })
    const loader =
    <Player
    autoplay
    loop
    src="https://lottie.host/47e12094-cada-45be-b9f0-47a35c570531/Xz6EddocLm.json"
    style={{ height: '300px', width: '300px', marginLeft : 'auto',marginRight : 'auto'}}
    >
    </Player>
    
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              axiosSecure.delete(`/alltasks/${id}`)
              .then(res => {
                if(res.data.deletedCount > 0){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Task has been deleted.",
                        icon: "success"
                      });
                      refetch();
                }
              })
            }
          });
    }

    if(isLoading){
        return loader;
    }

    return (
        <div>
            <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Task Title</th>
                        <th>Creator</th>
                        <th>Total Quantity</th>
                        <th>Required Coin</th>
                        <th>Availability</th>
                        <th>View Task</th>
                        <th>Delete Task</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {
                        alltasks.map((task,idx) => {
                            return <tr key={idx}>
                            <td>
                                <p>{task.task_title}</p>
                            </td>
                            <td>
                            <div className="flex gap-2 items-center">
                                    <p>{task.creator_name}</p>
                            </div>
                            </td>
                            <td>{task.task_quantity}</td>
                            <td>{task.payable_amount}</td>
                            <td></td>
                            <td className="text-2xl cursor-pointer"><FaEye></FaEye></td>
                            <td>
                                <FaTrash onClick={() => handleDelete(task._id)} className="text-lg text-red-500 cursor-pointer"></FaTrash>
                            </td>
                        </tr>
                        
                        })
                    }
                    
                    </tbody>
                </table>
        </div>
    );
};

export default ManageTasks;