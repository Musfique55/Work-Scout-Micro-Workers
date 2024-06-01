import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaUnlock } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
const Header = () => {
    const [scroll,setScroll] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY);
        }
        window.addEventListener('scroll',handleScroll)        
    },[scroll]);
    console.log(scroll);
    return (
        <div  className=''>
            <div id='header' className={`flex justify-between items-center px-12 py-8 fixed w-full z-50 ${scroll > 150 ? 'bg-white text-black shadow-lg' : 'text-black bg-transparent'}`}>
                <Link to='/'>
                <img src={logo} alt="" className='w-[193px] h-[40px] cursor-pointer'/>
                </Link>
                <div className='flex items-center'>
                    <NavLink to='https://www.youtube.com/watch?v=PFkzyLHiEPw&embeds_referring_euri=https%3A%2F%2Fworkscout.in%2F&source_ve_path=Mjg2NjQsMjg2NjY&feature=emb_logo'>
                        Watch Demo
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/login' className="hover:text-[rgb(38,174,97)]  font-base font-medium">
                        <FaUnlock></FaUnlock>
                        Login
                    </NavLink>
                    <NavLink to='/register' className="hover:text-[rgb(38,174,97)]  font-base font-medium">
                        <FaCirclePlus />
                        Register
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Header;