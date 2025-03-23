import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaTag, FaGift, FaPercent } from 'react-icons/fa';

interface PromotionSlide {
  id: number;
  title: string;
  description: string;
  bgColor: string;
  icon: JSX.Element;
}

const PromotionBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const promotions: PromotionSlide[] = [
    {
      id: 1,
      title: "Giảm giá 50% cho khóa học React",
      description: "Đăng ký ngay hôm nay để nhận ưu đãi đặc biệt cho khóa học React nâng cao",
      bgColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
      icon: <FaPercent className="text-white text-xl" />
    },
    {
      id: 2,
      title: "Khóa học mới: Python cho AI",
      description: "Khám phá khóa học mới về Python và ứng dụng trong trí tuệ nhân tạo",
      bgColor: "bg-gradient-to-r from-green-500 to-teal-600",
      icon: <FaGift className="text-white text-xl" />
    },
    {
      id: 3,
      title: "Ưu đãi đặc biệt cho sinh viên",
      description: "Giảm 30% cho tất cả sinh viên khi đăng ký gói học 12 tháng",
      bgColor: "bg-gradient-to-r from-yellow-500 to-orange-600",
      icon: <FaTag className="text-white text-xl" />
    }
  ];

  // Generic function to handle slide transitions
  const changeSlide = (direction: 'next' | 'prev' | number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (typeof direction === 'number') {
      setCurrentSlide(direction);
    } else if (direction === 'next') {
      setCurrentSlide((prev) => (prev === promotions.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentSlide((prev) => (prev === 0 ? promotions.length - 1 : prev - 1));
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide('next');
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="relative overflow-hidden bg-gray-100 py-3">
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => changeSlide('prev')}
            className="absolute left-2 z-10 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 text-gray-800 transition-all duration-300 transform hover:scale-110 focus:outline-none"
            aria-label="Khuyến mãi trước"
          >
            <FaChevronLeft />
          </button>
          
          <div className="overflow-hidden w-full">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {promotions.map((promo) => (
                <div 
                  key={promo.id} 
                  className={`w-full flex-shrink-0 ${promo.bgColor} text-white py-2 px-4 rounded-lg shadow-md flex items-center justify-center`}
                >
                  <div className="flex items-center space-x-2 animate-pulse">
                    {promo.icon}
                    <span className="font-bold">Hot!</span>
                  </div>
                  <div className="mx-4 text-center">
                    <h3 className="font-bold">{promo.title}</h3>
                    <p className="text-sm">{promo.description}</p>
                  </div>
                  <button className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-1 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105">
                    Xem ngay
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => changeSlide('next')}
            className="absolute right-2 z-10 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 text-gray-800 transition-all duration-300 transform hover:scale-110 focus:outline-none"
            aria-label="Khuyến mãi tiếp theo"
          >
            <FaChevronRight />
          </button>
        </div>
        
        {/* Slide indicators */}
        <div className="flex justify-center mt-2">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => changeSlide(index)}
              className={`h-2 w-2 mx-1 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-blue-600 w-4' : 'bg-gray-400'
              }`}
              aria-label={`Đến slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionBanner; 