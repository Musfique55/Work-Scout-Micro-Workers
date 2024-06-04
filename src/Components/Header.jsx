import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaUnlock } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import useUserInfo from '../Hooks/useUserInfo';
import { Player } from '@lottiefiles/react-lottie-player';
const Header = () => {
    const {userInfo} = useUserInfo();
    const [findUser,setFindUser] = useState(true);
    const {user,logout} = useAuth();
    const [scroll,setScroll] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY);
        }
        window.addEventListener('scroll',handleScroll);      
    },[scroll]);

    const loader =
    <Player
    autoplay
    loop
    src="https://lottie.host/47e12094-cada-45be-b9f0-47a35c570531/Xz6EddocLm.json"
    style={{ height: '300px', width: '300px', marginLeft : 'auto',marginRight : 'auto'}}
    >
    </Player>
    
    useEffect(() => {
        if(userInfo){
            setFindUser(false);
        }else{
            setFindUser(true);
        }
    },[userInfo])

    if(findUser){
        return loader;
    }

    const handleLogout = async () => {
        await logout();
    }

    return (
        <div className='h-32'>
            <div id='header' className={`navbar p-0 flex justify-between items-center px-12 py-8  fixed w-full z-50 ${scroll > 150 ? 'bg-white text-black shadow-lg' : 'text-black bg-transparent'}`}>
        <div className="flex gap-6 flex-1  lg:flex-none lg:justify-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost pl-0 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3  p-2 shadow bg-base-100 rounded-box w-52 z-50"
            >
             <NavLink to='https://www.youtube.com/watch?v=PFkzyLHiEPw&embeds_referring_euri=https%3A%2F%2Fworkscout.in%2F&source_ve_path=Mjg2NjQsMjg2NjY&feature=emb_logo'>
                Watch Demo
            </NavLink>
            {
                (user && userInfo.role === 'worker') &&
                <NavLink to={`/dashboard/worker-home`}>
                    Dashboard
                </NavLink>
                
            }
            {
                (user && userInfo.role === 'taskCreator') &&
                <NavLink to={`/dashboard/manager-home`}>
                    Dashboard
                </NavLink>
                
            }
            {
                user && 
                <p>
                    Available Coin(<span className='text-red-500'>{userInfo.coins}</span>)
                </p> 
            }
            {
                user && 
                <NavLink to=''>
                    Profile
                </NavLink>
            }
            </ul>
          </div>        
            <Link to='/'>
              <img src={logo} alt="" className='w-[193px] h-[40px] cursor-pointer'/>
            </Link>
        </div>


        <div className=" hidden  lg:flex lg:flex-1 lg:justify-center lg:items-center">
          <ul className="flex items-center justify-center flex-1 gap-4 text-base menu menu-horizontal px-1">
            <NavLink to='https://www.youtube.com/watch?v=PFkzyLHiEPw&embeds_referring_euri=https%3A%2F%2Fworkscout.in%2F&source_ve_path=Mjg2NjQsMjg2NjY&feature=emb_logo'>
                Watch Demo
            </NavLink>
            {
                (user && userInfo.role === 'worker') &&
                <NavLink to={`/dashboard/worker-home`}>
                    Dashboard
                </NavLink>
            }
            {
                (user && userInfo.role === 'taskCreator') &&
                <NavLink to={`/dashboard/manager-home`}>
                    Dashboard
                </NavLink>
            }
            {
                user && 
                <p>
                    Available Coin(<span className='text-red-500'>{userInfo.coins}</span>)
                </p> 
            }
            {
                user && 
                <NavLink to='/dashboard'>
                    Profile
                </NavLink>
            }
            
          </ul>     
        </div>
        {user ? (
          <div className="hidden md:flex lg:flex gap-3 items-center">
            <div className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} />
              </div>
            </div>
            <p className="text-black">{user?.displayName}</p>
            <i
              onClick={handleLogout}
              className="fa-solid fa-right-from-bracket text-2xl cursor-pointer"
              style={{ color: "black" }}
            ></i>
          </div>
        ) : (
          
            <div className='flex items-center gap-3'> 
                <NavLink to='/login' className="hover:text-[rgb(38,174,97)] flex items-center gap-3 font-base font-medium">
                    <FaUnlock></FaUnlock>
                    Login
                </NavLink>
                <NavLink to='/register' className="hover:text-[rgb(38,174,97)] flex items-center gap-3 font-base font-medium">
                    <FaCirclePlus />
                    Register
                </NavLink> 
            </div>
            
        )}
      </div>
        </div>
    );
};

export default Header;