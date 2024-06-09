// import slide1 from '../assets/scarlett-2x.jpg';
// import slide2 from '../assets/jordan-2x.jpg';
// import slide3 from '../assets/colin-2x.jpg';
// import slide4 from '../assets/christina-2x.jpg';
// import slide5 from '../assets/jenny-2x.jpg';
// import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Features from '../Components/Features';
import HowitWorks from '../Components/HowitWorks';
import Teestimonials from '../Components/Teestimonials';
import TopEarners from '../Components/TopEarners';
// import { EffectFade, Navigation, Pagination } from 'swiper/modules';
const Home = () => {

    return (
        <div>
           {/* <>
           <Swiper
                style={{'height' : '600px', "width" : '100%'}}
                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                pagination={{
                clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide className='slider'>
                <img src={slide1} className='w-full'/>
                </SwiperSlide>
                <SwiperSlide className='slider'>
                <img src={slide2} className='w-full'/>
                </SwiperSlide>
                <SwiperSlide className='slider'>
                <img src={slide3} className='w-full'/>
                </SwiperSlide>
                <SwiperSlide className='slider'>
                <img src={slide4} className='w-full'/>
                </SwiperSlide>
                <SwiperSlide className='slider'>
                <img src={slide5} className='w-full'/>
                </SwiperSlide>
            </Swiper>
           </> */}

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