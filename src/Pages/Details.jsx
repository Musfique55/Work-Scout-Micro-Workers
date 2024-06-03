import { useLoaderData } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Details = () => {
    const data = useLoaderData();
    const {_id,image,title,details,deadline,amount,email,submission_info,quantity,name} = data;
    const {user} = useAuth();

    return ( 
        <div className="grid grid-cols-3 gap-6 bg-gray-100 mt-12 mx-5">
            <div className="col-span-2 rounded-xl p-7">
                <div>
                    <img src={image} alt="" className="w-full h-[300px] object-cover rounded-lg"/>
                </div>
                <div>
                    <h3 className="mt-8 font-semibold text-2xl mb-5">Task Title</h3>
                    <p className="text-4xl font-medium">{title}</p>
                </div>
                <div>
                <h3 className="mt-8 font-semibold text-2xl mb-5">Task Details</h3>
                <p className="font-normal">{details}</p>
                </div>
            </div>
            <div className="rounded-xl p-7">
                <div>
                    <h3 className="text-2xl font-medium">More Information</h3>
                    <div className="mt-5">
                        <p className="text-gray-700 text-lg">Hiring Manager</p>
                        <p>{name}</p>
                    </div>
                    <div className="mt-5">
                        <p className="text-gray-700 text-lg">Available: {quantity}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;