import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data : history = []} = useQuery({
        queryKey : ['history',user?.email],
        queryFn : async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data;
        }
    })
    return (
        <div className="mx-5 mt-12">
            <h3 className="text-3xl font-medium mb-10">Payment Histories</h3>
            {
                history.length > 0 ? <div className="overflow-x-auto">
                <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th></th>
                            <th>Transaction Id</th>
                            <th>Amount</th>
                            <th>Coins</th>
                            <th>Status</th>
                            <th>Time</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {
                            history.map((task,idx) => {
                                return <tr key={idx}>
                                <th>
                                   <p>{idx+1}</p> 
                                </th>
                                <td>
                                    <div className="flex gap-2 items-center mr-12">
                                        <p>{task.id}</p>
                                    </div>
                                </td>
                                <td>
                                    <p>{task.amount}$</p>
                                </td>
                                <td>{task.coins}</td>
                                <td><p className="p-2 bg-[#6bff6b56] text-green-500 font-semibold rounded-full w-fit ">{task.status}</p></td>
                                <td>{task.time}</td>
                            </tr>
                            
                            })
                        }
                        
                        </tbody>
                </table>
                </div> : 
                <p className="text-2xl mt-20 text-center font-bold">There is no payment yet</p>
            }
        </div>
    );
};

export default PaymentHistory;