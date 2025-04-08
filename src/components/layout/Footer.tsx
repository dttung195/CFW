import { Link } from 'react-router-dom';
import { FaFacebook, FaYoutube } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useEffect } from 'react';
import logoNgangDark from '../../assets/images/logo-ngang-dark.png';

const Footer = () => {
  useEffect(() => {
    // Load Facebook SDK
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v18.0";
      fjs.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img src={logoNgangDark} alt="Code Fun Logo" className="h-12" />
            </Link>
            <p className="text-gray-400 mt-4">
              Code Fun cam kết trang bị cho học viên những kỹ năng lập trình hiện đại và thực tiễn.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.facebook.com/codefun.edu.vn" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-primary transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="https://www.youtube.com/@CodeFun%C4%90%C3%A0oT%E1%BA%A1oL%E1%BA%ADpTr%C3%ACnhTh%E1%BB%B1cChi%E1%BA%BFn" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-400 hover:text-primary transition-colors">
                <FaYoutube size={24} />
              </a>
              <a href="https://www.tiktok.com/@codefun_daotaolaptrinh" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-gray-400 hover:text-primary transition-colors">
                <FaTiktok size={24} />
              </a>
            </div>
          </div>


          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Thông Tin Liên Hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-primary mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">Số 435 Nguyễn Khang, Yên Hoà, Cầu Giấy, Hà Nội</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-primary mr-3 flex-shrink-0" />
                <a href="tel:+0833551357" className="text-gray-400 hover:text-primary transition-colors">08.33.55.1357</a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-primary mr-3 flex-shrink-0" />
                <a href="mailto:hotrokhachhang.codefun@gmail.com" className="text-gray-400 hover:text-primary transition-colors">hotrokhachhang.codefun@gmail.com</a>
              </li>
            </ul>
          </div>
          
          {/* Facebook Page Plugin */}
          <div className="w-full">
            <div className="fb-page" 
              data-href="https://www.facebook.com/codefun.edu.vn" 
              data-tabs="about" 
              data-width="" 
              data-height="" 
              data-small-header="false" 
              data-adapt-container-width="false" 
              data-hide-cover="false" 
              data-show-facepile="true">
              <blockquote cite="https://www.facebook.com/codefun.edu.vn" className="fb-xfbml-parse-ignore">
                <a href="https://www.facebook.com/codefun.edu.vn">Code Fun - Đào Tạo Lập Trình Viên Thực Chiến</a>
              </blockquote>
            </div>
          </div>
        </div>


        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Code Fun. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 