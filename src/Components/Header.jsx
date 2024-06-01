import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaLock } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
const Header = () => {
    return (
        <div >
            <div className='flex justify-between items-center px-12 py-8 fixed w-full z-50'>
                <Link to='/'>
                <img src={logo} alt="" className='w-[193px] h-[40px] cursor-pointer'/>
                </Link>
                <div className='flex items-center'>
                    <NavLink to='https://www.youtube.com/watch?v=PFkzyLHiEPw&embeds_referring_euri=https%3A%2F%2Fworkscout.in%2F&source_ve_path=Mjg2NjQsMjg2NjY&feature=emb_logo'>
                        Watch Demo
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/login' className="hover:text-[rgb(38,174,97)] text-white font-base font-medium">
                        <FaLock></FaLock>
                        Login
                    </NavLink>
                    <NavLink to='/register' className="hover:text-[rgb(38,174,97)] text-white font-base font-medium">
                        <FaCirclePlus />
                        Register
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Header;