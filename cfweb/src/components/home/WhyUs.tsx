import { useRef } from 'react';
import { FaCode, FaLaptopCode, FaUsers, FaCertificate, FaClock, FaHeadset } from 'react-icons/fa';
import { features } from '../../constants';

interface WhyUsProps {
  isVisible: boolean;
}

const WhyUs = ({ isVisible }: WhyUsProps) => {
  const featuresRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={featuresRef} 
      id="whyUs"
      className={`py-20 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Tại Sao Chọn Code Fun?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chúng tôi cung cấp trải nghiệm học tập độc đáo kết hợp lý thuyết với các dự án thực tế để đảm bảo bạn có được kỹ năng thực tế.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className={`bg-white p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-primary text-4xl mb-4 pulse">
                  <Icon />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs; 