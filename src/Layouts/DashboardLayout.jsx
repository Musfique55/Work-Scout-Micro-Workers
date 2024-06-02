import { Link, NavLink, Outlet } from "react-router-dom";
import logo from '../assets/logo.png';
import useAuth from "../Hooks/useAuth";
import useUserInfo from "../Hooks/useUserInfo";
import { FaHistory, FaHome, FaTasks, FaUsers } from "react-icons/fa";
import { AiOutlineFileDone, AiOutlinePlusSquare } from "react-icons/ai";
import { RiCoinsFill } from "react-icons/ri";
const DashboardLayout = () => {
    const {user} = useAuth();
    const {userInfo} = useUserInfo();
    return (
        <div >
            <div className="grid grid-cols-4 ">
                <div className="border-r col-span-1 row-span-6 min-h-screen">
                    <div className="mx-8 pt-8">
                        <Link to='/'>
                        <img src={logo} alt="" className='w-[193px] h-[40px] cursor-pointer'/>
                        </Link>
                    </div>
                    {/* sidebar */}
                    {/* navigation for individuals */}
                    <div className="flex flex-col mt-8 ml-8 space-y-5">
                        {
                            userInfo.role === 'worker' &&
                            <>
                                <NavLink to='/dashboard/worker-home' className='flex items-center gap-4 text-xl font-medium'>
                                    <FaHome></FaHome>
                                Home
                                </NavLink>
                                <NavLink to='/dashboard/tasklist' className='flex items-center gap-4 text-xl font-medium'>
                                    <FaTasks></FaTasks>
                                    Task List
                                </NavLink>
                                <NavLink to='/dashboard/my-submissions' className='flex items-center gap-4 text-xl font-medium '>
                                    <AiOutlineFileDone className="text-2xl"/>
                                    My Submissions
                                </NavLink>
                            </>
                        }
                        {
                            userInfo.role === 'taskCreator' && 
                            <>
                                <NavLink to='/dashboard/manager-home' className='flex items-center gap-4 text-xl font-medium'>
                                    <FaHome></FaHome>
                                Home
                            </NavLink>
                            <NavLink to='/dashboard/add-tasks' className='flex items-center gap-4 text-xl font-medium'>
                                    <AiOutlinePlusSquare className="text-2xl"/>
                                    Add New Tasks
                            </NavLink>
                            <NavLink to='/dashboard/my-tasks' className='flex items-center gap-4 text-xl font-medium'>
                                    <FaTasks />
                                    My Tasks
                            </NavLink>
                            <NavLink to='/dashboard/purchase' className='flex items-center gap-4 text-xl font-medium'>
                                    <RiCoinsFill className=' text-xl font-medium'/>
                                    Purchase Coin
                            </NavLink>
                            <NavLink to='/dashboard/payments' className='flex items-center gap-4 text-xl font-medium'>
                                    <FaHistory></FaHistory>
                                    Payment history
                            </NavLink>
                            </>
                        }
                        {
                            userInfo.role === 'admin' &&
                            <>
                                <NavLink to='/dashboard/admin-home' className='flex items-center gap-4 text-xl font-medium'>
                                    <FaHome></FaHome>
                                Home
                                </NavLink>
                                <NavLink to='/dashboard/manage-users' className='flex items-center gap-4 text-xl font-medium'>
                                            <FaUsers></FaUsers>
                                        Manage Users
                                </NavLink>
                                <NavLink to='/dashboard/manage-tasks' className='flex items-center gap-4 text-xl font-medium'>
                                        <FaTasks /> 
                                            Manage Task
                                </NavLink>
                            </>
                        }
                        
                            
                    </div>
                </div>
                <div className="col-span-3 pt-8  mr-12"> 
                    <div className="flex-1 flex items-center justify-end">
                        <div className="flex flex-col gap-3 items-center ">
                            <div className="gap-7 justify-between flex items-center">
                            <p className="font-medium">Available Coins(<span className="text-red-500 font-medium">{userInfo.coins}</span>)</p>
                            <div className=" rounded-full">
                            <img  src={user?.photoURL} className="w-12 h-12 rounded-full"/>
                            </div>
                            </div>
                            <div className="gap-3 flex items-center">
                                <p className="bg-[#e5d5fa] px-2 py-1 rounded-full font-medium">{userInfo.role}</p>
                                <p className="font-medium">{userInfo.name}</p>
                            </div>
                        </div> 
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                    </div>
                </div>
                <div className="col-span-3">
                <Outlet></Outlet>
                </div>
            </div>
           

        </div>
    );
};

export default DashboardLayout;