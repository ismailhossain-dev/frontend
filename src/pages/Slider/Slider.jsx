import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import logo1 from "../../assets/images/img-1.avif";
import logo2 from "../../assets/images/img-2.avif";
import logo3 from "../../assets/images/img-3.avif";
import logo4 from "../../assets/images/img-4.avif";
import logo5 from "../../assets/images/img-5.avif";
import logo6 from "../../assets/images/img-6.avif";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Container from "../../components/Shared/Container";

const Slider = () => {
  return (
    <div className=" bg-linear-65 from-purple-500 to-pink-500 p-6 rounded-md  ">
      <Container>
        <div className="flex flex-col-reverse justify-center items-center gap-8 md:flex-row lg:flex-row  ">
          <div className="flex-1">
            <h2 className="text-3xl font-semibold my-2 text-blue-900">
              Your Favorite Books, Delivered to Your Doorstep
            </h2>
            <p className="text-white ">
              Discover a massive collection of books from bestselling authors, trusted publishers,
              and rising writers from around the world. Whether you love fiction, non-fiction, or
              academic reads, we ensure fast delivery, safe packaging, and a seamless online
              experience tailored for true book lovers.
            </p>
          </div>
          <div className="w-100">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img src={logo1} className=" w-120 h-115 rounded-3xl" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={logo2} className="w-120 h-115 rounded-3xl" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={logo3} className="w-120 h-115 rounded-3xl" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={logo4} className=" w-120 h-115 rounded-3xl " alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={logo5} className="w-120 h-115" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={logo6} className="w-120 h-115 rounded-3xl" alt="" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Slider;
