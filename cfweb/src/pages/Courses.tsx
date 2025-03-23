import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaStar, FaRegStar, FaStarHalfAlt, FaFilter, FaClock, FaUser, FaChalkboardTeacher } from 'react-icons/fa';

// Mock course data
const coursesData = [
  {
    id: 1,
    title: 'Nền Tảng Lập Trình Web',
    slug: 'web-development',
    category: 'Lập Trình Web',
    level: 'Mới Bắt Đầu',
    rating: 4.8,
    reviews: 245,
    students: 1250,
    duration: '8 tuần',
    instructor: 'Sarah Johnson',
    price: 49.99,
    image: '/images/web-dev-course.jpg',
    description: 'Học HTML, CSS và JavaScript để xây dựng các trang web đáp ứng và tương tác từ đầu.',
    featured: true,
    tags: ['HTML', 'CSS', 'JavaScript']
  },
  {
    id: 2,
    title: 'Lập Trình React.js',
    slug: 'react-development',
    category: 'Lập Trình Web',
    level: 'Trung Cấp',
    rating: 4.9,
    reviews: 189,
    students: 980,
    duration: '10 tuần',
    instructor: 'Michael Chen',
    price: 69.99,
    image: '/images/react-course.jpg',
    description: 'Thành thạo React.js và xây dựng các ứng dụng web hiện đại, đáp ứng với thư viện JavaScript phổ biến nhất.',
    featured: true,
    tags: ['React', 'JavaScript', 'Frontend']
  },
  {
    id: 3,
    title: 'Lập Trình Python',
    slug: 'python-programming',
    category: 'Lập Trình',
    level: 'Tất Cả Cấp Độ',
    rating: 4.7,
    reviews: 320,
    students: 1750,
    duration: '12 tuần',
    instructor: 'Emily Rodriguez',
    price: 59.99,
    image: '/images/python-course.jpg',
    description: 'Học lập trình Python từ cơ bản đến nâng cao, bao gồm khoa học dữ liệu và học máy.',
    featured: true,
    tags: ['Python', 'Lập Trình', 'Khoa Học Dữ Liệu']
  },
  {
    id: 4,
    title: 'Phát Triển Ứng Dụng Di Động với Flutter',
    slug: 'flutter-development',
    category: 'Phát Triển Mobile',
    level: 'Trung Cấp',
    rating: 4.6,
    reviews: 156,
    students: 820,
    duration: '10 tuần',
    instructor: 'David Kim',
    price: 79.99,
    image: '/images/flutter-course.jpg',
    description: 'Xây dựng các ứng dụng đẹp, được biên dịch cho di động, web và máy tính để bàn từ một codebase duy nhất với Flutter.',
    featured: false,
    tags: ['Flutter', 'Dart', 'Mobile']
  },
  {
    id: 5,
    title: 'Phát Triển Backend với Node.js',
    slug: 'nodejs-development',
    category: 'Lập Trình Web',
    level: 'Trung Cấp',
    rating: 4.5,
    reviews: 178,
    students: 950,
    duration: '8 tuần',
    instructor: 'James Wilson',
    price: 69.99,
    image: '/images/nodejs-course.jpg',
    description: 'Học JavaScript phía máy chủ và xây dựng các ứng dụng backend có khả năng mở rộng với Node.js và Express.',
    featured: false,
    tags: ['Node.js', 'Express', 'Backend']
  },
  {
    id: 6,
    title: 'Khoa Học Dữ Liệu và Học Máy',
    slug: 'data-science',
    category: 'Khoa Học Dữ Liệu',
    level: 'Nâng Cao',
    rating: 4.9,
    reviews: 210,
    students: 890,
    duration: '14 tuần',
    instructor: 'Sophia Martinez',
    price: 89.99,
    image: '/images/data-science-course.jpg',
    description: 'Làm chủ phân tích dữ liệu, trực quan hóa và các thuật toán học máy để trích xuất thông tin từ các bộ dữ liệu phức tạp.',
    featured: false,
    tags: ['Python', 'Học Máy', 'Phân Tích Dữ Liệu']
  },
  {
    id: 7,
    title: 'Phát Triển Game với Unity',
    slug: 'game-development',
    category: 'Phát Triển Game',
    level: 'Trung Cấp',
    rating: 4.7,
    reviews: 165,
    students: 780,
    duration: '12 tuần',
    instructor: 'Alex Thompson',
    price: 79.99,
    image: '/images/game-dev-course.jpg',
    description: 'Học các nguyên tắc phát triển game và tạo game 2D và 3D của riêng bạn bằng Unity và C#.',
    featured: false,
    tags: ['Unity', 'C#', 'Thiết Kế Game']
  },
  {
    id: 8,
    title: 'Cơ Bản về Trí Tuệ Nhân Tạo',
    slug: 'ai-fundamentals',
    category: 'Trí Tuệ Nhân Tạo',
    level: 'Nâng Cao',
    rating: 4.8,
    reviews: 145,
    students: 650,
    duration: '10 tuần',
    instructor: 'Robert Lee',
    price: 89.99,
    image: '/images/ai-course.jpg',
    description: 'Khám phá các nguyên tắc cơ bản của trí tuệ nhân tạo, bao gồm mạng neural, học sâu và xử lý ngôn ngữ tự nhiên.',
    featured: false,
    tags: ['AI', 'Mạng Neural', 'Học Sâu']
  }
];

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

// Levels for filtering
const levels = ['Tất Cả Cấp Độ', 'Mới Bắt Đầu', 'Trung Cấp', 'Nâng Cao'];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất Cả Danh Mục');
  const [selectedLevel, setSelectedLevel] = useState('Tất Cả Cấp Độ');
  const [showFilters, setShowFilters] = useState(false);

  // Filter courses based on search term, category, and level
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Tất Cả Danh Mục' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'Tất Cả Cấp Độ' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return <div className="flex">{stars}</div>;
  };

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
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
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
                <div>
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
                </div>

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
                    {levels.map((level) => (
                      <option key={level} value={level}>
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
              <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
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
                      course.level === 'Mới Bắt Đầu' ? 'bg-blue-100 text-blue-800' :
                      course.level === 'Trung Cấp' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">{course.category}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-500 font-bold mr-1">{course.rating}</span>
                      <span className="text-gray-500 text-sm">({course.reviews})</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <FaClock className="mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <FaUser className="mr-1" />
                      <span>{course.students} học viên</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                      <FaChalkboardTeacher className="text-gray-500" />
                    </div>
                    <span className="text-gray-700">{course.instructor}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">${course.price}</span>
                    <Link
                      to={`/courses/${course.slug}`}
                      className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                      Xem khóa học
                    </Link>
                  </div>
                </div>
              </div>
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