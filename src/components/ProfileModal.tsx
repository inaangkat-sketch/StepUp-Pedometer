import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Target, RotateCcw, Save } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  goal: number;
  onUpdate: (name: string, goal: number) => void;
  onReset: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ 
  isOpen, 
  onClose, 
  user, 
  goal, 
  onUpdate, 
  onReset 
}) => {
  const [name, setName] = useState(user.name);
  const [stepGoal, setStepGoal] = useState(goal);

  const handleSave = () => {
    onUpdate(name, stepGoal);
    onClose();
  };

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan.')) {
      onReset();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 flex items-center justify-between border-b border-white/5">
              <h2 className="font-pixel text-lg text-brand-primary uppercase tracking-tighter">Pengaturan Profil</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-6 h-6 text-white/60" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Name Input */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 font-pixel text-[10px] text-white/40 uppercase tracking-widest">
                  <User className="w-3 h-3" /> Nama Pengguna
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 font-medium text-white focus:outline-none focus:border-brand-primary/50 transition-colors"
                  placeholder="Masukkan nama..."
                />
              </div>

              {/* Goal Input */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 font-pixel text-[10px] text-white/40 uppercase tracking-widest">
                  <Target className="w-3 h-3" /> Target Langkah Harian
                </label>
                <input 
                  type="number" 
                  value={stepGoal}
                  onChange={(e) => setStepGoal(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 font-medium text-white focus:outline-none focus:border-brand-primary/50 transition-colors"
                  placeholder="Contoh: 10000"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 space-y-4">
                <button 
                  onClick={handleSave}
                  className="w-full bg-brand-primary text-black font-pixel text-sm py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(0,255,0,0.3)]"
                >
                  <Save className="w-5 h-5" /> Simpan Perubahan
                </button>
                
                <button 
                  onClick={handleReset}
                  className="w-full bg-red-500/10 text-red-500 border border-red-500/20 font-pixel text-[10px] py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all uppercase tracking-widest"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Semua Data
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
