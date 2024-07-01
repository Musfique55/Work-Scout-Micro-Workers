import { useEffect, useState } from "react";
import useUserInfo from "../Hooks/useUserInfo";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Withdrawals = () => {
    const [userInfo] = useUserInfo();
    const amount = userInfo.coins;
    const maxVal = (amount / 20);
    const [finalAmount,setAmount] = useState(0);
    const [coins,setCoins] = useState(0);
    const axiosSecure = useAxiosSecure();
   
    useEffect(() => {
        const outCome =  coins / 20;
        setAmount(outCome);
        
    },[coins,amount])

    
    const handleWithdraw = async(e) => {
        e.preventDefault();
        const time = new Date().toDateString();
        const totalAmount = finalAmount;
        const paymentOption = e.target.paymentMethod.value;
        const accountNumber = e.target.accountNumber.value;
        if(coins > amount){
            return Swal.fire({
                position: "center",
                icon: "error",
                title: `You don't have enough coins`,
                showConfirmButton: false,
                timer: 1500
              });
        }
        const withdrawInfo = {
            worker_name : userInfo.name,
            worker_email : userInfo.email,
            withdraw_coin : parseInt(coins),
            payment_system : paymentOption,
            withdraw_time :  time,
            withdraw_amount : totalAmount,
            payment_number : accountNumber
        }
        const res = await axiosSecure.post('/withdraws',withdrawInfo)
        if(res.data.insertedId) { 
            return Swal.fire({
                position: "center",
                icon: "success",
                title: `Your withdraw request send successfully`,
                text : 'Please wait for admins approval',
                showConfirmButton: false,
                timer: 2500
              });
        }
    }
    return (
        <div className="mx-5 mb-12 mt-24 lg:mx-12">
            <h3 className="text-3xl font-medium mb-8">Withdraw</h3>
            <div className="text-lg font-medium space-y-3 mb-5">
                <h5 className="text-green-500">You can withdraw maximum {maxVal}$</h5>
                <p>20 coins = 1$</p>
            </div>
            <form onSubmit={handleWithdraw} className="grid grid-cols-1 gap-3 space-y-3 lg:grid-cols-2">
                <div className="col-span-2">
                    <label className="block">
                        Coin to Withdraw
                    </label>
                     <input type="number" onChange={e => setCoins(e.target.value)}  name="coins" className="border-2 p-2 w-full focus:outline-none" placeholder="Coins"/>
                </div>
                <div className="col-span-1">
                    <label className="block">
                        Available for Withdraw
                    </label>
                    <input type="number" name="amount" value={finalAmount} className="border-2 p-2 w-full focus:outline-none"/>
                </div>   
                <div className="col-span-1">
                    <label className="block">
                        Select System
                    </label>
                    <select name="paymentMethod" className="border-2 p-2 w-full focus:outline-none">
                        <option value="bkash">Bkash</option>
                        <option value="nagad">Nagad</option>
                        <option value="rocket">Rocket</option>
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="block">
                        Account Number
                    </label>
                    <input type="text" name="accountNumber" placeholder="Account Number" className="border-2 p-2 w-full focus:outline-none"/>
                </div>
                <button className="col-span-2 py-2 bg-[#295dfa] text-white font-semibold">Withdraw</button>
            </form>
        </div>
    );
};

export default Withdrawals;