import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { Link } from "react-router";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import logo1 from "../../assets/images/img-1.avif";
import logo2 from "../../assets/images/img-2.avif";
import logo3 from "../../assets/images/img-3.avif";
import logo4 from "../../assets/images/img-4.avif";
import logo5 from "../../assets/images/img-5.avif";
import logo6 from "../../assets/images/img-6.avif";
import Container from "../../components/Shared/Container";

const HomeSlide = () => {
  const slides = [
    { img: logo1, title: "World's Best Classics", subtitle: "Timeless stories delivered to you." },
    { img: logo2, title: "New Arrivals 2026", subtitle: "Explore the latest bestsellers today." },
    { img: logo3, title: "Academic Essentials", subtitle: "Boost your knowledge." },
    { img: logo4, title: "Fiction & Fantasy", subtitle: "Escape into a world of imagination." },
    { img: logo5, title: "Self-Improvement", subtitle: "Master your mind and your life." },
    { img: logo6, title: "Safe Delivery", subtitle: "Handled with care, just for you." },
  ];

  return (
    <Container>
      <section className="py-6 px-4">
        <div className="relative overflow-hidden rounded-2xl md:rounded-[2rem] shadow-xl border border-white/10">
          <Swiper
            effect={"fade"}
            speed={1000}
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            className="mySwiper h-[320px] sm:h-[400px] lg:h-[450px] w-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className="relative group">
                {/* Background Image */}
                <img
                  src={slide.img}
                  className="w-full h-full object-cover object-center"
                  alt={slide.title}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-12">
                  <div className="max-w-2xl">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-gray-200 text-sm md:text-lg mb-6 font-light">
                      {slide.subtitle}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <Link
                        to="/all-book"
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all shadow-lg active:scale-95"
                      >
                        Shop Now
                      </Link>
                      <button className="hidden sm:block border border-white/50 hover:bg-white/10 text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-sm md:text-base font-semibold backdrop-blur-sm transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </Container>
  );
};

export default HomeSlide;
