import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
const Footer = () => {
    const axiosPublic = useAxiosPublic();
    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        axiosPublic.post('/subscribers',{email})
        .then(res => {
            if(res.data.insertedId){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You have subscribed successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  e.target.reset();
            }
        })
    }
    return (
        <div className='bg-[#E5D5FA] mt-12 rounded-t-[50px]'>
            <div className="flex px-12 justify-between pt-12">
                <div>
                    <h3 className="text-3xl font-semibold text-[#623f8f]">Join Our Newsletter</h3>
                    <p className="font-medium text-lg text-[#623f8f]">We Will send you a nice letter no spam</p>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name='email' placeholder="Enter Your Email" className=" w-[300px] py-3 px-4 rounded-full bg-[#E5D5FA] border-2 border-[#623f8f] focus:outline-none placeholder:text-[#623f8f] placeholder:font-semibold"/>
                        <button type='submit' className="font-medium text-lg text-white -ml-10 py-3 px-4 rounded-full bg-[#623f8f]">Subscribe</button>
                    </form>
                </div>
            </div>
            <footer className=" p-12 text-base-content">
                <div className='grid grid-cols-2 gap-10 lg:grid-cols-4'>
                    <aside className="items-center mr-10">
                        <img src={logo} alt="" className=' h-12'/>
                    </aside> 
                    <nav className='flex flex-col'>
                        <h6 className="footer-title">Services</h6> 
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav> 
                    <nav className='flex flex-col'>
                        <h6 className="footer-title">Company</h6> 
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </nav> 
                    <nav className='flex flex-col'>
                        <h6 className="footer-title">Legal</h6> 
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                </div>
                <div className="flex justify-between mt-10">
                    <p className='font-medium'>All Rights Reserved 2024</p>
                    <div className="flex gap-6 text-3xl text-[#623F8F]">
                        <Link  target='_blank' to="https://www.facebook.com/musfique.patwaryy">
                            <FaFacebook></FaFacebook>
                        </Link>
                        <Link target='_blank' to="https://www.linkedin.com/in/sadnamshuvo">
                            <FaLinkedin></FaLinkedin>
                        </Link>
                        <Link target='_blank' to="https://github.com/Musfique55">
                            <FaGithub></FaGithub>
                        </Link>
                    </div>
                </div>
            </footer> 
            
        </div>
    );
};

export default Footer;