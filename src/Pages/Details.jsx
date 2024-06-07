import { useLoaderData } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Countdown from "react-countdown";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const renderer = ({days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span>Times up!</span>;
    } else {
      // Render the countdown
      return (
        <div className="flex gap-2 items-center mt-3">
        <span className="bg-purple-300 p-2 font-medium">
            {days}d  
        </span>
        <span className="bg-purple-300 p-2 font-medium ">
            {minutes}m
        </span>
        <span className="bg-purple-300 p-2 font-medium">
            {hours}h
        </span>
        <span className="bg-purple-300 p-2 font-medium">
            {seconds}s
        </span>
        </div>
            
      );
    }
  };

const Details = () => {
    const data = useLoaderData();
    const {_id,image,task_title,task_detail,dealine,availability,payable_amount,creator_email,submission_info,task_quantity,creator_name} = data;
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const countDownDate = new Date(dealine);
    const deadlineDate = countDownDate.getTime();
    console.log(countDownDate);
    const handleSubmit = e => {
        e.preventDefault();
        const date = new Date().toDateString();
        const taskDetails = e.target.taskdetails.value;
        const subInfo = {
            task_id : _id,
            task_title : task_title,
            availability : task_quantity,
            task_detail : task_detail,
            task_img_url : image,
            payable_amount : payable_amount,
            worker_email : user.email,
            submission_details : taskDetails,
            worker_name : user.displayName,
            creator_name : creator_name,
            creator_email : creator_email,
            current_date : date,
            status : 'pending' 
        }
        axiosSecure.post('/submissions',subInfo)
        .then(res => {
            if(res.data.insertedId){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Submisssion Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                e.target.reset();
            }
        })
    }
    return ( 
        <div className="grid grid-cols-3 gap-6  my-12 mx-5">
            <div className="col-span-2 rounded-xl p-7 bg-gray-100">
                <div>
                    <img src={image} alt="" className="w-full h-[300px] object-contain rounded-lg"/>
                </div>
                <div>
                    <h3 className="mt-8 font-semibold text-2xl mb-5">Task Title</h3>
                    <p className="text-4xl font-medium">{task_title}</p>
                </div>
                <div>
                <h3 className="mt-8 font-semibold text-2xl mb-5">Task Details</h3>
                <p className="font-normal">{task_detail}</p>
                </div>
            </div>
            <div className="rounded-xl p-7 bg-gray-100">
                <div>
                    <h3 className="text-2xl font-medium">More Information</h3>
                    <div className="text-gray-700 mt-5">
                        Task Id : <span className="font-medium">
                        {_id}
                        </span>
                    </div>
                    <div className="mt-5">
                        <p className="text-gray-700 text-sm">Hiring Manager</p>
                        <p>{creator_name}</p>
                        <p>{creator_email}</p>
                    </div>
                    <div className="mt-5">
                        <p className="text-gray-700 text-lg">Available: {availability}</p>
                    </div>
                    <div className="mt-5">
                        <p className="text-gray-700 text-sm">Amount</p>
                        <p className="text-lg">{payable_amount}</p>
                    </div>
                    <div className="mt-5">
                        <p className="text-gray-700 text-sm">Submission Info</p>
                        <p className="text-lg">{submission_info}</p>
                    </div>
                    <div className="mt-5">
                       <p className="font--mediuum">Ending In</p> 
                        <Countdown daysInHours={false} date={deadlineDate} renderer={renderer}/>
                    </div>
                    <div>
                        <h5 className="mt-5 mb-2">Submission Form</h5>
                        <form onSubmit={handleSubmit}>
                            <textarea name="taskdetails" id="" rows={4} cols={31} className="focus:outline-none p-1">
                            </textarea>
                            <button type="submit" className="w-full py-2 bg-[#8849da]  text-white">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;