import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Flame, 
  MapPin, 
  Clock, 
  Trophy, 
  Users, 
  Settings, 
  Plus, 
  ChevronRight,
  Bell,
  Search,
  Zap,
  Star,
  Shield,
  Target
} from 'lucide-react';
import { CircularProgress } from './components/CircularProgress';
import { StepCard } from './components/StepCard';
import { SocialBoard } from './components/SocialBoard';
import { RewardBadge } from './components/RewardBadge';
import { PixelCharacter } from './components/PixelCharacter';
import { SplashScreen } from './components/SplashScreen';
import { StepData, Achievement, UserProfile } from './types';
import confetti from 'canvas-confetti';

import { StepUpLogo } from './components/StepUpLogo';

const INITIAL_STEPS: StepData = {
  steps: 0,
  goal: 10000,
  calories: 0,
  distance: 0,
  time: 0
};

const INITIAL_USER: UserProfile = {
  name: "Alex Rivera",
  streak: 12,
  totalSteps: 142000,
  level: 8
};

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: '1', title: 'Bangun Pagi', description: 'Jalan 1000 langkah sebelum jam 8 pagi', icon: 'zap', unlocked: true, date: '2024-03-01' },
  { id: '2', title: 'Penghancur Target', description: 'Capai target harian 7 hari berturut-turut', icon: 'trophy', unlocked: true, date: '2024-02-28' },
  { id: '3', title: 'Pelari Maraton', description: 'Jalan 42km dalam satu minggu', icon: 'target', unlocked: false },
  { id: '4', title: 'Bintang Sosial', description: 'Bagikan progresmu 5 kali', icon: 'star', unlocked: false },
  { id: '5', title: 'Burung Hantu', description: 'Jalan 2000 langkah setelah jam 10 malam', icon: 'shield', unlocked: true, date: '2024-02-25' },
  { id: '6', title: 'Ahli Runtun', description: 'Pertahankan rekor 30 hari', icon: 'flame', unlocked: false },
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'social' | 'rewards'>('dashboard');
  const [stepData, setStepData] = useState<StepData>(INITIAL_STEPS);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [isGoalReached, setIsGoalReached] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  const progress = useMemo(() => Math.min(stepData.steps / stepData.goal, 1), [stepData.steps, stepData.goal]);

  // Real-time tracking simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      setIsWalking(true);
      interval = setInterval(() => {
        // Simulate 1-3 steps every 800ms
        const randomSteps = Math.floor(Math.random() * 3) + 1;
        setStepData(prev => ({
          ...prev,
          steps: prev.steps + randomSteps,
          calories: prev.calories + Number((randomSteps * 0.04).toFixed(2)),
          distance: Number((prev.distance + randomSteps * 0.0007).toFixed(4)),
          time: prev.time + (1/60) // Add seconds
        }));
      }, 800);
    } else {
      setIsWalking(false);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  useEffect(() => {
    if (progress >= 1 && !isGoalReached) {
      setIsGoalReached(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00FF00', '#FF4E00', '#FFFFFF']
      });
    }
  }, [progress, isGoalReached]);

  const addSteps = (amount: number) => {
    setIsWalking(true);
    setStepData(prev => ({
      ...prev,
      steps: prev.steps + amount,
      calories: prev.calories + Math.floor(amount * 0.04),
      distance: Number((prev.distance + amount * 0.0007).toFixed(1)),
      time: prev.time + Math.floor(amount / 100)
    }));
    
    // Stop walking animation after a short delay if not tracking
    if (!isTracking) {
      setTimeout(() => setIsWalking(false), 1000);
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen pb-24 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/30 backdrop-blur-xl px-6 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-primary flex items-center justify-center text-black shadow-[0_0_15px_rgba(0,255,0,0.4)]">
            <StepUpLogo size={24} />
          </div>
          <div>
            <h1 className="font-pixel text-xs text-white tracking-tighter uppercase leading-none">StepUp</h1>
            <p className="text-[8px] font-bold text-brand-primary uppercase tracking-widest mt-1">Langkah Kaki</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors relative">
            <Bell className="w-5 h-5 text-white/80" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-accent rounded-full border-2 border-forest-deep"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden border-2 border-white/40 shadow-sm">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
              alt="Avatar" 
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-8 space-y-8">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              {/* Welcome Section */}
              <div className="space-y-2 text-center">
                <h2 className="font-pixel text-lg text-brand-primary tracking-tighter uppercase drop-shadow-[0_0_8px_rgba(0,255,0,0.3)]">Dasbor</h2>
                <p className="text-white/70 font-medium text-sm italic">"setiap langkah hari ini adalah investasi buat badan yang lebih segar besok"</p>
              </div>

              {/* Pixel Character Section */}
              <div className="flex flex-col items-center justify-center py-6 space-y-6 bg-white/5 rounded-[40px] border border-white/10 backdrop-blur-sm relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                  <div className="absolute top-10 left-10 w-20 h-20 bg-brand-primary rounded-full blur-[60px]" />
                  <div className="absolute bottom-10 right-10 w-20 h-20 bg-brand-accent rounded-full blur-[60px]" />
                </div>

                <div className="relative">
                  <PixelCharacter isWalking={isWalking} speed={isTracking ? 0.9 : 0.6} size={180} />
                </div>
                
                <div className="text-center space-y-4 relative z-10">
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-pixel text-4xl text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                      {Math.floor(stepData.steps).toLocaleString()}
                    </span>
                    <span className="font-pixel text-[10px] text-brand-primary uppercase tracking-widest">Langkah Kaki</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-8">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2 text-brand-accent">
                        <Flame className="w-4 h-4 fill-current" />
                        <span className="font-pixel text-xs">{Math.floor(stepData.calories)}</span>
                      </div>
                      <span className="font-pixel text-[8px] text-white/50 uppercase">Kalori</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2 text-blue-400">
                        <MapPin className="w-4 h-4 fill-current" />
                        <span className="font-pixel text-xs">{stepData.distance.toFixed(2)}</span>
                      </div>
                      <span className="font-pixel text-[8px] text-white/50 uppercase">KM</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="px-4 py-2 bg-black/40 rounded-xl inline-block border border-white/10">
                      <p className="font-pixel text-[8px] text-white/60 uppercase">
                        Target: <span className="text-brand-primary">{stepData.goal.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time Tracking Button */}
              <div className="px-2">
                <button 
                  onClick={() => setIsTracking(!isTracking)}
                  className={`w-full neo-brutal py-6 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all duration-500 ${
                    isTracking 
                      ? 'bg-brand-accent text-white shadow-[0_0_30px_rgba(255,78,0,0.4)]' 
                      : 'bg-brand-primary text-black'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isTracking ? <Zap className="w-6 h-6 animate-pulse" /> : <Activity className="w-6 h-6" />}
                    <span className="font-pixel text-sm uppercase tracking-tighter">
                      {isTracking ? 'Pelacakan Aktif...' : 'Mulai Melacak'}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">
                    {isTracking ? 'Berjalan di dalam kabut' : 'Mulai perjalananmu'}
                  </p>
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10">
                  <p className="text-white/40 text-[10px] font-pixel uppercase mb-2">Runtun</p>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-pixel text-xl">{user.streak}</span>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10">
                  <p className="text-white/40 text-[10px] font-pixel uppercase mb-2">Level</p>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-brand-primary fill-current" />
                    <span className="font-pixel text-xl">{user.level}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="font-pixel text-[10px] uppercase tracking-widest text-white/40 px-2">Tambahan Manual</h3>
                <div className="flex gap-4">
                  <button 
                    onClick={() => addSteps(500)}
                    className="flex-1 bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center justify-center gap-2 font-pixel text-[10px] uppercase tracking-tighter border border-white/10 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> +500 Langkah
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'social' && (
            <motion.div 
              key="social"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SocialBoard steps={Math.floor(stepData.steps)} goal={stepData.goal} userName={user.name} />
              
              <div className="mt-12 space-y-6">
                <h3 className="font-pixel text-[10px] uppercase tracking-widest text-white/40 px-2">Aktivitas Terbaru</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white/5 backdrop-blur-md p-4 rounded-3xl flex items-center justify-between border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Friend${i}`} alt="Friend" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Teman {i}</p>
                          <p className="text-xs text-white/40">Baru saja mencapai target!</p>
                        </div>
                      </div>
                      <button className="p-2 rounded-full bg-brand-primary/10 text-brand-primary">
                        <Zap className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'rewards' && (
            <motion.div 
              key="rewards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="space-y-1">
                <h2 className="font-pixel text-lg text-white tracking-tighter uppercase">Hadiah</h2>
                <p className="text-white/50 font-medium text-sm">Level {user.level} • {user.totalSteps.toLocaleString()} Total Langkah</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {achievements.map(achievement => (
                  <RewardBadge key={achievement.id} achievement={achievement} />
                ))}
              </div>

              <div className="bg-black/40 text-white p-6 rounded-[32px] space-y-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-pixel text-[8px] text-brand-primary uppercase tracking-widest">Target Berikutnya</p>
                    <h4 className="font-pixel text-xs tracking-tighter uppercase">150.000 Langkah</h4>
                  </div>
                  <Trophy className="w-6 h-6 text-brand-primary" />
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '94%' }}
                    className="h-full bg-brand-primary shadow-[0_0_10px_rgba(0,255,0,0.5)]"
                  />
                </div>
                <p className="text-[10px] text-white/40 font-medium">8.000 langkah lagi untuk mencapai Level 9</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 z-50">
        <div className="max-w-md mx-auto bg-black/40 backdrop-blur-2xl rounded-full p-2 flex items-center justify-between shadow-2xl border border-white/10">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 flex flex-col items-center py-2 rounded-full transition-all ${activeTab === 'dashboard' ? 'bg-brand-primary text-black' : 'text-white/40'}`}
          >
            <Activity className="w-6 h-6" />
            <span className="font-pixel text-[8px] uppercase tracking-tighter mt-1">Beranda</span>
          </button>
          <button 
            onClick={() => setActiveTab('social')}
            className={`flex-1 flex flex-col items-center py-2 rounded-full transition-all ${activeTab === 'social' ? 'bg-brand-primary text-black' : 'text-white/40'}`}
          >
            <Users className="w-6 h-6" />
            <span className="font-pixel text-[8px] uppercase tracking-tighter mt-1">Sosial</span>
          </button>
          <button 
            onClick={() => setActiveTab('rewards')}
            className={`flex-1 flex flex-col items-center py-2 rounded-full transition-all ${activeTab === 'rewards' ? 'bg-brand-primary text-black' : 'text-white/40'}`}
          >
            <Trophy className="w-6 h-6" />
            <span className="font-pixel text-[8px] uppercase tracking-tighter mt-1">Hadiah</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
