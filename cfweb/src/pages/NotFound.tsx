import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaEnvelope } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-9xl font-bold text-primary mb-8">404</h1>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Không Tìm Thấy Trang
          </h2>
          
          <p className="text-xl text-gray-600 mb-12">
            Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên, 
            hoặc tạm thời không khả dụng.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              <FaHome />
              <span>Về Trang Chủ</span>
            </Link>
            
            <Link
              to="/courses"
              className="flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              <FaSearch />
              <span>Xem Khóa Học</span>
            </Link>
            
            <Link
              to="/contact"
              className="flex items-center justify-center space-x-2 bg-transparent hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 border-2 border-gray-300 rounded-lg transition duration-300"
            >
              <FaEnvelope />
              <span>Liên Hệ Hỗ Trợ</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 