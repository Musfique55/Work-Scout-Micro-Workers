import { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const TopEarners = () => {
    const [topers,setTopers] = useState([]);
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        axiosPublic.get('/top-earners')
        .then(res  => {
            setTopers(res.data);
        })
    },[axiosPublic]);

    const workers = topers.filter(worker => worker.task_completion > 0);
    return (
        <div className="mt-12 mx-12">
            <h3 className="mb-20 text-4xl font-medium">Top Earners</h3>
            <div className="grid grid-cols-3 gap-20">
                {
                    workers.map((toper,idx) => {
                        return <div key={toper._id} className={`bg-[#E5D5FA] rounded-2xl flex flex-col items-center p-5 ${idx % 2 === 0 && '-mt-10 h-fit'}`}>
                                <div className="pt-5">
                                    <img src={toper.image} className="w-[292px] h-[300px] object-cover  rounded-2xl" />
                                </div>
                                <div className="text-center">
                                    <h5 className="text-2xl font-medium my-3 text-black">{toper.name}</h5>
                                    <p className="font-medium text-lg text-black">Available Coins {toper.coins}</p>
                                    <p className="font-medium text-lg text-black">Task Completion {toper.task_completion}</p>
                                </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default TopEarners;