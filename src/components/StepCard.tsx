import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface StepCardProps {
  label: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  color: string;
}

export const StepCard: React.FC<StepCardProps> = ({ label, value, unit, icon: Icon, color }) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="glass p-5 rounded-3xl flex flex-col gap-3"
    >
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${color} bg-opacity-10`}>
        <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div>
        <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold tracking-tight">{value}</span>
          <span className="text-zinc-400 text-xs font-medium">{unit}</span>
        </div>
      </div>
    </motion.div>
  );
};
