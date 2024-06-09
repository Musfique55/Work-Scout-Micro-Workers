import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { FaCoins, FaUsers } from "react-icons/fa";
import { MdOutlineDone, MdPayments } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useUserInfo from "../Hooks/useUserInfo";
import Swal from "sweetalert2";

const AdminHome = () => {
    const [users,setUsers] = useState([]);
    const [coins,setCoins] = useState([]);
    const [userInfo] = useUserInfo();
    const axiosSecure = useAxiosSecure();

    const {data : withdraws = [],refetch} = useQuery({
        queryKey : ['withdraws',userInfo?.email],
        queryFn : async () => {
            const res = await  axiosSecure.get('/withdraws');
            return res.data;
        }
    })
    useEffect(() => {
        axiosSecure.get('/users')
        .then(res => {
            setUsers(res.data);
        })

        axiosSecure.get('/total-coins')
        .then(res => {
            setCoins(res.data);
        })
    },[axiosSecure])
    const handleApprove = (id,email,coin) => {
        const info = {
            id : id,
            email : email,
            coins : coin
        }
        axiosSecure.post("/withdraw-success",info)
        .then(res => {
            if(res.data.insertedId){
                refetch();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Payment approved",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }
    return (
        <div className="mx-5 mt-12">
            <div className="grid-cols-1 grid gap-10 lg:grid-cols-3">
                    <div className="flex items-center gap-5 bg-[#9169c5b0] text-white p-8 rounded-2xl">
                        <FaUsers className="text-3xl"></FaUsers>
                        <div>
                           <p className="text-4xl font-medium">{users.length}</p>     
                           <h5 className="text-2xl font-medium">Total Users</h5>         
                        </div>
                    </div>
                    <div className="flex items-center gap-5 bg-[#9169c5b0] text-white p-8 rounded-2xl">
                        <FaCoins className="text-4xl"/>
                        <div>
                           <p className="text-4xl font-medium">{coins[0]?.total_coins}</p>     
                           <h5 className="text-2xl font-medium">Total Coins</h5>         
                        </div>
                    </div>
                    <div className="flex items-center gap-5 bg-[#9169c5b0] text-white p-8 rounded-2xl">
                        <MdPayments  className="text-4xl"/>
                        <div>
                           <p className="text-4xl font-medium">0</p>     
                           <h5 className="text-2xl font-medium">Total Payments</h5>         
                        </div>
                    </div>
            </div>
            {
                withdraws.length > 0 && <div>
                    <h3 className="text-3xl font-medium mt-8">Withdraw Requests</h3>
                <table className="table mt-5">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>
                            
                            </th>
                            <th>Worker Name</th>
                            <th>Withdraw Coin</th>
                            <th>Withdraw Amount</th>
                            <th>Payment Number</th>
                            <th>Payment System</th>
                            <th>Withdraw Time</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {   
                            withdraws.map((submission,idx) => {
                                return (<tr key={submission._id} className={`${submission.status === 'approved' ? 'hidden' : submission.status === 'rejected' ? 'hidden' : ''}`}>
                                <th>
                                    {idx+1}
                                </th>
                                <td>
                                <div>
                                    <p>{submission.worker_name}</p>
                                </div>
                                </td>
                                
                                <td >
                                    {submission.withdraw_coin}
                                </td>
                                <td >
                                    <p>
                                    {submission.withdraw_amount}
                                    </p>
                                    
                                </td>
                                <td>
                                    {submission.payment_number}
                                </td>
                                <td>
                                    {submission.payment_system}
                                </td>
                                <td>
                                    {submission.withdraw_time}
                                </td>
                                <td className="text-center">
                                    <MdOutlineDone onClick={() => handleApprove(submission._id,submission.worker_email,submission.withdraw_coin)} className="text-4xl p-2 rounded-full text-green-600 bg-[rgba(65,221,65,0.438)] cursor-pointer"/>
                                </td>
                            </tr>)
                            })
                        }
                        
                        </tbody>
                      
                    </table>
                </div>
            }
        </div>
    );
};

export default AdminHome;