import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaYoutube } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';

const ContactInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="bg-primary rounded-full p-3 text-white mr-4">
            <FaMapMarkerAlt />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Địa chỉ</h3>
            <p className="text-gray-600 mt-1">
              Số 435 Nguyễn Khang, Yên Hoà,<br />
              Cầu Giấy, Hà Nội, Việt Nam
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-primary rounded-full p-3 text-white mr-4">
            <FaPhone />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Số điện thoại</h3>
            <p className="text-gray-600 mt-1">
              <a href="tel:+0833551357" className="hover:text-primary transition-colors">
                08.33.55.1357
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-primary rounded-full p-3 text-white mr-4">
            <FaEnvelope />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Email</h3>
            <p className="text-gray-600 mt-1">
              <a href="mailto:hotrokhachhang.codefun@gmail.com" className="hover:text-primary transition-colors">
                hotrokhachhang.codefun@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-bold text-gray-800 mb-3">Theo dõi Code Fun tại</h3>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com/codefun.edu.vn" target="_blank" rel="noopener noreferrer" className="bg-gray-200 hover:bg-primary hover:text-white transition-colors p-3 rounded-full">
            <span className="sr-only">Facebook</span>
            <FaFacebook className="w-5 h-5" />
          </a>
          <a href="https://www.youtube.com/@CodeFun%C4%90%C3%A0oT%E1%BA%A1oL%E1%BA%ADpTr%C3%ACnhTh%E1%BB%B1cChi%E1%BA%BFn" target="_blank" rel="noopener noreferrer" className="bg-gray-200 hover:bg-primary hover:text-white transition-colors p-3 rounded-full">
            <span className="sr-only">YouTube</span>
            <FaYoutube className="w-5 h-5" />
          </a>
          <a href="https://www.tiktok.com/@codefun_daotaolaptrinh" target="_blank" rel="noopener noreferrer" className="bg-gray-200 hover:bg-primary hover:text-white transition-colors p-3 rounded-full">
            <span className="sr-only">TikTok</span>
            <FaTiktok className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo; 