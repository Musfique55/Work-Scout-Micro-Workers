import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
const Addtask = () => {
    const [startDate, setStartDate] = useState(new Date());
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
        console.log(data);
      }
    return (
        <div className="m-5">
            <h3 className='my-7 text-3xl font-medium'> Add New Tasks</h3>
            <form className='space-y-3 grid gap-3 grid-cols-2' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex  flex-col'>
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
                        <input name=' payable_amount' placeholder=' payable_amount' type='number' {...register(" payable_amount",{required:true})} className='border-2 mt-2 p-2 focus:outline-none'/>
                        {errors. payable_amount && <p className='text-red-500'>This field must be fill</p>}
                    </div>
                    <div className='flex flex-col'>
                        <label >
                        Payable Amount
                        </label>
                        <input name=' payable_amount' placeholder=' payable_amount' type='number' {...register(" payable_amount",{required:true})} className='border-2 mt-2 p-2 focus:outline-none'/>
                        {errors. payable_amount && <p className='text-red-500'>This field must be fill</p>}
                    </div>
                    <div className='flex flex-col col-span-2'>
                        <label htmlFor='email'>
                        Task Details
                        </label>
                        <textarea rows={10} {...register("task_details",{required:true})} placeholder='Task Details' className='border-2 mt-2 p-2 focus:outline-none'/>
                        {errors.task_details && <p className='text-red-500'>This field must be fill</p>}
                    </div>
                    <div className='flex flex-col'>
                        <label >
                        Completion Date
                        </label>
                        <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='border-2 mt-2 p-2 focus:outline-none'/>
                    </div>
                    <div className='flex flex-col w-fit'>
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