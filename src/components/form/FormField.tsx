import React from 'react';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur?: () => void;
  options?: Array<{ value: string; label: string }>;
  rows?: number;
  noValidate?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  label,
  value,
  type = 'text',
  placeholder = '',
  required = false,
  onChange,
  onBlur,
  options = [],
  rows = 6,
  noValidate = false
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
        {label} {required && '*'}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          rows={rows}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={placeholder}
          required={required && !noValidate}
        />
      ) : type === 'select' ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required={required && !noValidate}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={placeholder}
          required={required && !noValidate}
          {...(type === 'email' && noValidate ? { pattern: undefined } : {})}
        />
      )}
    </div>
  );
};

export default FormField; 