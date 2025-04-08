import kotlinLogo from '../assets/images/kotlin-logo.png';
import androidLogo from '../assets/images/android-logo.webp';
import xcodeLogo from '../assets/images/xcode-logo.webp';
import backendLogo from '../assets/images/backend-logo.jpg';

export enum CourseCategory {
  Android = "Android",
  iOS = "iOS",
  Backend = "Backend"
}

export enum CourseLevel {
  All,
  Beginner,
  Basic,
  Advance
}

export enum CourseTag {
  Android = "Android",
  iOS = "iOS",
  Backend = "Backend",
  Swift = "Swift",
  Java = "Java",
  Kotlin = "Kotlin",
  Mobile = "Mobile",
  Web = "Web"
}

export const filterSubjects = [
    { value: '', label: 'Chọn khoá học' },
    { value: CourseCategory.Android, label: 'Lập trình ứng dụng Android' },
    { value: CourseCategory.iOS, label: 'Lập trình ứng dụng iOS' },
    // { value: 'Web', label: 'Lập trình Web' },
    { value: CourseCategory.Backend, label: 'Lập trình Backend' },
    { value: 'Cần tư vấn thêm', label: 'Tôi cần tư vấn thêm' },
];

export const courseLevels = ['Tất cả cấp độ', 'Mới Bắt Đầu', 'Cơ bản', 'Nâng Cao'];
export const courseCategories = [CourseCategory.Android, CourseCategory.iOS, CourseCategory.Backend]


export const coursesData = [
    {
      id: 0,
      title: 'Lập trình Kotlin',
      slug: 'kotlin',
      category: CourseCategory.Android,
      level: CourseLevel.Beginner,
      rating: 4.8,
      reviews: 245,
      students: 1250,
      duration: '10 buổi',
      instructor: 'Sarah Johnson',
      price: "2.000.000",
      image: kotlinLogo,
      description: 'Lập trình căn bản và nâng cao ngôn ngữ Kotlin. Tư duy lập trình hướng đối tượng.',
      featured: false,
      tags: [CourseTag.Kotlin, CourseTag.Android, CourseTag.Mobile, CourseTag.Java]
    },
    {
      id: 1,
      title: 'Lập trình Android cơ bản',
      slug: 'android-basic',
      category: CourseCategory.Android,
      level: CourseLevel.Basic,
      rating: 4.9,
      reviews: 189,
      students: 980,
      duration: '20 buổi',
      instructor: 'Michael Chen',
      price: "5.500.000",
      image: androidLogo,
      description: 'Làm quen với lập trình ứng dụng di động. Xây dựng các ứng dụng Android cơ bản',
      featured: true,
      tags: [CourseTag.Kotlin, CourseTag.Android, CourseTag.Mobile, CourseTag.Java]
    },
    {
      id: 2,
      title: 'Lập trình Android nâng cao',
      slug: 'android-advance',
      category: CourseCategory.Android,
      level: CourseLevel.Advance,
      rating: 4.7,
      reviews: 320,
      students: 1750,
      duration: '25 buổi',
      instructor: 'Emily Rodriguez',
      price: "6.500.000",
      image: androidLogo,
      description: 'Nâng cao kiến thức lập trình Android. Hiểu sâu và tư duy về kiến trúc dự án trong  thực tế',
      featured: false,
      tags: [CourseTag.Kotlin, CourseTag.Android, CourseTag.Mobile, CourseTag.Java]
    },
    {
      id: 3,
      title: 'Lập trình iOS cơ bản',
      slug: 'ios-basic',
      category: CourseCategory.iOS,
      level: CourseLevel.Basic,
      rating: 4.6,
      reviews: 156,
      students: 820,
      duration: '20 buổi',
      instructor: 'David Kim',
      price: "6.000.000",
      image: xcodeLogo,
      description: 'Làm quen với ngôn ngữ lập trình Swift. Tạo được các ứng dụng iOS cơ bản',
      featured: true,
      tags: [CourseTag.Swift, CourseTag.iOS, CourseTag.Mobile]
    },
    {
      id: 4,
      title: 'Lập trình iOS nâng cao',
      slug: 'ios-advance',
      category: CourseCategory.iOS,
      level: CourseLevel.Advance,
      rating: 4.5,
      reviews: 178,
      students: 950,
      duration: '30 buổi',
      instructor: 'James Wilson',
      price: "8.000.000",
      image: xcodeLogo,
      description: 'Phát triển các ứng dụng iOS vận dụng các kiến thức nâng cao sát với yêu cầu thực tiễn',
      featured: false,
      tags: [CourseTag.Swift, CourseTag.iOS, CourseTag.Mobile]
    },
    {
      id: 5,
      title: 'Lập trình Backend cơ bản',
      slug: 'backend-basic',
      category: CourseCategory.Backend,
      level: CourseLevel.Basic,
      rating: 4.9,
      reviews: 210,
      students: 890,
      duration: '20 buổi',
      instructor: 'Sophia Martinez',
      price: "7.000.000",
      image: backendLogo,
      description: 'Hiều và xây dựng được hệ thống Backend đơn giản',
      featured: true,
      tags: [CourseTag.Java, CourseTag.Backend]
    },
    {
      id: 6,
      title: 'Lập trình Backend nâng cao',
      slug: 'backend-advance',
      category: CourseCategory.Backend,
      level: CourseLevel.Advance,
      rating: 4.7,
      reviews: 165,
      students: 780,
      duration: '30 buổi',
      instructor: 'Alex Thompson',
      price: "9.000.000",
      image: backendLogo,
      description: 'Xây dựng được hệ thống Backend phức tạp, có thể ứng dụng thực tiễn',
      featured: false,
      tags: [CourseTag.Java, CourseTag.Backend]
    }
  ];
