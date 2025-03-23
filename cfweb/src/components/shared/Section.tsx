import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  background?: 'white' | 'gray' | 'gradient';
  padding?: 'sm' | 'md' | 'lg';
  ref?: React.RefObject<HTMLElement>;
}

const Section = ({
  children,
  id,
  className = '',
  background = 'white',
  padding = 'md',
  ref,
}: SectionProps) => {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
  };

  const paddings = {
    sm: 'py-12',
    md: 'py-20',
    lg: 'py-32'
  };

  const classes = `${backgrounds[background]} ${paddings[padding]} ${className}`;

  return (
    <section id={id} className={classes} ref={ref}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
};

export default Section; 