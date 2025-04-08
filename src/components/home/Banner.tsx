import { useState, useRef, useEffect, TouchEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaPercent, FaGift, FaTag } from 'react-icons/fa';

interface HeroSlide {
  id: number;
  type: 'main' | 'promo';
  title: string;
  description: string;
  bgColor?: string;
  icon?: React.ReactNode;
  buttons: {
    text: string;
    link: string;
    primary: boolean;
  }[];
}

interface BannerProps {
  isVisible: boolean;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    type: 'main',
    title: 'Học Lập Trình <span class="text-yellow-300">Thú Vị</span>',
    description: 'Khám phá tiềm năng của bạn với các khóa học lập trình tương tác được thiết kế cho mọi trình độ. Bắt đầu hành trình trở thành lập trình viên chuyên nghiệp ngay hôm nay!',
    buttons: [
      {
        text: 'Khám Phá Khóa Học',
        link: '/courses',
        primary: true
      },
      {
        text: 'Liên Hệ Chúng Tôi',
        link: '/contact',
        primary: false
      }
    ]
  },
  {
    id: 2,
    type: 'promo',
    title: 'Chốt liền tay nhận ngay ưu đãi',
    description: 'Giảm ngay 5% cho học viên đăng ký và hoàn thành học phí sớm.',
    bgColor: 'from-blue-500 to-indigo-600',
    icon: <FaPercent className="text-white text-4xl" />,
    buttons: [
      {
        text: 'Đăng Ký Ngay',
        link: '/contact',
        primary: true
      }
    ]
  },
  {
    id: 3,
    type: 'promo',
    title: 'Định hướng rõ ràng, càng nhiều ưu đãi',
    description: 'Giảm ngay 5% cho học viên đăng ký theo học trọn gói lộ trình các lớp Android, iOS, Backend. Nhanh tay để nhận ngay ưu đãi',
    bgColor: 'from-green-500 to-teal-600',
    icon: <FaGift className="text-white text-4xl" />,
    buttons: [
      {
        text: 'Đăng ký ngay',
        link: '/contact',
        primary: true
      }
    ]
  },
  {
    id: 4,
    type: 'promo',
    title: 'Đôi bạn cùng tiến',
    description: 'Nhận ưu đãi lên đến 1.500.000 VNĐ khi giới thiệu bạn bè theo học khoá bất kỳ tại trung tâm',
    bgColor: 'from-yellow-500 to-orange-600',
    icon: <FaTag className="text-white text-4xl" />,
    buttons: [
      {
        text: 'Liên hệ ngay',
        link: '/contact',
        primary: true
      }
    ]
  }
];

