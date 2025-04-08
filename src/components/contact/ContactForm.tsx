import React, { FormEvent, useState, useEffect } from 'react';
import FormField from '../form/FormField';
import { submitToGoogleSheet } from '../../utils/googleSheetService';
import useFormPersist from '../../hooks/useFormPersist';
import { isValidVietnamesePhone, formatPhoneNumber } from '../../utils/validation';
import { filterSubjects, coursesData } from '../../data/CourseData';

interface ContactFormProps {
  courseId: string; // Define the courseId prop type
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  // Store formatted phone for display
  formattedPhone?: string;
  registerMessage: string;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  formattedPhone: '',
  registerMessage: ''
};

// One day in milliseconds - expires form data after 24 hours
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const ContactForm: React.FC<ContactFormProps> = ({ courseId }) => {
  // Use our custom hook to persist form data - expires after 1 day
  const [formData, setFormData, clearFormDataOriginal] = useFormPersist<FormState>(
    'contact', // unique key for this form
    initialFormState,
    ONE_DAY_MS
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
  
  // Field-specific validation errors
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // Track which fields have been touched/interacted with
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  // Format the phone number whenever it changes
  useEffect(() => {
    if (formData.phone && formData.phone !== formData.formattedPhone) {
      const formatted = formatPhoneNumber(formData.phone);
      if (formatted !== formData.phone) {
          const course = coursesData.find(course => course.id === parseInt(courseId));
          console.log(course)
          console.log(filterSubjects.find(s => s.value === course?.category))
          if (course) {
            setFormData(prev => ({ ...prev, formattedPhone: formatted, subject: filterSubjects.find(s => s.value === course.category)?.value as string, registerMessage: course.title}));
          } else {
            setFormData(prev => ({ ...prev, formattedPhone: formatted }));
          }
      }
    }
  }, [formData.phone, formData.formattedPhone, courseId, setFormData]);

  // Wrapper for clearFormData that also clears validation errors and resets touched state
  const clearFormData = () => {
    // Clear form data
    clearFormDataOriginal();
    
    // Clear any validation errors
    setValidationErrors({});
    
    // Reset touched fields
    setTouchedFields({});
    
    // Clear success message
    // setSuccessMessage(null);
    setErrorMessage(null); // Clear error message
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Clear validation error for this field when the user types
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Clear success message when user starts editing the form again
    if (successMessage) {
      setSuccessMessage(null);
    }
    
    // Mark field as touched
    if (!touchedFields[name]) {
      setTouchedFields(prev => ({
        ...prev,
        [name]: true
      }));
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate name field - only validate if the field has a value
  const validateName = (forSubmission = false): boolean => {
    // For blur validation, only validate if the field has a value or has been touched
    if (!forSubmission && (!touchedFields.name || !formData.name.trim())) {
      return true;
    }
    
    if (!formData.name.trim()) {
      if (forSubmission) {
        setValidationErrors(prev => ({
          ...prev,
          name: 'Vui lòng nhập họ và tên của bạn'
        }));
      }
      return !forSubmission;
    }
    return true;
  };

  // Validate phone field - only validate if the field has a value
  const validatePhone = (forSubmission = false): boolean => {
    // For blur validation, only validate if the field has a value
    if (!forSubmission && (!touchedFields.phone || !formData.phone.trim())) {
      return true;
    }
    
    if (!formData.phone.trim()) {
      if (forSubmission) {
        setValidationErrors(prev => ({
          ...prev,
          phone: 'Vui lòng nhập số điện thoại của bạn'
        }));
      }
      return !forSubmission;
    } else if (!isValidVietnamesePhone(formData.phone)) {
      setValidationErrors(prev => ({
        ...prev,
        phone: 'Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.'
      }));
      return false;
    }
    return true;
  };

  // Validate email field - only if it has a value
  const validateEmail = (): boolean => {
    // Email is optional, so only validate if the user has entered something
    if (!formData.email || formData.email.trim() === '') {
      return true;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setValidationErrors(prev => ({
        ...prev,
        email: 'Email không hợp lệ. Vui lòng kiểm tra lại.'
      }));
      return false;
    }
    return true;
  };

  // Validate subject field
  const validateSubject = (forSubmission = false): boolean => {
    // For blur validation, only validate if the field has been interacted with
    if (!forSubmission && !touchedFields.subject) {
      return true;
    }
    
    if (!formData.subject) {
      if (forSubmission) {
        setValidationErrors(prev => ({
          ...prev,
          subject: 'Vui lòng chọn khóa học bạn quan tâm'
        }));
      }
      return !forSubmission;
    }
    return true;
  };

  // Validate the entire form
  const validateForm = (): boolean => {
    // Clear all previous errors
    setValidationErrors({});
    
    // Validate all fields in the specified order - with forSubmission=true to validate empty fields
    const nameValid = validateName(true);
    const phoneValid = validatePhone(true);
    const emailValid = validateEmail();
    const subjectValid = validateSubject(true);
    
    // Form is valid if all required fields are valid
    return nameValid && phoneValid && emailValid && subjectValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Reset any previous success message
    setSuccessMessage(null);
    setErrorMessage(null); // Reset error message
    
    // Mark all fields as touched before submission validation
    setTouchedFields({
      name: true,
      phone: true,
      email: true,
      subject: true,
      message: true
    });
    
    // Validate the form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitToGoogleSheet(formData);
      
      if (response.success) {
        setSuccessMessage('Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi sớm nhất có thể.');
        // Clear the form data from localStorage and reset the form
        clearFormData();
      } else {
        setErrorMessage(`Lỗi: ${response.error || 'Không thể gửi biểu mẫu. Vui lòng thử lại sau.'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Có lỗi xảy ra khi gửi biểu mẫu. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create a generic blur handler for any field
  const handleBlur = (fieldName: string) => {
    // Mark the field as touched
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true
    }));
    
    switch (fieldName) {
      case 'name':
        validateName();
        break;
      case 'phone':
        validatePhone();
        break;
      case 'email':
        validateEmail();
        break;
      case 'subject':
        validateSubject();
        break;
    }
  };

  // Create field props with blur handlers
  const createFieldProps = (fieldName: keyof FormState) => {
    return {
      onBlur: () => handleBlur(fieldName),
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông tin liên hệ của bạn</h2>
      
      {successMessage && (
        <div className="p-4 mb-6 rounded-lg bg-green-500 bg-opacity-20 text-green-700 flex justify-between items-center">
          <p className="font-medium">{successMessage}</p>
          <button 
            onClick={() => setSuccessMessage(null)} 
            className="ml-4 text-green-700 hover:text-green-900"
            aria-label="Close success message"
          >
            &times;
          </button>
        </div>
      )}
      
      {errorMessage && (
        <div className="p-4 mb-6 rounded-lg bg-red-500 bg-opacity-20 text-red-700">
          <p className="font-medium">{errorMessage}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Show any general submission errors at the top of the form */}
        {validationErrors.submit && (
          <p className="text-sm text-red-300 mt-2 mb-4">{validationErrors.submit}</p>
        )}
        
        <div>
          <FormField
            id="name"
            name="name"
            label="Họ và tên"
            value={formData.name}
            type="text"
            placeholder="Nhập họ và tên của bạn"
            required={true}
            onChange={handleChange}
            {...createFieldProps('name')}
          />
          {validationErrors.name && (
            <p className="text-sm text-red-300 mt-2">{validationErrors.name}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField
              id="phone"
              name="phone"
              label="Số điện thoại"
              value={formData.phone}
              type="tel"
              placeholder="Nhập số điện thoại của bạn"
              required={true}
              onChange={handleChange}
              {...createFieldProps('phone')}
            />
            {validationErrors.phone ? (
              <p className="text-sm text-red-300 mt-2">{validationErrors.phone}</p>
            ) : formData.formattedPhone && formData.formattedPhone !== formData.phone ? (
              <p className="text-sm text-gray-500 mt-1">Định dạng: {formData.formattedPhone}</p>
            ) : null}
          </div>
          
          <div>
            <FormField
              id="email"
              name="email"
              label="Email"
              value={formData.email}
              type="email"
              placeholder="Nhập email của bạn"
              required={false}
              onChange={handleChange}
              noValidate={true}
              {...createFieldProps('email')}
            />
            {validationErrors.email && (
              <p className="text-sm text-red-300 mt-2">{validationErrors.email}</p>
            )}
          </div>
        </div>
        
        <div>
          <FormField
            id="subject"
            name="subject"
            label="Khoá học quan tâm"
            value={formData.subject}
            type="select"
            required={true}
            onChange={handleChange}
            options={filterSubjects}
            {...createFieldProps('subject')}
          />
          {validationErrors.subject && (
            <p className="text-sm text-red-300 mt-2">{validationErrors.subject}</p>
          )}
        </div>
        
        <div>
          <FormField
            id="message"
            name="message"
            label="Tin nhắn"
            value={formData.message}
            type="textarea"
            placeholder="Nhập thông tin bạn muốn tư vấn"
            required={false}
            onChange={handleChange}
            rows={5}
          />
          {validationErrors.message && (
            <p className="text-sm text-red-300 mt-2">{validationErrors.message}</p>
          )}
        </div>
        
        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={clearFormData}
            className="py-3 px-6 text-gray-600 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition duration-300"
          >
            Xóa tất cả
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`py-3 px-6 text-white font-semibold rounded-lg shadow-md 
              ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'} 
              transition duration-300 ease-in-out transform hover:scale-[1.02]`}
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi thông tin'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm; 