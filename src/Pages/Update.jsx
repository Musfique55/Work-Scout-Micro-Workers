import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Update = () => {
    const data = useLoaderData();
    const {task_title,task_detail,_id,submission_info} = data;
    const axiosSecure = useAxiosSecure();
    const handleUpdate = async(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const details = e.target.details.value;
        const subInfo = e.target.sub.value;
        const update = {
            title : title,
            details : details,
            submission_info : subInfo
        }
        const res = await axiosSecure.patch(`/alltasks/${_id}`,update)
        console.log(res.data);
        if(res.data.modifiedCount > 0){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Updated Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }else{
            Swal.fire({
                position: "center",
                icon: "error",
                title: "An error occured try again!",
                showConfirmButton: false,
                timer: 2500
            });
        }
    }
    return (
        <div className="m-5">
            <h3 className='mb-7 text-3xl font-medium'>Update Task</h3>
            <form onSubmit={handleUpdate} className="space-y-5">
                    <div className='flex col-span-2 flex-col'>
                        <label>
                            Task Title
                        </label>
                        <input name='title' defaultValue={task_title} className='mt-2 border-2 p-2 focus:outline-none'/>
                        
                    </div>
                    
                    <div className='flex flex-col'>
                        <label >
                           Task Details
                        </label>
                        <input name='details' defaultValue={task_detail} type='text' className='border-2 mt-2 p-2 focus:outline-none'/>
                    </div>
                    <div className='flex flex-col'>
                        <label >
                        Submission Info
                        </label>
                        <input name='sub' defaultValue={submission_info} type='text' className='border-2 mt-2 p-2 focus:outline-none'/>
                    </div>
                    <button type="submit" className="bg-[#8849da] w-full py-2 text-white">Update</button>
            </form>
        </div>
    );
};

export default Update;