const Banner = ({ isVisible }: BannerProps) => {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isHeroAnimating, setIsHeroAnimating] = useState(false);
  const [autoSlideEnabled, setAutoSlideEnabled] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [codeText, setCodeText] = useState('');
  const fullCodeText = 'function learnToCode() {\n  const skills = [];\n  const dedication = true;\n  \n  while (dedication) {\n    skills.push(newSkill());\n    improve(skills);\n  }\n  \n  return success;\n}';
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoSlideTimeoutRef = useRef<number | null>(null);
  const typingSpeedRef = useRef(20);
  const typingIndexRef = useRef(0);
  const typingAnimationRef = useRef<number | null>(null);
  const bannerRef = useRef<HTMLElement>(null);

  // Typing effect
  useEffect(() => {
    const startTime = performance.now();
    let lastUpdateTime = startTime;
    
    const animateTyping = (timestamp: number) => {
      const elapsed = timestamp - lastUpdateTime;
      
      if (elapsed > typingSpeedRef.current) {
        lastUpdateTime = timestamp - (elapsed % typingSpeedRef.current);
        
        if (typingIndexRef.current <= fullCodeText.length) {
          setCodeText(fullCodeText.substring(0, typingIndexRef.current));
          typingIndexRef.current++;
        }
      }
      
      if (typingIndexRef.current <= fullCodeText.length) {
        typingAnimationRef.current = requestAnimationFrame(animateTyping);
      }
    };
    
    typingAnimationRef.current = requestAnimationFrame(animateTyping);
    
    return () => {
      if (typingAnimationRef.current) {
        cancelAnimationFrame(typingAnimationRef.current);
      }
    };
  }, []);

  // Auto slide functionality
  const scheduleNextSlide = useCallback(() => {
    if (autoSlideTimeoutRef.current) {
      clearTimeout(autoSlideTimeoutRef.current);
      autoSlideTimeoutRef.current = null;
    }
    
    if (autoSlideEnabled) {
      autoSlideTimeoutRef.current = window.setTimeout(() => {
        if (!isHeroAnimating) {
          setIsHeroAnimating(true);
          setCurrentHeroSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
          setTimeout(() => {
            setIsHeroAnimating(false);
            scheduleNextSlide();
          }, 700);
        }
      }, 10000);
    }
  }, [autoSlideEnabled, isHeroAnimating]);

  useEffect(() => {
    if (autoSlideEnabled) {
      scheduleNextSlide();
    }
    
    return () => {
      if (autoSlideTimeoutRef.current) {
        clearTimeout(autoSlideTimeoutRef.current);
      }
    };
  }, [scheduleNextSlide, autoSlideEnabled]);

  const handleUserInteraction = () => {
    setAutoSlideEnabled(false);
    if (autoSlideTimeoutRef.current) {
      clearTimeout(autoSlideTimeoutRef.current);
      autoSlideTimeoutRef.current = null;
    }
  };

  // Touch handlers
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    handleUserInteraction();
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && !isHeroAnimating) {
      nextHeroSlide();
    } else if (isRightSwipe && !isHeroAnimating) {
      prevHeroSlide();
    }
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    handleUserInteraction();
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grabbing';
      sliderRef.current.style.transition = 'none';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
    
    const diff = e.clientX - startX;
    
    if (sliderRef.current) {
      const baseTransform = -currentHeroSlide * 100;
      const dragPercent = (diff / sliderRef.current.offsetWidth) * 100;
      sliderRef.current.style.transform = `translateX(${baseTransform + dragPercent}%)`;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    if (sliderRef.current) {
      sliderRef.current.style.transition = 'transform 700ms ease-in-out';
      sliderRef.current.style.cursor = 'grab';
    }
    
    const distance = startX - currentX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && !isHeroAnimating) {
      nextHeroSlide();
    } else if (isRightSwipe && !isHeroAnimating) {
      prevHeroSlide();
    } else {
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(-${currentHeroSlide * 100}%)`;
      }
    }
    
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      if (sliderRef.current) {
        sliderRef.current.style.transition = 'transform 700ms ease-in-out';
        sliderRef.current.style.transform = `translateX(-${currentHeroSlide * 100}%)`;
        sliderRef.current.style.cursor = 'grab';
      }
      
      setIsDragging(false);
    }
  };

  const nextHeroSlide = () => {
    if (!isHeroAnimating) {
      handleUserInteraction();
      setIsHeroAnimating(true);
      
      if (sliderRef.current) {
        sliderRef.current.style.transition = 'transform 700ms ease-in-out';
      }
      
      setCurrentHeroSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsHeroAnimating(false), 700);
    }
  };

  const prevHeroSlide = () => {
    if (!isHeroAnimating) {
      handleUserInteraction();
      setIsHeroAnimating(true);
      
      if (sliderRef.current) {
        sliderRef.current.style.transition = 'transform 700ms ease-in-out';
      }
      
      setCurrentHeroSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
      setTimeout(() => setIsHeroAnimating(false), 700);
    }
  };

  return (
    <section 
      ref={bannerRef}
      id="banner"
      className={`relative overflow-hidden mt-6 ${
        isVisible ? 'animate-fade-in' : 'opacity-0'
      }`}
    >
      <div 
        className="relative w-full transition-all duration-700 ease-in-out slider-container"
        style={{ height: '700px' }}
      >
        {/* <button 
          onClick={prevHeroSlide}
          className="absolute left-4 top-1/2 z-20 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-3 text-white transition-all duration-300 transform hover:scale-110 focus:outline-none -translate-y-1/2"
          aria-label="Previous slide"
        >
          <FaChevronLeft size={24} />
        </button>
        
        <button 
          onClick={nextHeroSlide}
          className="absolute right-4 top-1/2 z-20 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-3 text-white transition-all duration-300 transform hover:scale-110 focus:outline-none -translate-y-1/2"
          aria-label="Next slide"
        >
          <FaChevronRight size={24} />
        </button> */}

        <div 
          ref={sliderRef}
          className="flex h-full transition-transform duration-700 ease-in-out select-none cursor-grab slider-slide"
          style={{ transform: `translateX(-${currentHeroSlide * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {heroSlides.map((slide) => (
            <div 
              key={slide.id} 
              className={`w-full flex-shrink-0 ${
                slide.type === 'main' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-800' 
                  : `bg-gradient-to-r ${slide.bgColor}`
              } text-white py-20 relative overflow-hidden select-none slider-slide`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-white rounded-full opacity-20 floating"></div>
                <div className="absolute top-40 -right-20 w-60 h-60 bg-white rounded-full opacity-20 floating stagger-2"></div>
                <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-white rounded-full opacity-20 floating stagger-3"></div>
              </div>
              
              <div className="container mx-auto px-4 relative z-10 h-full flex items-center select-none slider-content">
                {slide.type === 'main' ? (
                  <div className="flex flex-col md:flex-row items-center select-none">
                    <div className={`md:w-1/2 mb-10 md:mb-0 transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ willChange: 'opacity' }}>
                      <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 select-none" dangerouslySetInnerHTML={{ __html: slide.title }}></h1>
                      <p className="text-xl mb-8 transition-all duration-1000 delay-300 ease-in-out select-none" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-20px)', willChange: 'opacity, transform' }}>
                        {slide.description}
                      </p>
                      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-1000 delay-500 ease-in-out select-none" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-20px)', willChange: 'opacity, transform' }}>
                        {slide.buttons.map((button, btnIndex) => (
                          <Link
                            key={btnIndex}
                            to={button.link}
                            className={`select-none ${button.primary 
                              ? "bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition duration-300 text-center transform hover:scale-105"
                              : "bg-transparent hover:bg-white hover:text-blue-700 text-white font-bold py-3 px-6 border-2 border-white rounded-lg transition duration-300 text-center transform hover:scale-105"
                            }`}
                          >
                            {button.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className={`md:w-1/2 transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-20'}`} style={{ willChange: 'opacity, transform' }}>
                      <div className="bg-gray-900 rounded-lg shadow-2xl p-4 mx-auto max-w-md transition-transform duration-300 hover:rotate-1">
                        <div className="flex items-center mb-2">
                          <div className="flex space-x-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="ml-2 text-xs text-gray-400">code-fun.js</div>
                        </div>
                        <pre className="text-xs sm:text-sm text-green-400 font-mono overflow-x-auto">
                          <code>{codeText || ' '}</code>
                          <span 
                            className="inline-block w-0.5 h-4 bg-green-400 ml-0.5 align-middle"
                            style={{ 
                              opacity: codeText.length === fullCodeText.length ? 1 : 0,
                              animation: codeText.length === fullCodeText.length ? 'cursorBlink 1s ease-in-out infinite' : 'none',
                              willChange: 'opacity'
                            }}
                          ></span>
                        </pre>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row items-center justify-between w-full select-none">
                    <div className="md:w-1/6 flex justify-center mb-6 md:mb-0">
                      <div className="bg-white bg-opacity-20 p-6 rounded-full animate-pulse">
                        {slide.icon}
                      </div>
                    </div>
                    <div className="md:w-2/3 text-center md:text-left">
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 select-none">{slide.title}</h2>
                      <p className="text-xl mb-6 select-none">{slide.description}</p>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        {slide.buttons.map((button, btnIndex) => (
                          <Link
                            key={btnIndex}
                            to={button.link}
                            className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 select-none"
                          >
                            {button.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 left-0 right-0 z-20">
          <div className="flex justify-center">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isHeroAnimating) {
                    handleUserInteraction();
                    setIsHeroAnimating(true);
                    setCurrentHeroSlide(index);
                    setTimeout(() => setIsHeroAnimating(false), 700);
                  }
                }}
                className={`h-2 w-2 mx-1 rounded-full transition-all duration-300 ${
                  currentHeroSlide === index ? 'bg-white w-6' : 'bg-white bg-opacity-50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner; 