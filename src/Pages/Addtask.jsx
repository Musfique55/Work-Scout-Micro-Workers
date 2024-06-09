import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useUserInfo from "../Hooks/useUserInfo";
const Addtask = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [coins,setCoins] = useState(true);
    const [userInfo,refetch] = useUserInfo();
    const axiosPublic = useAxiosPublic();
    const imageHost = import.meta.env.VITE_IMAGE_HOSTING;
    const hostingUrl = `https://api.imgbb.com/1/upload?key=${imageHost}`;
    const date = startDate.toDateString();
    useEffect(() => {
        if(!userInfo){
            setCoins(true);
        }else{
            setCoins(false);
        }
    },[userInfo])


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

      
      if(coins){
        return <p>Please Wait....</p>
      }
    

      const onSubmit = async(data) => {
        const imageFile = {image : data.photoUrl[0]};
        const res = await axiosPublic.post(hostingUrl,imageFile,{
            headers : {
                'content-type' : 'multipart/form-data'
            }
        });
        const image = res.data.data.display_url;
        const taskInfo = {
            image : image,
            payable_amount : parseInt(data.payable_amount),
            submission_info : data.submission_info,
            task_title : data.taskTitle,
            task_detail : data.task_details,
            task_quantity : parseInt(data.task_quantity),
            dealine : date,
            creator_email : userInfo.email,
            creator_name : userInfo.displayName,
            availability : parseInt(data.task_quantity)
        }
        const {task_quantity,payable_amount} = taskInfo;
        const total = task_quantity * payable_amount;
        if(total > userInfo.coins){
            return Swal.fire({
                position: "center",
                icon: "error",
                title: "Sorry You Don't have enough coins",
                showConfirmButton: false,
                timer: 2500
            });
        }
        if(res.data.success){
            axiosPublic.post('/alltasks',taskInfo)
            .then(res => {
                if(res.data.insertedId){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Job Posted Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                    reset();
                }
            })
            .catch(error => {
                if(error){
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "An Error Occured Please Try Again Later",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        }
      }
    return (
        <div className="m-5">
            <h3 className='my-7 text-3xl font-medium'> Add New Tasks</h3>
            <form className='space-y-3 grid gap-3 grid-cols-2' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex col-span-2 flex-col'>
                        <label>
                            Task Title
                        </label>
                        <input name='taskTitle' placeholder='Task Title' {...register("taskTitle",{required : true})} className='mt-2 border-2 p-2 focus:outline-none'/>
                        {errors.taskTitle && <p className='text-red-500'>This feild must be fill</p>}
                    </div>
                    
                    <div className='flex flex-col'>
                        <label >
                           Task Quantity
                        </label>
                        <input name='task_quantity' placeholder='Quanity' type='number' {...register("task_quantity",{required:true})} className='border-2 mt-2 p-2 focus:outline-none'/>
                        {errors.task_quantity && <p className='text-red-500'>This field must be fill</p>}
                    </div>
                    <div className='flex flex-col'>
                        <label >
                        Payable Amount
                        </label>
                        <input name='payable_amount' placeholder='payable_amount' type='number' {...register("payable_amount",{required:true})} className='border-2 mt-2 p-2 focus:outline-none'/>
                        {errors. payable_amount && <p className='text-red-500'>This field must be fill</p>}
                    </div>
                  
                    <div className='flex flex-col col-span-2'>
                        <label htmlFor='email'>
                        Task Details
                        </label>
                        <textarea rows={10} {...register("task_details",{required:true})} placeholder='Task Details' className='border-2 mt-2 p-2 focus:outline-none'/>
                        {errors.task_details && <p className='text-red-500'>This field must be fill</p>}
                    </div>
                    <div className='flex flex-col col-span-2  lg:col-span-1'>
                        <label >
                        Completion Date
                        </label>
                        <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='border-2 mt-2 p-2 focus:outline-none'/>
                    </div>
                    <div className='flex flex-col  col-span-2  lg:col-span-1 '>
                        <label>
                            Upload Image
                        </label>
                        <input name='photo' type='file'  {...register("photoUrl")} className='border-2  mt-2 focus:outline-none'/>
                    </div>
                    <div className='flex flex-col col-span-2'>
                        <label >
                        Submission Info
                        </label>
                        <textarea rows={10} {...register("submission_info",{required:true})} placeholder='Submission Info' className='border-2 mt-2 p-2 focus:outline-none'/>
                        {errors.task_detail && <p className='text-red-500'>This field must be fill</p>}
                    </div>
                    <button type="submit"  className='col-span-2 w-full py-2 bg-[#8849da] text-white'>Add Task</button>
                </form>
        </div>
    );
};

export default Addtask;