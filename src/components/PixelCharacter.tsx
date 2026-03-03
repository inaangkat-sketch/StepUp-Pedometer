import React from 'react';
import { motion } from 'motion/react';

interface PixelCharacterProps {
  isWalking?: boolean;
  isWaving?: boolean;
  speed?: number; // 0 to 1
  size?: number;
}

export const PixelCharacter: React.FC<PixelCharacterProps> = ({
  isWalking = false,
  isWaving = false,
  speed = 0.5,
  size = 100
}) => {
  // Animation duration based on speed
  const walkDuration = isWalking ? Math.max(0.1, 0.6 - (speed * 0.5)) : 0;

  return (
    <div 
      className={`relative flex items-center justify-center ${isWalking ? 'animate-walk' : ''}`}
      style={{ 
        width: size, 
        height: size,
        animationDuration: isWalking ? `${walkDuration}s` : '0s'
      }}
    >
      <svg 
        viewBox="0 0 16 16" 
        width={size} 
        height={size} 
        className="pixel-art"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Body */}
        <rect x="4" y="6" width="8" height="8" fill="#FFD700" />
        {/* Head */}
        <rect x="5" y="2" width="6" height="6" fill="#FFD700" />
        {/* Eyes */}
        <rect x="6" y="4" width="1" height="1" fill="black" />
        <rect x="9" y="4" width="1" height="1" fill="black" />
        {/* Mouth */}
        <rect x="7" y="6" width="2" height="1" fill="#FF4E00" />
        {/* Shirt/Body detail */}
        <rect x="4" y="8" width="8" height="4" fill="#00FF00" />
        {/* Legs */}
        <rect x="5" y="14" width="2" height="2" fill="black" />
        <rect x="9" y="14" width="2" height="2" fill="black" />
        
        {/* Arm for waving */}
        <motion.rect 
          x="12" y="8" width="2" height="4" fill="#FFD700"
          animate={isWaving ? { rotate: [0, -40, 0] } : {}}
          transition={isWaving ? { repeat: Infinity, duration: 0.5 } : {}}
          style={{ originX: "12px", originY: "8px" }}
        />
        {/* Other Arm */}
        <rect x="2" y="8" width="2" height="4" fill="#FFD700" />
      </svg>
    </div>
  );
};
