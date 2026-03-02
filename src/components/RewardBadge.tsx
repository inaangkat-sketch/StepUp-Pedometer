import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, Zap, Flame, Shield, Target } from 'lucide-react';
import { Achievement } from '../types';

interface RewardBadgeProps {
  achievement: Achievement;
}

const iconMap: Record<string, any> = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  flame: Flame,
  shield: Shield,
  target: Target,
};

export const RewardBadge: React.FC<RewardBadgeProps> = ({ achievement }) => {
  const Icon = iconMap[achievement.icon] || Trophy;

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className={`relative p-4 rounded-3xl flex flex-col items-center text-center gap-2 transition-all duration-300 ${
        achievement.unlocked 
          ? 'glass bg-white/90 border-brand-primary/20 shadow-lg' 
          : 'bg-zinc-100 opacity-40 grayscale'
      }`}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
        achievement.unlocked ? 'bg-brand-primary text-black' : 'bg-zinc-200 text-zinc-400'
      }`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h4 className="text-xs font-black uppercase tracking-tighter leading-none">{achievement.title}</h4>
        <p className="text-[10px] text-zinc-400 font-medium leading-tight">{achievement.description}</p>
      </div>
      {achievement.unlocked && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-accent rounded-full border-2 border-white"></div>
      )}
    </motion.div>
  );
};
