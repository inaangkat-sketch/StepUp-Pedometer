import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Instagram, Facebook, Download, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SocialBoardProps {
  steps: number;
  goal: number;
  userName: string;
}

// Custom X (formerly Twitter) Icon
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const SocialBoard: React.FC<SocialBoardProps> = ({ steps, goal, userName }) => {
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const shareText = `Saya baru saja mencapai ${steps.toLocaleString()} langkah di StepUp! Ayo hidup sehat bersama. #StepUp #HealthyLife`;
  const shareUrl = window.location.href;

  const handleShare = (platform: string) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    switch (platform) {
      case 'x':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'instagram':
        // Instagram doesn't support direct web sharing for posts/stories via URL
        // We'll copy the text to clipboard as a fallback
        navigator.clipboard.writeText(shareText);
        setShowCopyFeedback(true);
        setTimeout(() => setShowCopyFeedback(false), 2000);
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setShowCopyFeedback(true);
        setTimeout(() => setShowCopyFeedback(false), 2000);
        break;
      case 'download':
        // Simulated download
        alert('Gambar pencapaian sedang disiapkan untuk diunduh...');
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: 'StepUp Achievement',
            text: shareText,
            url: shareUrl,
          }).catch(console.error);
        }
    }
  };

  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="font-pixel text-xs text-brand-primary tracking-tighter uppercase italic">Papan Sosial</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => handleShare('copy')}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 relative"
            title="Salin Teks"
          >
            {showCopyFeedback ? <Check className="w-4 h-4 text-brand-primary" /> : <Copy className="w-4 h-4 text-white" />}
          </button>
          <button 
            onClick={() => handleShare('download')}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
            title="Unduh Gambar"
          >
            <Download className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative overflow-hidden rounded-[40px] aspect-square bg-black text-white p-10 flex flex-col justify-between group cursor-pointer border border-white/10"
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
            <p className="text-[10px] text-zinc-400 font-medium tracking-tight">
              Dibagikan oleh <span className="text-white font-bold">@{userName.toLowerCase().replace(' ', '')}</span>
            </p>
          </div>
        </div>

        {/* Share Overlay */}
        <div className="absolute inset-0 bg-brand-primary/95 flex flex-col items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="font-pixel text-[10px] text-black uppercase tracking-widest font-bold">Bagikan Ke</p>
          <div className="flex gap-6">
            <button 
              onClick={(e) => { e.stopPropagation(); handleShare('instagram'); }} 
              className="p-4 bg-black rounded-full hover:scale-110 transition-transform group/btn"
              title="Instagram (Salin Teks)"
            >
              <Instagram className="w-6 h-6 text-white group-hover/btn:text-pink-500" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleShare('x'); }} 
              className="p-4 bg-black rounded-full hover:scale-110 transition-transform group/btn"
              title="Bagikan ke X"
            >
              <XIcon className="w-6 h-6 text-white group-hover/btn:text-brand-primary" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleShare('facebook'); }} 
              className="p-4 bg-black rounded-full hover:scale-110 transition-transform group/btn"
              title="Bagikan ke Facebook"
            >
              <Facebook className="w-6 h-6 text-white group-hover/btn:text-blue-500" />
            </button>
          </div>
          <AnimatePresence>
            {showCopyFeedback && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[10px] text-black font-bold uppercase"
              >
                Teks Berhasil Disalin!
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

