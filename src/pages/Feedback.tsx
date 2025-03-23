import { useState } from 'react';
import { FaUser, FaYoutube } from 'react-icons/fa';
import { testimonials, studentProjects } from '../constants';

const Feedback = () => {
  const [activeTab, setActiveTab] = useState('testimonials');

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Học Viên Nói Gì Về Code Fun
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
            Khám phá những trải nghiệm thực tế từ các học viên đã tham gia khóa học tại Code Fun.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="container mt-12">
        <div className="flex justify-center space-x-4 mb-12 border-b border-gray-200">
          <button
            className={`py-4 px-6 font-medium text-lg transition-colors ${
              activeTab === 'testimonials'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-primary'
            }`}
            onClick={() => setActiveTab('testimonials')}
          >
            Đánh Giá Từ Học Viên
          </button>
          <button
            className={`py-4 px-6 font-medium text-lg transition-colors ${
              activeTab === 'projects'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-primary'
            }`}
            onClick={() => setActiveTab('projects')}
          >
            Dự Án Của Học Viên
          </button>
        </div>
      </div>

      {/* Testimonials Section */}
      {activeTab === 'testimonials' && (
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative mb-6">
                  <div className="absolute -top-2 -left-2 text-6xl text-primary opacity-20">"</div>
                  <p className="text-gray-700 italic relative z-10">
                    "{testimonial.text}"
                  </p>
                </div>
                <div className="flex items-center">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 border-2 border-primary"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                      <FaUser className="text-gray-500 text-xl" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mt-4">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Xem Câu Chuyện Thành Công Của Học Viên</h3>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Hãy xem video về cách Code Fun đã giúp học viên của chúng tôi đạt được mục tiêu nghề nghiệp của họ.
              </p>
            </div>
            <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
              <div className="relative pb-[56.25%] h-0">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/QlfzysJfdNU" 
                  title="Câu chuyện thành công của học viên Code Fun"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Projects Section */}
      {activeTab === 'projects' && (
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Dự Án Của Học Viên</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Khám phá những dự án ấn tượng được tạo ra bởi học viên của Code Fun
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {studentProjects.map(project => (
              <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative pb-[56.25%] h-0 bg-gray-100">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${project.youtubeId}`}
                    title={project.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex items-center">
                    <FaUser className="text-primary mr-2" />
                    <span className="text-gray-700">{project.student}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 italic">Bạn là học viên của Code Fun và muốn dự án của mình xuất hiện ở đây? Hãy liên hệ với chúng tôi!</p>
            <a 
              href="https://www.youtube.com/@CodeFun%C4%90%C3%A0oT%E1%BA%A1oL%E1%BA%ADpTr%C3%ACnhTh%E1%BB%B1cChi%E1%BA%BFn/videos" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-4 inline-flex items-center bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-colors duration-300"
            >
              <FaYoutube className="mr-2" />
              Xem thêm dự án trên YouTube
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback; 