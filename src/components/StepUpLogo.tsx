import React from 'react';

export const StepUpLogo: React.FC<{ size?: number; className?: string }> = ({ size = 40, className = "" }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      className={`pixel-art ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Elegant Pixel Wing/Shoe Hybrid */}
      {/* Base Shape */}
      <rect x="4" y="14" width="12" height="4" fill="currentColor" />
      <rect x="14" y="10" width="6" height="6" fill="currentColor" />
      <rect x="18" y="6" width="2" height="6" fill="currentColor" />
      
      {/* Accents */}
      <rect x="6" y="15" width="2" height="1" fill="black" opacity="0.3" />
      <rect x="10" y="15" width="2" height="1" fill="black" opacity="0.3" />
      
      {/* Speed Lines / Wing Detail */}
      <rect x="2" y="10" width="4" height="2" fill="currentColor" opacity="0.6" />
      <rect x="0" y="6" width="6" height="2" fill="currentColor" opacity="0.4" />
      
      {/* Glow highlight */}
      <rect x="15" y="11" width="2" height="2" fill="white" opacity="0.5" />
    </svg>
  );
};
