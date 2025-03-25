import { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import CourseCard from '../components/shared/CourseCard.tsx';
import { coursesData } from '../data/CourseData';
import { courseLevels } from '../data/CourseData';


// Categories for filtering
const categories = [
  'Tất Cả Danh Mục',
  'Lập Trình Web',
  'Phát Triển Mobile',
  'Lập Trình',
  'Khoa Học Dữ Liệu',
  'Phát Triển Game',
  'Trí Tuệ Nhân Tạo'
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất Cả Danh Mục');
  const [selectedLevel, setSelectedLevel] = useState(courseLevels[0]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter courses based on search term, category, and level
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Tất Cả Danh Mục' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === courseLevels[course.level] || selectedLevel === courseLevels[0];
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Khóa Học Của Chúng Tôi</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá nhiều khóa học được thiết kế để giúp bạn thành thạo kỹ năng mới, phát triển sự nghiệp và đạt được mục tiêu của mình.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            {/* Search Bar */}
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Tìm kiếm khóa học..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Filter Toggle Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition duration-300"
            >
              <FaFilter />
              <span>Bộ lọc</span>
            </button>

            {/* Desktop Filters */}
            <div className="hidden md:flex space-x-4">
              {/* <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select> */}

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {courseLevels.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-4">
                {/* <div>
                  <label htmlFor="category-mobile" className="block text-gray-700 font-medium mb-2">
                    Danh mục
                  </label>
                  <select
                    id="category-mobile"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div> */}

                <div>
                  <label htmlFor="level-mobile" className="block text-gray-700 font-medium mb-2">
                    Cấp độ
                  </label>
                  <select
                    id="level-mobile"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {courseLevels.map((level, index) => (
                      <option key={index} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Hiển thị <span className="font-semibold">{filteredCourses.length}</span> khóa học
          </p>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy khóa học</h3>
            <p className="text-gray-600 mb-8">
              Hãy điều chỉnh tiêu chí tìm kiếm hoặc bộ lọc để tìm thấy khóa học phù hợp.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Tất Cả Danh Mục');
                setSelectedLevel('Tất Cả Cấp Độ');
              }}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg transition duration-300"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses; 