import useAxiosSecure from "../Hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {data : users = [],refetch} = useQuery({
        queryKey : ['users','role'],
        queryFn : async() => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })

    const workers = users.filter(user => user.role === "worker");

    const updateRole = (email,e) => {
        const role = e.target.value;
        const promote = {
            role,
            worker_email : email
        }
        axiosSecure.patch('/users',promote)
        .then(res => {
            if(res.data.matchedCount > 0){
                refetch();
            }
        })
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
                axiosSecure.delete(`/users/${id}`)
                .then(res => {
                    if(res.data.deletedCount > 0){
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "User deleted Successfully",
                            icon: "success"
                          });
                    }
                })
            }
          }); 
    }
    return (
        <div className="mt-12 mx-5">
            <h3 className="text-3xl font-medium mb-8">Manage Users</h3>
            <div className="overflow-x-auto ">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Update Role</th>
                        <th>Delete User</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {
                        workers.map((task,idx) => {
                            return <tr key={idx}>
                            <th>
                               <p>{idx+1}</p> 
                            </th>
                            <td>
                                <div className="flex gap-2 items-center">
                                    <img src={task.image}  className="w-16 h-16 rounded-full object-cover"/>
                                    <p>{task.name}</p>
                                </div>
                            </td>
                            <td>
                                <p>{task.email}</p>
                            </td>
                            <td>{task.role}</td>
                            <th>
                                <form onChange={(e) => updateRole(task.email,e)}>
                                    <select name="role" defaultValue={'UpdateRole'} className="border focus:outline-none p-2">
                                        <option disabled value="UpdateRole">Update Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="taskCreator">Task-Creator</option>
                                        <option value="worker">Worker</option>
                                    </select>
                                </form>
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
        </div>
    );
};

export default ManageUsers;