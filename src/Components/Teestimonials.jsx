import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
// import required modules
import {Navigation } from 'swiper/modules';
import slide1 from '../assets/4002892-e1700652027624.jpg';
import slide2 from '../assets/blog-post-03-498x315.jpg';
import slide3 from '../assets/linkedin-sales-solutions-pAtA8xe_iVM-unsplash-e1700651692628-200x200.jpg';
import slide4 from '../assets/man-office-scaled-e1700653116534-590x590.jpg';
import slide5 from '../assets/pexels-andrea-piacquadio-3769021-scaled-200x200.jpg';
import slide6 from '../assets/Untitled-13.png';
import ReactStars from "react-rating-stars-component";


const Teestimonials = () => {
   
    return (
    <div>
        <h3 className='text-center text-4xl font-medium mt-12'>Dont Take Our For it. <br /> Over 100+ People Trust Us.</h3>
            <Swiper
            style={{"--swiper-navigation-size": "25px",padding : '80px 50px'}}
       
        navigation={true}
        spaceBetween={10}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView:2,
            spaceBetween: 20,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className='flex flex-col !h-[34rem] border-2 bg-[#f6faff] p-10 rounded-3xl lg:flex-row lg:!h-fit'>
                <div>
                    <p>The platform has revolutionized the way we manage projects. Its intuitive interface and powerful features have streamlined our workflow, leading to increased productivity and efficiency. I highly recommend it to anyone looking to take their project management to the next level.</p>
                </div>
                <div className="flex flex-col  mt-6  justify-between  lg:flex-row lg:mt-3">
                    <div className='flex gap-3'>
                            <img src={slide1} alt="" className='w-14 block h-14 rounded-full'/>
                        <div>
                            <p>Jane Smith</p>
                            <p>Marketing Manager</p>
                        </div>
                    </div>
                    {/* rating */}
                    <ReactStars
                        value={5}
                        edit={false}
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                    />
                </div>
        </SwiperSlide>
        <SwiperSlide className='flex flex-col !h-[34rem] border-2 space-y-3 bg-[#f6faff] p-10 rounded-3xl lg:flex-row lg:!h-fit'>
                <div>
                    <p>I have been blown away by the capabilities of this platform. From task management to team collaboration, it offers everything we need to stay organized and on track. It is not often that a tool exceeds expectations, but this one certainly does. Our team could not be happier with the results.</p>
                </div>
                <div className="flex flex-col  space-y-3  justify-between lg:flex-row lg:mt-5">
                    <div className='flex gap-3'>
                    <img src={slide2} alt="" className='w-14 h-14 rounded-full object-cover'/>
                    <div>
                        <p>John Doe</p>
                        <p>Product Manager</p>
                    </div>
                    </div>
                    {/* rating */}
                    <ReactStars
                        value={5}
                        edit={false}
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                    />
                </div>
        </SwiperSlide>
        <SwiperSlide className='flex flex-col !h-[34rem] border-2 space-y-3 bg-[#f6faff] p-10 rounded-3xl lg:flex-row lg:!h-fit'>
                <div>
                    <p>As someone who is always looking for ways to improve efficiency, I can confidently say that this platform delivers. Its robust set of features, combined with its user-friendly interface, make it a must-have for any organization serious about maximizing productivity. They helped usss very much.</p>
                </div>
                <div className="flex flex-col  space-y-3  justify-between lg:flex-row lg:mt-5">
                    <div className='flex gap-3'>
                    <img src={slide3} alt="" className='w-14 h-14 rounded-full'/>
                    <div>
                        <p>Michael Johnson</p>
                        <p>CEO, Tech Co.</p>
                    </div>
                    </div>
                    {/* rating */}
                    <ReactStars
                        value={5}
                        edit={false}
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                    />
                </div>
        </SwiperSlide>
        <SwiperSlide className='flex flex-col !h-[34rem] border-2 space-y-3 bg-[#f6faff] p-10 rounded-3xl lg:flex-row lg:!h-fit'>
                <div>
                    <p>I have tried many project management tools in the past, but none have come close to this one. Its flexibility and customization options allow me to tailor it to my specific needs, whether I am working solo or collaborating with a team. Plus, the support team is top-notch.</p>
                </div>
                <div className="flex flex-col  space-y-3  justify-between lg:flex-row lg:mt-5">
                    <div className='flex gap-3'>
                    <img src={slide4} alt="" className='w-14 h-14 rounded-full'/>
                    <div>
                        <p>Emily Brown</p>
                        <p>Freelance Designer</p>
                    </div>
                    </div>
                    {/* rating */}
                    <ReactStars
                        value={5}
                        edit={false}
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                    />
                </div>
        </SwiperSlide>
        <SwiperSlide className='flex flex-col !h-[34rem] border-2 bg-[#f6faff] p-10 rounded-3xl lg:flex-row lg:!h-fit'>
                <div>
                    <p>From its seamless integration with our existing tools to its comprehensive reporting features, this platform has exceeded our expectations in every way. It is rare to find a tool that not only meets but surpasses all our requirements. It is become an indispensable part of our workflow.</p>
                </div>
                <div className="flex flex-col mt-12  justify-between lg:flex-row lg:mt-3">
                    <div className='flex gap-3'>
                    <img src={slide5} alt="" className='w-14 h-14 rounded-full'/>
                    <div>
                        <p>Alex Martinez</p>
                        <p>Software Engineer</p>
                    </div>
                    </div>
                    {/* rating */}
                    <ReactStars
                        value={5}
                        edit={false}
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                    />
                </div>
        </SwiperSlide>
        <SwiperSlide className='flex space-y-3 !h-[34rem] border-2 bg-[#f6faff] p-10 rounded-3xl lg:!h-fit'>
                <div>
                    <p>This platform has been a game-changer for me. Its user-friendly interface makes it easy to stay organized and on top of my tasks, while its robust set of features ensures that nothing falls through the cracks. Plus, the ability to access it from anywhere has greatly increased my flexibility.</p>
                </div>
                <div className="flex flex-col  space-y-3  justify-between lg:flex-row lg:mt-5">
                    <div className='flex gap-3'>
                    <img src={slide6} alt="" className='w-14 h-14 rounded-full'/>
                    <div>
                        <p>Sophia Lee</p>
                        <p>Content Creator</p>
                    </div>
                    </div>
                    {/* rating */}
                    <ReactStars
                        value={5}
                        edit={false}
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                    />
                </div>
        </SwiperSlide>
        
      </Swiper>
    </div>
    );
};

export default Teestimonials;