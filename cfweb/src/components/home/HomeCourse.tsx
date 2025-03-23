import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { popularCourses } from '../../constants';

interface HomeCourseProps {
  isVisible: boolean;
}

const HomeCourse = ({ isVisible }: HomeCourseProps) => {
  const coursesRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={coursesRef}
      id="homeCourse"
      className={`py-20 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Khóa Học Nổi Bật</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá các khóa học phổ biến nhất của chúng tôi và bắt đầu hành trình lập trình của bạn ngay hôm nay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularCourses.map((course, index) => (
            <div 
              key={course.id} 
              className={`bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl group ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Nổi bật
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Link
                    to={`/courses/${course.id}`}
                    className="flex items-center justify-center space-x-2 bg-primary text-white font-bold py-2 px-4 rounded transition duration-300 w-full"
                  >
                    <span>Xem Khóa Học</span>
                    <FaArrowRight />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className={`bg-${course.level === 'Beginner' ? 'blue' : course.level === 'Intermediate' ? 'yellow' : 'green'}-100 text-${course.level === 'Beginner' ? 'blue' : course.level === 'Intermediate' ? 'yellow' : 'green'}-800 text-xs font-semibold px-3 py-1 rounded-full`}>
                    {course.level}
                  </span>
                  <span className="text-gray-600">{course.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">
                  {course.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">{course.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <Link
            to="/courses"
            className="inline-flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
          >
            <span>Xem Tất Cả Khóa Học</span>
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeCourse; 