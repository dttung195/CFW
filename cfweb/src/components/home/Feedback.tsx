import { useRef } from 'react';
import { testimonials } from '../../constants';

interface FeedbackProps {
  isVisible: boolean;
}

const Feedback = ({ isVisible }: FeedbackProps) => {
  const testimonialsRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={testimonialsRef}
      id="feedback"
      className={`py-20 bg-gray-50 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Học Viên Nói Gì?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá những trải nghiệm thực tế từ các học viên đã tham gia khóa học tại Code Fun.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`bg-white p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-6">
                <div className="absolute -top-2 -left-2 text-6xl text-primary opacity-20">"</div>
                <p className="text-gray-700 italic relative z-10">
                  "{testimonial.text}"
                </p>
              </div>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-primary"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
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

        <div className="mt-16 staggered-item">
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
    </section>
  );
};

export default Feedback; 