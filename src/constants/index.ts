import { FaCode, FaLaptopCode, FaMobileAlt, FaDatabase, FaHandshake, FaGamepad } from 'react-icons/fa';
import userAvatar from  '../assets/images/user-avatar.png';

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

export const features = [
  {
    icon: FaLaptopCode,
    title: 'Lộ trình bài bản, phù hợp mọi trình độ',
    description: 'Khoá học được thiết kế từ cơ bản đến nâng cao, giúp cả người mới bắt đầu và người có nền tảng đều theo kịp.',
  },
  {
    icon: FaCode,
    title: 'Học qua dự án thực tế, nâng cao kỹ năng thực chiến',
    description: 'Chương trình học tập trung vào các bài tập và dự án thực tế, mô phỏng các dự án thực tế như khi làm việc',
  },
  {
    icon: FaDatabase,
    title: 'Giảng viên giàu kinh nghiệm, tận tâm giảng dạy',
    description: 'Không chỉ dạy lý thuyết, mà còn chia sẻ những bài học thực tế, giúp học viên hiểu sâu và áp dụng nhanh.',
  },
  {
    icon: FaMobileAlt,
    title: 'Hỗ trợ cá nhân hóa, giải đáp tận tình',
    description: 'Mỗi học viên đều được theo sát tiến độ, giải đáp thắc mắc một cách chi tiết.',
  },
  {
    icon: FaGamepad,
    title: 'Môi trường năng động, sáng tạo và truyền cảm hứng',
    description: 'Lớp học là một cộng đồng tích cực, nơi học viên không chỉ học lập trình mà còn rèn luyện kỹ năng mềm.',
  },
  {
    icon: FaHandshake,
    title: 'Đồng hành trọn đời',
    description: 'Tư vấn định hướng nghề nghiệp, giúp học viên có lộ trình phát triển rõ ràng sau khi hoàn thành khóa học.',
  },
];

export const testimonials = [
  {
    name: 'Bạn Thành Trung',
    role: 'Học viên lớp Android',
    image: userAvatar,
    text: 'Ngoài việc học các kiến thức về Android mình rất thích mỗi khi đến giai đoạn được làm các project. Làm project không chỉ khiến mình nhớ tốt hơn, hiểu hơn về dự án thực tế khi đi làm mà còn là lúc được các thầy chỉ dạy nhiều hơn về các kiến thức và kinh nghiệm cần có của 1 lập trình viên',
    // text: 'Mặc dù mình tham gia vào lớp học muộn 1 vài buổi, là người mới học và cũng hay hỏi nhưng giáo viên tại Code Fun luôn tận tình hướng dẫn và giải đáp cụ thể từng vấn đề cho mình đến khi hiểu, không để mình chậm hơn so với các bạn cùng khoá, giúp mình có thể hoàn thành khoá học đúng thời hạn.',
  },
  {
    name: 'Bạn Đức Duy',
    role: 'Học viên lớp iOS',
    image: userAvatar,
    text: 'Mình vốn hơi ít lời và có phần nhút nhát. Tuy nhiên sau thời gian học với các thầy ở Code Fun, mình đã có thể cảm thấy thoải mái chia sẻ các vấn đề trong học tập, giúp mình tiếp thu tốt hơn và tránh được tâm lý ngại học mà trước đây đã khiến mình hổng rất nhiều kiến thức khi học tập ở trường',
  },
  {
    name: 'Bạn Văn Hưng',
    role: 'Học viên lớp lập trình Backend',
    image: userAvatar,
    text: 'Lộ trình mà trung tâm đưa ra rất phù hợp với mình. Sau khoá học ngoài những kỹ năng chuyên môn mình cũng được các thầy chỉ thêm về kinh nghiệm phỏng vấn và đã sớm tìm được công việc ưng ý. Vậy mà khi có những vấn đề trong công việc mình quay lại hỏi các thầy cũng vẫn trả lời rất nhiệt tình',
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