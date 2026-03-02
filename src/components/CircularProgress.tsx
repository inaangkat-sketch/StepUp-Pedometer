import React from 'react';
import { motion } from 'motion/react';

interface CircularProgressProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  steps: number;
  goal: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 280,
  strokeWidth = 24,
  steps,
  goal
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  // Color logic: changes from orange to neon green as progress increases
  const getColor = () => {
    if (progress < 0.3) return '#FF4E00'; // Orange
    if (progress < 0.7) return '#FFD700'; // Gold
    return '#00FF00'; // Neon Green
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-zinc-200"
        />
        {/* Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.span 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl font-black tracking-tighter"
        >
          {steps.toLocaleString()}
        </motion.span>
        <span className="text-zinc-400 text-sm font-medium uppercase tracking-widest">
          Steps / {goal.toLocaleString()}
        </span>
        {progress >= 1 && (
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-2 px-3 py-1 bg-brand-primary text-black text-[10px] font-bold rounded-full uppercase tracking-tighter"
          >
            Goal Reached!
          </motion.div>
        )}
      </div>
    </div>
  );
};
