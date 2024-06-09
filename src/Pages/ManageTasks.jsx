import { useQuery } from "@tanstack/react-query";
import { FaEye, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Player } from "@lottiefiles/react-lottie-player";
import { useState } from "react";

const ManageTasks = () => {
    const axiosSecure = useAxiosSecure();

    const [selectedTask,setSelectedTask] = useState({});
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

    const handleView = task => {
        setSelectedTask(task);
        document.getElementById('my_modal_3').showModal();
    }
    
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
        <div className="mt-24 mx-5 lg:mt-12">
            <h3 className="text-3xl font-medium mb-8">Manage Tasks</h3>
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
                            <td>{task.payable_amount * task.task_quantity}</td>
                            <td>{task.availability}</td>
                            <td className="text-2xl cursor-pointer"><FaEye onClick={()=> handleView(task)}></FaEye></td>
                            <td>
                                <FaTrash onClick={() => handleDelete(task._id)} className="text-lg text-red-500 cursor-pointer"></FaTrash>
                            </td>  
                        </tr>
                        })
                    }
                    
                    </tbody>
                    
            </table>

            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            {
                        selectedTask && <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <div className="col-span-2 rounded-xl p-7 bg-gray-100">
                            <div>
                                <img src={selectedTask.image} alt="" className="w-full h-[300px] object-contain rounded-lg"/>
                            </div>
                            <div>
                                <h3 className="mt-8 font-semibold text-2xl mb-5">Task Title</h3>
                                <p className="text-4xl font-medium">{selectedTask.task_title}</p>
                            </div>
                            <div>
                            <h3 className="mt-8 font-semibold text-2xl mb-5">Task Details</h3>
                            <p className="font-normal">{selectedTask.task_detail}</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-medium">More Information</h3>
                                <div className="text-gray-700 mt-5">
                                    Task Id : <span className="font-medium">
                                    {selectedTask._id}
                                    </span>
                                </div>
                                <div className="mt-5">
                                    <p className="text-gray-700 text-sm">Hiring Manager</p>
                                    <p>{selectedTask.creator_name}</p>
                                    <p>{selectedTask.creator_email}</p>
                                </div>
                                <div className="mt-5">
                                    <p className="text-gray-700 text-lg">Available: {selectedTask.task_quantity}</p>
                                </div>
                                <div className="mt-5">
                                    <p className="text-gray-700 text-sm">Amount</p>
                                    <p className="text-lg">{selectedTask.payable_amount}</p>
                                </div>
                                <div className="mt-5">
                                    <p className="text-gray-700 text-sm">Submission Info</p>
                                    <p className="text-lg">{selectedTask.submission_info}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </dialog>
                    }
        </div>
    );
};

export default ManageTasks;