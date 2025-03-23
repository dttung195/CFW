import { FaCode, FaLaptopCode, FaMobileAlt, FaDatabase, FaRobot, FaGamepad } from 'react-icons/fa';

export const navigationLinks = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Course' },
  { to: '/contact', label: 'Contact' },
  { to: '/feedback', label: 'Feedback' },
  { to: '/blog', label: 'Blog' },
];

export const socialLinks = [
  { href: 'https://facebook.com', label: 'Facebook', icon: 'FaFacebook' },
  { href: 'https://twitter.com', label: 'Twitter', icon: 'FaTwitter' },
  { href: 'https://instagram.com', label: 'Instagram', icon: 'FaInstagram' },
  { href: 'https://youtube.com', label: 'YouTube', icon: 'FaYoutube' },
];

export const popularCourses = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Learn HTML, CSS, and JavaScript to build interactive and responsive websites from scratch.',
    duration: '8 weeks',
    level: 'Beginner',
    price: '1.199.000₫',
    image: '/images/web-dev-course.jpg',
  },
  {
    id: 'react-development',
    title: 'React.js Development',
    description: 'Master React.js and build modern, responsive web applications with the most popular JavaScript library.',
    duration: '10 weeks',
    level: 'Intermediate',
    price: '1.699.000₫',
    image: '/images/react-course.jpg',
  },
  {
    id: 'python-programming',
    title: 'Python Programming',
    description: 'Learn Python programming from basics to advanced, including data science and machine learning.',
    duration: '12 weeks',
    level: 'All Levels',
    price: '1.499.000₫',
    image: '/images/python-course.jpg',
  },
];

export const features = [
  {
    icon: FaLaptopCode,
    title: 'Interactive Learning',
    description: 'Learn through hands-on practice with real-world exercises and interactive programming challenges that reinforce knowledge.',
  },
  {
    icon: FaCode,
    title: 'Expert Instructors',
    description: 'Learn from industry experts with years of experience in software development and teaching.',
  },
  {
    icon: FaDatabase,
    title: 'Comprehensive Curriculum',
    description: 'Our courses cover everything from basics to advanced, ensuring a well-rounded education.',
  },
  {
    icon: FaMobileAlt,
    title: 'Learn Anywhere, Anytime',
    description: 'Access courses on any device, anytime, anywhere. Learn at your own pace and on your schedule.',
  },
  {
    icon: FaGamepad,
    title: 'Gamification Experience',
    description: 'Earn badges, complete challenges, and track your progress with our gamified learning approach.',
  },
  {
    icon: FaRobot,
    title: 'AI-Powered Support',
    description: 'Get personalized help and feedback from our AI assistant to overcome programming challenges.',
  },
];

export const testimonials = [
  {
    name: 'Nguyễn Thị Hương',
    role: 'Web Developer',
    image: '/images/testimonial-1.jpg',
    text: 'Code Fun\'s web development course completely changed my career path. The instructors are knowledgeable and supportive, and the real-world projects helped me gain practical experience that landed me my dream job.',
  },
  {
    name: 'Trần Minh Tuấn',
    role: 'Mobile App Developer',
    image: '/images/testimonial-2.jpg',
    text: 'I tried many programming learning platforms before finding Code Fun. The difference is clear. The program is well-structured, and the support community is amazing. I\'m now working full-time as an app developer!',
  },
  {
    name: 'Lê Thị Phương',
    role: 'Data Scientist',
    image: '/images/testimonial-3.jpg',
    text: 'The Python and data science courses at Code Fun gave me the skills needed to transition from marketing to data science. The projects are challenging but rewarding, and instructors are always ready to help.',
  },
];

export const studentProjects = [
  {
    id: 1,
    title: "Web Portfolio Project - Nguyễn Văn A",
    description: "Final project for Web Development course - A personal portfolio website showcasing UI/UX skills",
    youtubeId: "dQw4w9WgXcQ", // replace with actual YouTube ID
    student: "Nguyễn Văn A"
  },
  {
    id: 2,
    title: "E-commerce App - Trần Thị B",
    description: "React-based shopping application with clean design and smooth user experience",
    youtubeId: "dQw4w9WgXcQ", // replace with actual YouTube ID
    student: "Trần Thị B"
  },
  {
    id: 3,
    title: "Mobile Game - Lê Minh C",
    description: "3D mobile game developed using Unity with advanced physics and gameplay mechanics",
    youtubeId: "dQw4w9WgXcQ", // replace with actual YouTube ID
    student: "Lê Minh C"
  }
];

export const contactInfo = {
  address: '123 Tech Street, Innovation District, City, Country',
  phone: '+123 456 7890',
  email: 'info@codefun.com',
}; 