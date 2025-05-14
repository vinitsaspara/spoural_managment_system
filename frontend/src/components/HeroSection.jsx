import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import Swiper styles
import 'swiper/css';

const sportsImages = [
  {
    url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    title: 'Sports Excellence',
    description: 'Experience the thrill of competition'
  },
  {
    url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Team Spirit',
    description: 'Unite, compete, and triumph together'
  },
  {
    url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Championship Glory',
    description: 'Pursue excellence in every game'
  },
  {
    url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Sportsmanship',
    description: 'Fair play, respect, and honor'
  }
];

function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className="h-full"
      >
        {sportsImages.map((slide, index) => (
          <SwiperSlide key={index}>
            <div 
              className="relative h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.url}')` }}
            >
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in-delayed">
                      {slide.description}
                    </p>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 px-8 animate-fade-in-up"
                      onClick={() => navigate('/games')}
                    >
                      Register Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom styles for the slider */}
      <style jsx global>{`
        .swiper {
          width: 100%;
          height: 100%;
        }

        .swiper-slide {
          width: 100%;
          height: 100%;
        }

        .swiper-pagination {
          position: absolute;
          bottom: 20px !important;
          z-index: 10;
        }

        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: white;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #3b82f6;
          transform: scale(1.2);
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          background: rgba(0, 0, 0, 0.3);
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 24px !important;
          font-weight: bold;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(0, 0, 0, 0.5);
          transform: scale(1.1);
        }

        .swiper-button-next {
          right: 20px !important;
        }

        .swiper-button-prev {
          left: 20px !important;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-fade-in-delayed {
          animation: fadeIn 1s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out 0.6s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

export default HeroSection
