import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const ColorLogo: React.FC<LogoProps> = ({ className = '', width = 200, height = 60 }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 200 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Code brackets */}
      <path d="M30 15L15 30L30 45" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M60 15L75 30L60 45" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* F for Fun */}
      <path d="M90 15H115M90 15V45M90 15V30H110" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Dot for i in Fun */}
      <circle cx="130" cy="20" r="5" fill="#3B82F6"/>
      
      {/* Text */}
      <text x="90" y="55" fontFamily="Arial, sans-serif" fontSize="12" fill="#3B82F6">CODE FUN</text>
    </svg>
  );
};

export default ColorLogo; 