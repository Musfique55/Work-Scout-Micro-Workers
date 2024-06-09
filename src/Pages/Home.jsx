import slide1 from '../assets/file.png';
import slide2 from '../assets/file-1.png';
import slide3 from '../assets/file-2.png';
import slide4 from '../assets/file-4.png';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Features from '../Components/Features';
import HowitWorks from '../Components/HowitWorks';
import Teestimonials from '../Components/Teestimonials';
import TopEarners from '../Components/TopEarners';
import { Autoplay, EffectFade } from 'swiper/modules';
import { FaSearch } from 'react-icons/fa';
const Home = () => {

    return (
        <div>
           <div className='mb-12'>
           
           <Swiper
                style={{'height' : '600px', "width" : '100%',}}
                spaceBetween={30}
                effect={'fade'}
                loop = {true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                modules={[EffectFade,Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide className='slider bg-[#0B4127] relative'>
                    <img src={slide1} className='block h-[500px] absolute bottom-0 right-0 object-cover'/>
                </SwiperSlide>
                <SwiperSlide className='slider bg-[#AA495D] relative'>
                <img src={slide2} className='block h-[500px]  absolute bottom-0 right-0 object-cover'/>
                </SwiperSlide>
                <SwiperSlide className='slider bg-[#5E1528] relative'>
                <img src={slide3} className='block h-[400px]  absolute bottom-0 right-0 object-cover'/>
                </SwiperSlide>
                <SwiperSlide className='slider relative bg-[#AE3905]'>
                    
                    <img src={slide4} className='block h-[450px] absolute bottom-0 right-0 object-cover'/>
                </SwiperSlide>
            </Swiper>
           </div>
           <div className='relative z-20 m-5 lg:ml-12'>
                <div className='absolute -top-96'>
                <h3 className='text-4xl text-white mb-5'>Make Bright Ideas Happen</h3>
                <h3 className='text-2xl text-white opacity-[0.7] mb-5'>Collaborate with top experts affordably!</h3>
                <p className='bg-[rgba(255,255,255,.07)] w-fit p-2 rounded-xl mb-5'><span className='text-white opacity-100'>What are you looking for</span></p>
                <form className=' flex items-center'>
                    <input type="text" placeholder='Search for services...' className='w-full lg:w-[500px] rounded-l-xl p-4 focus:outline-none'/>
                    <button className='bg-green-500 p-5 text-white rounded-r-xl'><FaSearch></FaSearch></button>
                </form>  
                </div>     
            </div>

           {/* Feature section */}
           <Features></Features>

           {/* How it works */}
           <HowitWorks></HowitWorks>

           {/* top earners */}
           <TopEarners></TopEarners>

           {/* testimonial */}
           <Teestimonials></Teestimonials>
        </div>
    );
};

export default Home;