import { FaLock } from 'react-icons/fa';
import { GiJusticeStar, GiStabbedNote } from 'react-icons/gi';
import { IoMdAnalytics } from 'react-icons/io';
import { SiMoneygram } from 'react-icons/si';
import { TbTargetArrow } from 'react-icons/tb';
const Features = () => {
    return (
        <div>
            <div className='mx-12'>
                <h3 className='text-4xl'>Features</h3>
                <p className='w-[600px] mt-5'>Access the platform from any device, whether youre on desktop or mobile. Enjoy the flexibility of managing tasks and staying productive on the go.</p>
                <div className='grid grid-cols-3 gap-6 mt-12'>
                    <div className="flex items-start gap-3">
                        <div className='bg-[#e5d5fa] p-2 rounded-lg'>
                        <SiMoneygram className='text-xl  text-[#8849da]'/>
                        </div>
                        <div>
                            <h5 className='text-xl'>Earn Coins by Completing Tasks</h5>
                            <p className='mt-3'>Accumulate rewards by successfully completing various tasks. Turn your efforts into valuable coins and enhance your earning potential.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className='bg-[#e5d5fa] p-2 rounded-lg'>
                        <GiStabbedNote className='text-xl text-[#8849da]'/>
                        </div>
                        <div>
                            <h5 className='text-xl'> Create and Manage Tasks</h5>
                            <p className='mt-3'>Easily create, assign, and monitor tasks with our user-friendly interface. Stay organized and ensure all your projects run smoothly.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className='bg-[#e5d5fa] p-2 rounded-lg'>
                        <FaLock className='text-xl  text-[#8849da]'></FaLock>
                        </div>
                        <div>
                            <h5 className='text-xl'>Secure Payments</h5>
                            <p className='mt-3'>Enjoy peace of mind with our secure payment system. Transactions are encrypted and protected, ensuring your funds are always safe.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className='bg-[#e5d5fa] p-2 rounded-lg'>
                        <GiJusticeStar className='text-xl  text-[#8849da]'/>
                        </div>
                        <div>
                            <h5 className='text-xl'>Personalized Dashboard</h5>
                            <p className='mt-3'>Get an overview of your activities, earnings, and progress with a personalized dashboard. All the essential information at your fingertips.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className='bg-[#e5d5fa] p-2 rounded-lg'>
                        <IoMdAnalytics className='text-xl text-[#8849da]'/>
                        </div>
                        <div>
                            <h5 className='text-xl'>Analytics and Reports</h5>
                            <p className='mt-3'>Gain insights into your performance with detailed analytics and reports. Track your progress and identify areas for improvement.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className='bg-[#e5d5fa] p-2 rounded-lg'>
                        <TbTargetArrow className='text-xl text-[#8849da]'/>
                        </div>
                        <div>
                            <h5 className='text-xl'>Goal Tracking</h5>
                            <p className='mt-3'>Set and track your goals within the platform. Achieve your targets efficiently with clear, measurable objectives.</p>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    );
};

export default Features;