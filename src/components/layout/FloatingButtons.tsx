import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { SiZalo, SiMessenger } from 'react-icons/si';

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col space-y-5 floating-buttons-container">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`p-4 rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:bg-primary-dark hover:scale-110 focus:outline-none w-14 h-14 flex items-center justify-center floating-button scroll-top ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Lên đầu trang"
      >
        <FaArrowUp size={24} />
      </button>

      {/* Zalo button */}
      <a
        href="https://zalo.me/0833551357"
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 rounded-full bg-[#0068FF] text-white shadow-lg transition-all duration-300 hover:bg-[#0052CC] hover:scale-125 focus:outline-none w-14 h-14 flex items-center justify-center floating-button zalo"
        aria-label="Liên hệ qua Zalo"
      >
        <SiZalo size={24} />
      </a>

      {/* Messenger button */}
      <a
        href="https://m.me/codefun.edu.vn"
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 rounded-full bg-[#0068FF] text-white shadow-lg transition-all duration-300 hover:bg-[#0052CC] hover:scale-125 focus:outline-none w-14 h-14 flex items-center justify-center floating-button messenger"
        aria-label="Liên hệ qua Messenger"
      >
        <SiMessenger size={24} />
      </a>
    </div>
  );
};

export default FloatingButtons; 