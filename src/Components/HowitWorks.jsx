import { GrMoney } from "react-icons/gr";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { SlNote } from "react-icons/sl";

const HowitWorks = () => {
    return (
        <div className="px-12 py-20 mt-12 bg-[#e5d5fa]">
            <h2 className='text-4xl font-medium mb-10'>How it Works</h2>

            <div className="grid grid-cols-3 gap-10">
                <div className="p-16 bg-white rounded-2xl">
                    <div className="px-3 py-1 rounded-md bg-[#F2F4F6] w-fit font-semibold">
                        <p>step 1</p>
                    </div>
                    <div className="mt-3 flex ml-auto bg-[#e5d5fa] p-2 rounded-lg w-fit">
                    <SlNote className="text-3xl text-[#8849da]"/>
                    </div>
                    <div>
                        <h5 className="text-2xl font-bold">Get Started <br />Quickly</h5>
                        <hr className="border mt-5 border-black"/>
                        <p className="text-sm mt-12 font-medium">Sign up easily with your email or social media account. Join our community and unlock access to a world of opportunities.</p>
                    </div>
                </div>
                <div className="p-16 bg-white rounded-2xl">
                    <div className="px-3 py-1 rounded-md bg-[#F2F4F6] w-fit font-semibold">
                        <p>step 2</p>
                    </div>
                    <div className="mt-3 flex ml-auto bg-[#e5d5fa] p-2 rounded-lg w-fit">
                    <IoCheckmarkCircleOutline className="text-3xl text-[#8849da]"/>
                    </div>
                    <div>
                        <h5 className="text-2xl font-bold">Engage and <br /> Earn </h5>
                        <hr className="border mt-5 border-black"/>
                        <p className="text-sm mt-12 font-medium">Browse available tasks and choose those that match your skills and interests. Complete tasks efficiently and effectively to earn coins.</p>
                    </div>
                </div>
                <div className="p-16 bg-white rounded-2xl">
                    <div className="px-3 py-1 rounded-md bg-[#F2F4F6] w-fit font-semibold">
                        <p>step 3</p>
                    </div>
                    <div className="mt-3 flex ml-auto bg-[#e5d5fa] p-2 rounded-lg w-fit">
                    <GrMoney className="text-3xl text-[#8849da]"/>
                    </div>
                    <div>
                        <h5 className="text-2xl font-bold">Reap the <br />Benefits</h5>
                        <hr className="border mt-5 border-black"/>
                        <p className="text-sm mt-12 font-medium">Convert your earned coins into rewards. Enjoy the fruits of your labor by redeeming coins for cash, gift cards, or other exciting rewards.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowitWorks;