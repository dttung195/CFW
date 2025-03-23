import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'feature' | 'course' | 'testimonial';
  className?: string;
  hover?: boolean;
}

const Card = ({
  children,
  variant = 'default',
  className = '',
  hover = true,
}: CardProps) => {
  const baseStyles = 'bg-white rounded-lg shadow-md transition-all duration-300';
  
  const variants = {
    default: 'p-6',
    feature: 'p-8 hover:shadow-xl hover:-translate-y-2',
    course: 'overflow-hidden hover:shadow-2xl',
    testimonial: 'p-8 hover:shadow-xl hover:-translate-y-2'
  };

  const classes = `${baseStyles} ${variants[variant]} ${hover ? '' : 'hover:shadow-none hover:translate-y-0'} ${className}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card; 