import React from 'react';
import { motion } from 'motion/react';
import { Share2, Instagram, Twitter, Facebook, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SocialBoardProps {
  steps: number;
  goal: number;
  userName: string;
}

export const SocialBoard: React.FC<SocialBoardProps> = ({ steps, goal, userName }) => {
  const handleShare = (platform: string) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    console.log(`Sharing to ${platform}...`);
    // In a real app, this would use the Web Share API or platform-specific SDKs
  };

  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="font-pixel text-xs text-brand-primary tracking-tighter uppercase italic">Papan Sosial</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => handleShare('download')}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
          >
            <Download className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative overflow-hidden rounded-[40px] aspect-square bg-black text-white p-10 flex flex-col justify-between group cursor-pointer border border-white/10"
        onClick={() => handleShare('general')}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary via-transparent to-transparent"></div>
          <div className="grid grid-cols-10 gap-4 p-4">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex justify-between items-start">
          <div className="space-y-1">
            <p className="font-pixel text-[8px] uppercase tracking-widest text-brand-primary">Pencapaian StepUp</p>
            <h3 className="font-pixel text-xl leading-none tracking-tighter italic uppercase">
              {steps >= goal ? 'Target Terlampaui!' : 'Sedang Berusaha'}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center shadow-[0_0_15px_rgba(0,255,0,0.5)]">
            <Share2 className="w-6 h-6 text-black" />
          </div>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="font-pixel text-5xl tracking-tighter leading-none">{steps.toLocaleString()}</span>
            <span className="font-pixel text-xs text-zinc-500 uppercase italic">Langkah</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-zinc-400 font-medium tracking-tight">
              Dibagikan oleh <span className="text-white font-bold">@{userName.toLowerCase().replace(' ', '')}</span>
            </p>
          </div>
        </div>

        {/* Share Overlay */}
        <div className="absolute inset-0 bg-brand-primary/90 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={(e) => { e.stopPropagation(); handleShare('instagram'); }} className="p-4 bg-black rounded-full hover:scale-110 transition-transform">
            <Instagram className="w-6 h-6 text-white" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleShare('twitter'); }} className="p-4 bg-black rounded-full hover:scale-110 transition-transform">
            <Twitter className="w-6 h-6 text-white" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleShare('facebook'); }} className="p-4 bg-black rounded-full hover:scale-110 transition-transform">
            <Facebook className="w-6 h-6 text-white" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
