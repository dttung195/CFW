// src/components/shared/CourseCard.tsx
import React from 'react';
import { FaClock } from 'react-icons/fa';
import { courseLevels } from '../../data/CourseData';
import { Link } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  slug: string;
  category: string;
  level: number;
  duration: string;
  price: number;
  image: string;
  description: string;
  featured: boolean;
  tags: string[];
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        {course.featured && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Nổi bật
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
            course.level === 1 ? 'bg-blue-100 text-blue-800' :
            course.level === 2 ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {courseLevels[course.level]}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">{course.category}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {course.description}
        </p>
        
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <FaClock className="mr-1" />
            <span>{course.duration}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">${course.price}</span>
          <Link
            to={`/contact/${course.id}`} // Navigate to Contact page with Course ID
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Đăng ký ngay
          </Link>
          {/* <Link
            to={`/courses/${course.slug}`}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Đăng ký ngay
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;