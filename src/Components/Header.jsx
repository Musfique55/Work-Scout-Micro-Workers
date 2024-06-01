import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaUnlock } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';
const Header = () => {
    const {user,logout} = useAuth();
    const [scroll,setScroll] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY);
        }
        window.addEventListener('scroll',handleScroll)        
    },[scroll]);

    const handleLogout = async () => {
        await logout();
    }

    return (
        <div  className='h-32'>
            <div id='header' className={`flex justify-between items-center px-12 py-8 fixed w-full z-50 ${scroll > 150 ? 'bg-white text-black shadow-lg' : 'text-black bg-transparent'}`}>
                <Link to='/'>
                <img src={logo} alt="" className='w-[193px] h-[40px] cursor-pointer'/>
                </Link>
                <div className='flex items-center gap-10'>
                    <NavLink to='https://www.youtube.com/watch?v=PFkzyLHiEPw&embeds_referring_euri=https%3A%2F%2Fworkscout.in%2F&source_ve_path=Mjg2NjQsMjg2NjY&feature=emb_logo'>
                        Watch Demo
                    </NavLink>
                    {
                        user && 
                        <NavLink to='/dashboard'>
                            Dashboard
                        </NavLink>
                    }
                    {
                        user && 
                        <NavLink to='/dashboard'>
                            Available Coin
                        </NavLink>
                    }
                    {
                        user && 
                        <NavLink to='/dashboard'>
                            Profile
                        </NavLink>
                    }
                </div>
                <div>
                    {
                        !user && <> <NavLink to='/login' className="hover:text-[rgb(38,174,97)] flex items-center gap-3 font-base font-medium">
                        <FaUnlock></FaUnlock>
                        Login
                    </NavLink>
                    <NavLink to='/register' className="hover:text-[rgb(38,174,97)] flex items-center gap-3 font-base font-medium">
                        <FaCirclePlus />
                        Register
                    </NavLink> </>
                    }
                    {
                        user && 
                        <p onClick={handleLogout} className='cursor-pointer'>
                            Logout
                        </p>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Header;