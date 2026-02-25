import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { Link } from "react-router"; // or react-router-dom

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// Assets
import logo1 from "../../assets/images/img-1.avif";
import logo2 from "../../assets/images/img-2.avif";
import logo3 from "../../assets/images/img-3.avif";
import logo4 from "../../assets/images/img-4.avif";
import logo5 from "../../assets/images/img-5.avif";
import logo6 from "../../assets/images/img-6.avif";
import Container from "../../components/Shared/Container";

const Slider = () => {
  const slides = [
    { img: logo1, title: "World's Best Classics", subtitle: "Timeless stories delivered to you." },
    { img: logo2, title: "New Arrivals 2026", subtitle: "Explore the latest bestsellers today." },
    {
      img: logo3,
      title: "Academic Essentials",
      subtitle: "Boost your knowledge with our collection.",
    },
    { img: logo4, title: "Fiction & Fantasy", subtitle: "Escape into a world of imagination." },
    { img: logo5, title: "Self-Improvement", subtitle: "Master your mind and your life." },
    { img: logo6, title: "Safe Delivery", subtitle: "Handled with care, just for you." },
  ];

  return (
    <Container>
      <section className="py-6 px-4">
        <div>
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl border border-white/10">
            <Swiper
              effect={"fade"}
              speed={1000}
              spaceBetween={0}
              centeredSlides={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation, EffectFade]}
              className="mySwiper h-[400px] md:h-[550px]"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index} className="relative group">
                  {/* Background Image */}
                  <img src={slide.img} className="w-full h-full object-cover" alt="Book Banner" />

                  {/* Modern Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-16">
                    {/* Content with Animation */}
                    <div className="max-w-2xl transform transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                      <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        {slide.title}
                      </h2>
                      <p className="text-gray-200 text-lg md:text-xl mb-8 font-light italic">
                        {slide.subtitle}
                      </p>

                      {/* Professional Button */}
                      <div className="flex gap-4">
                        <Link
                          to="/all-book"
                          className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-green-500/30 active:scale-95"
                        >
                          Shop Now
                        </Link>
                        <button className="hidden md:block border border-white/50 hover:bg-white/10 text-white px-8 py-3 rounded-full font-bold backdrop-blur-sm transition-all">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Slider;
