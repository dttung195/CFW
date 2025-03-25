import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { coursesData } from '../../data/CourseData';
import CourseCard from '../shared/CourseCard';

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
          {coursesData.filter(course => course.featured).slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
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