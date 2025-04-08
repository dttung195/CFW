import { useRef, useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import useFormPersist from '../../hooks/useFormPersist';
import { isValidVietnamesePhone, formatPhoneNumber } from '../../utils/validation';
import { submitToGoogleSheet } from '../../utils/googleSheetService';

interface HomeContactProps {
  isVisible: boolean;
}

interface PhoneFormState {
  phone: string;
  formatted: string;
}

const initialPhoneState: PhoneFormState = {
  phone: '',
  formatted: ''
};

const HomeContact = ({ isVisible }: HomeContactProps) => {
  const ctaRef = useRef<HTMLElement>(null);
  const [phoneData, setPhoneData, clearPhoneDataOriginal] = useFormPersist<PhoneFormState>(
    'homeContact',
    initialPhoneState,
    7 * 24 * 60 * 60 * 1000 // Expire after 1 week
  );
  
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Enhanced clear function to reset validation errors and submit status
  const clearPhoneData = () => {
    clearPhoneDataOriginal();
    setValidationError(null);
    setSubmitStatus('idle');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    
    // Validate phone number format
    if (!phoneData.phone || phoneData.phone.trim() === '') {
      setValidationError('Vui lòng nhập số điện thoại của bạn');
      return;
    }
    
    // Check if the phone number is valid
    if (!isValidVietnamesePhone(phoneData.phone)) {
      setValidationError('Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam hợp lệ');
      return;
    }
    
    // Set loading state
    setIsSubmitting(true);
    
    try {
      // Prepare data for Google Sheets - similar format as ContactForm but only with phone
      const formData = {
        name: "Từ form trang chủ", // Indicate this came from the home page form
        phone: phoneData.phone,
        email: "",
        subject: "Cần tư vấn thêm", // Default subject
        message: "Khách hàng đã gửi số điện thoại từ form trang chủ.",
        registerMessage: "",
      };
      
      // Submit to the same Google Apps Script endpoint
      const response = await submitToGoogleSheet(formData);
      
      if (response.success) {
        setSubmitStatus('success');
        clearPhoneData(); // Clear the form after successful submission
      } else {
        console.error('Lỗi khi gửi form:', response.error);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Lỗi khi gửi form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Clear any validation errors when the user types
    if (validationError) {
      setValidationError(null);
    }
    
    // Reset the submit status when the user is typing again
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
    
    // For phone fields, format the display value
    if (name === 'phone') {
      // Store both the raw input and a formatted version
      const formatted = formatPhoneNumber(value);
      setPhoneData(prev => ({ 
        ...prev, 
        [name]: value,
        formatted: formatted
      }));
    } else {
      setPhoneData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <section 
      ref={ctaRef}
      id="homeContact"
      className={`py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative overflow-hidden ${
        isVisible ? 'animate-fade-in' : 'opacity-0'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full opacity-10 floating"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full opacity-10 floating stagger-2"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white rounded-full opacity-10 floating stagger-3"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Bạn vẫn còn những băn khoăn về việc học lập trình?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Đừng ngần ngại liên hệ với chúng tôi để được tư vấn và giải đáp mọi thắc mắc!
            </p>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Nhận tư vấn miễn phí</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-white font-medium mb-2">Số điện thoại của bạn</label>
                  <div className="flex">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={phoneData.phone}
                      onChange={handleChange}
                      placeholder="0912 345 678"
                      className={`w-full px-4 py-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 ${
                        validationError ? 'border-red-500 bg-red-50' : 'border-transparent'
                      }`}
                      required
                      disabled={isSubmitting}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`${
                        isSubmitting 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-yellow-500 hover:bg-yellow-600'
                      } text-gray-900 font-bold py-3 px-6 rounded-r-lg transition duration-300`}
                    >
                      {isSubmitting ? 'Đang gửi...' : 'Gửi'}
                    </button>
                  </div>
                  
                  {phoneData.formatted && phoneData.formatted !== phoneData.phone && (
                    <p className="text-sm text-white text-opacity-90 mt-1">
                      Số điện thoại đã định dạng: {phoneData.formatted}
                    </p>
                  )}
                  
                  {validationError ? (
                    <p className="text-sm text-red-300 mt-2">
                      {validationError}
                    </p>
                  ) : (
                    <p className="text-sm text-white text-opacity-80 mt-2">
                      * Chúng tôi sẽ chỉ sử dụng số điện thoại của bạn để liên hệ về khóa học
                    </p>
                  )}
                </div>
              </form>
              
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-500 bg-opacity-20 rounded-lg">
                  <p className="text-white font-medium">
                    Cảm ơn bạn! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
                  </p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-500 bg-opacity-20 rounded-lg">
                  <p className="text-white font-medium">
                    Có lỗi xảy ra khi gửi form. Vui lòng thử lại sau.
                  </p>
                </div>
              )}
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-6">Hoặc đăng ký ngay</h3>
              <p className="mb-8">
                Khám phá các khóa học của chúng tôi và bắt đầu hành trình lập trình của bạn ngay hôm nay.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/contact"
                  className="bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 mb-6 sm:mb-0"
                >
                  Đăng Ký Ngay
                </Link>
                <Link
                  to="/courses"
                  className="bg-transparent hover:bg-indigo-700 text-white font-bold py-3 px-8 border-2 border-white rounded-lg transition duration-300 transform hover:scale-105"
                >
                  Xem Khóa Học
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContact; 