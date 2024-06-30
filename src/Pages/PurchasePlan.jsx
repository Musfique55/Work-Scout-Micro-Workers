import coin from '../assets/40-FC-Points.png';
import coins from '../assets/100-FC-Points.png';
import coinss from '../assets/520-FC-Points.png';
import { useNavigate } from 'react-router-dom';

const PurchasePlan = () => {
    const navigate = useNavigate();
    const handleCheckout = (amount,coinsCount) => {
        localStorage.setItem('cart',amount);
        localStorage.setItem('coins',coinsCount);
        navigate('/dashboard/checkout')
    }
    return (
        <div className="mx-5 mt-12">
            <h3 className="text-3xl font-medium">Buy More Coins</h3>
            <div>
                <h5 className="font-medium text-lg my-12">Select Item</h5>
                <div className="flex flex-col gap-10 mb-5 lg:flex-row">
                    <div onClick={() => handleCheckout(1,10)} className='border-2 p-5 rounded-xl cursor-pointer'>
                        <p className="font-medium text-xl">10 Coins</p>
                        <img src={coins} alt="" />
                        <p className='text-[RGB(240,99,131)] font-semibold text-right'>From 1$</p>
                    </div>
                    <div onClick={() => handleCheckout(9,100)} className='border-2 p-5 rounded-xl cursor-pointer'>
                        <p className="font-medium text-xl">100 Coins</p>
                        <img src={coin} alt="" />
                        <p className='text-[RGB(240,99,131)] font-semibold text-right'>From 9$</p>
                    </div>
                    <div onClick={() => handleCheckout(19,500)} className='border-2 p-5 rounded-xl cursor-pointer'>
                        <p className="font-medium text-xl">500 Coins</p>
                        <img src={coinss} alt="" />
                        <p className='text-[RGB(240,99,131)] font-semibold text-right'>From 19$</p>
                    </div>
                    <div onClick={() => handleCheckout(39,1000)} className='border-2 p-5 rounded-xl cursor-pointer'>
                        <p className="font-medium text-xl">1000 Coins</p>
                        <img src={coinss} alt="" />
                        <p className='text-[RGB(240,99,131)] font-semibold text-right'>From 39$</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchasePlan;