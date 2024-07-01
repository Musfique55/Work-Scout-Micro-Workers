import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo2.png';
import logo2 from '../assets/logo.png';
import { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import useUserInfo from '../Hooks/useUserInfo';
import { CgMenuLeft } from 'react-icons/cg';
import { IoClose } from 'react-icons/io5';
import { FaCirclePlus, FaUnlock } from 'react-icons/fa6';
const Header = () => {
    const [userInfo] = useUserInfo();
    const {user,logout} = useAuth();
    const [menu,setMenu] = useState(false);
    const [rightMenu,setRightMenu] = useState(false)
    const [scroll,setScroll] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY);
        }
        window.addEventListener('scroll',handleScroll);      
    },[scroll]);

    


    const handleLogout = async () => {
        await logout();
    }

   
    const handleMenuToogle = () => {
        setMenu(!menu);
    }

    const handleRightMenu = () => {
        setRightMenu(!rightMenu)
    }

    return (
        

        <div className={` w-full`}>
            <div className={`hidden lg:flex lg:justify-between fixed w-full z-50 ${scroll > 150 ? 'bg-white text-black shadow-lg h-32' : 'text-white bg-transparent transition-all'}`}>
                <div className='flex justify-between flex-1 items-center mx-8 my-12'>
                    <div>
                        <Link to='/'>
                        <img src={scroll > 150 ? logo : logo2} alt="" className='w-[193px] h-[40px] cursor-pointer'/>
                        </Link>
                    </div>
                    {/* desktop menu */}
                    <div className="flex gap-6">
                        {
                            !user && <NavLink to='https://www.youtube.com/watch?v=PFkzyLHiEPw&embeds_referring_euri=https%3A%2F%2Fworkscout.in%2F&source_ve_path=Mjg2NjQsMjg2NjY&feature=emb_logo'>
                            Watch Demo
                        </NavLink>
                        }
                        {
                            (user && userInfo?.role === 'worker') &&
                            <NavLink to={`/dashboard/worker-home`}>
                                Dashboard
                            </NavLink>
                            
                        }
                        {
                            (user && userInfo?.role === 'taskCreator') &&
                            <NavLink to={`/dashboard/manager-home`}>
                                Dashboard
                            </NavLink>
                            
                        }
                        {
                            (user && userInfo?.role === 'admin') &&
                            <NavLink to={`/dashboard/admin-home`}>
                                Dashboard
                            </NavLink>
                            
                        }
                        {
                            user && 
                            <p>
                                Available Coin(<span className='text-red-500'>{userInfo?.coins}</span>)
                            </p> 
                        }
                        
                    
                    </div>
                    
                    {
                        user ? <div className='flex gap-3 items-center'>
                        <p className="font-medium">{userInfo?.name}</p>
                        <img  src={user?.photoURL} onClick={() => handleRightMenu()} className="w-12 h-12 rounded-full cursor-pointer"/>
                        <i
                         onClick={handleLogout}
                         className={`fa-solid fa-right-from-bracket text-2xl cursor-pointer ${scroll > 150 ? 'text-black' : 'text-white'}`}
                         ></i>
                       
                         </div>
                        : <div className='flex items-center gap-3'> 
                            <NavLink to='/login' className="hover:text-[rgb(38,174,97)] flex items-center gap-3 font-base font-medium">
                            <FaUnlock></FaUnlock>
                            Login
                            </NavLink>
                        <NavLink to='/register' className="hover:text-[rgb(38,174,97)] flex items-center gap-3 font-base font-medium">
                            <FaCirclePlus />
                            Register
                        </NavLink> 
                            </div>
                    }
                </div>
               
            </div>


            <div className="flex flex-col lg:hidden">
                <div className={`flex gap-5 py-8 px-5 items-center fixed w-full z-50 ${scroll > 150 ? 'bg-white text-black shadow-lg' : 'text-black bg-transparent'}`}>

                    <div className=" flex items-center gap-5">
                        <CgMenuLeft onClick={() => handleMenuToogle()} className="text-4xl"/>
                        <Link to='/'>
                        <img src={scroll > 150 ? logo : logo2} alt="logo" className='w-[193px] h-[40px] cursor-pointer'/>
                        </Link>
                    </div>
                 
                    {/* mobile menu */}
                    <div  className={`flex flex-col space-y-5 absolute bg-white p-5 ${!menu ? '-ml-[500px] transition-all' : 'ml-0 mt-36 transition-all h-fit'}`}>
                        <IoClose onClick={() => setMenu(!menu)} className="absolute text-4xl top-3 right-2"/>
                        
                        {!user && <NavLink to='https://www.youtube.com/watch?v=PFkzyLHiEPw&embeds_referring_euri=https%3A%2F%2Fworkscout.in%2F&source_ve_path=Mjg2NjQsMjg2NjY&feature=emb_logo'>
                         Watch Demo
                        </NavLink>
                        }
                    {
                        (user && userInfo?.role === 'worker') &&
                        <NavLink to={`/dashboard/worker-home`}>
                            Dashboard
                        </NavLink>
                        
                    }
                    {
                        (user && userInfo?.role === 'taskCreator') &&
                        <NavLink to={`/dashboard/manager-home`}>
                            Dashboard
                        </NavLink>
                        
                    }
                    {
                        (user && userInfo?.role === 'admin') &&
                        <NavLink to={`/dashboard/admin-home`}>
                            Dashboard
                        </NavLink>
                        
                    }
                    {
                        user && 
                        <p>
                            Available Coin(<span className='text-red-500'>{userInfo?.coins}</span>)
                        </p> 
                    }
                    </div>
                    <div> 
                    <div className="flex items-center justify-end">
                        <div className="flex flex-col gap-3 items-center relative">
                            <div>
                            
                            {
                                user ? 
                                <div>
                                    <div className="rounded-full ">
                                        <img  src={user?.photoURL} onClick={() => handleRightMenu()} className="w-12 h-12 rounded-full cursor-pointer"/>
                                    </div>
                                        <div className={`bg-white absolute  ${rightMenu ? 'mt-2 right-2 transition-all' : '-mt-[500px] right-1 transition-all'}`}>
                                            <div className="bg-white p-5 space-y-3 h-fit text-center z-50">
                                                <p className="font-medium">{user?.name}</p>
                                                <p className="bg-[#e5d5fa] px-2 py-1 rounded-full font-medium">{userInfo?.role}</p>
                                                <button  onClick={handleLogout}>Logout</button>
                                            </div>
                                        </div>
                                </div> :
                                <div className='flex flex-col items-center gap-3 lg:flex-row'> 
                                        <NavLink to='/login' className="hover:text-[rgb(38,174,97)] flex items-center gap-3 font-base font-medium">
                                        <FaUnlock></FaUnlock>
                                        Login
                                        </NavLink>
                                    <NavLink to='/register' className="hover:text-[rgb(38,174,97)] flex items-center gap-3 font-base font-medium">
                                        <FaCirclePlus />
                                        Register
                                    </NavLink> 
                                </div>
                            }
                            </div>
                        </div> 
                    </div>
                </div>
                </div>
            </div>
            

        </div>
    );
};

export default Header;