import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PixelCharacter } from './PixelCharacter';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isWaving, setIsWaving] = useState(false);

  useEffect(() => {
    // Start waving after 2.5 seconds
    const waveTimer = setTimeout(() => {
      setIsWaving(true);
    }, 2500);

    // Complete splash screen after 4 seconds
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(waveTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#87CEEB] flex flex-col items-center justify-center overflow-hidden">
      {/* Nature Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        {/* Clouds */}
        <motion.div 
          animate={{ x: [-100, 500] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-24 h-12 bg-white rounded-full pixel-border"
        />
        <motion.div 
          animate={{ x: [500, -100] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 right-20 w-32 h-16 bg-white rounded-full pixel-border"
        />
        
        {/* Sun */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-400 rounded-full pixel-border animate-pulse" />
      </div>

      {/* Title */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative z-20 text-center px-6 mb-12"
      >
        <h1 className="font-pixel text-2xl md:text-3xl text-black tracking-tighter leading-tight drop-shadow-[4px_4px_0px_rgba(255,255,255,1)]">
          StepUp: <br />
          <span className="text-brand-accent">Petualangan Langkah Kaki</span>
        </h1>
      </motion.div>

      {/* Character and Path */}
      <div className="relative flex flex-col items-center">
        <PixelCharacter isWalking={!isWaving} isWaving={isWaving} size={150} />
        
        {/* Path */}
        <div className="w-64 h-8 bg-[#8B4513] mt-[-10px] pixel-border relative overflow-hidden">
          <motion.div 
            animate={{ x: [0, -40] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="w-10 h-full border-r-4 border-[#A0522D]" />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modern Accents */}
      <div className="absolute bottom-10 flex gap-4">
        <div className="px-4 py-2 bg-black text-brand-primary font-pixel text-[10px] pixel-border">
          MODERN
        </div>
        <div className="px-4 py-2 bg-brand-primary text-black font-pixel text-[10px] pixel-border">
          KEREN
        </div>
      </div>
    </div>
  );
};
