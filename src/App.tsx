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
import { StepData, Achievement, UserProfile } from './types';
import confetti from 'canvas-confetti';

const INITIAL_STEPS: StepData = {
  steps: 7420,
  goal: 10000,
  calories: 342,
  distance: 5.2,
  time: 84
};

const INITIAL_USER: UserProfile = {
  name: "Alex Rivera",
  streak: 12,
  totalSteps: 142000,
  level: 8
};

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: '1', title: 'Early Bird', description: 'Walk 1000 steps before 8 AM', icon: 'zap', unlocked: true, date: '2024-03-01' },
  { id: '2', title: 'Goal Smasher', description: 'Reach your daily goal 7 days in a row', icon: 'trophy', unlocked: true, date: '2024-02-28' },
  { id: '3', title: 'Marathoner', description: 'Walk 42km in a single week', icon: 'target', unlocked: false },
  { id: '4', title: 'Social Star', description: 'Share your progress 5 times', icon: 'star', unlocked: false },
  { id: '5', title: 'Night Owl', description: 'Walk 2000 steps after 10 PM', icon: 'shield', unlocked: true, date: '2024-02-25' },
  { id: '6', title: 'Streak Master', description: 'Maintain a 30-day streak', icon: 'flame', unlocked: false },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'social' | 'rewards'>('dashboard');
  const [stepData, setStepData] = useState<StepData>(INITIAL_STEPS);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [isGoalReached, setIsGoalReached] = useState(false);

  const progress = useMemo(() => Math.min(stepData.steps / stepData.goal, 1), [stepData.steps, stepData.goal]);

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
    setStepData(prev => ({
      ...prev,
      steps: prev.steps + amount,
      calories: prev.calories + Math.floor(amount * 0.04),
      distance: Number((prev.distance + amount * 0.0007).toFixed(1)),
      time: prev.time + Math.floor(amount / 100)
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-secondary flex items-center justify-center text-brand-primary">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">StepUp</h1>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Active Lifestyle</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-zinc-100 transition-colors relative">
            <Bell className="w-5 h-5 text-zinc-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-accent rounded-full border-2 border-white"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden border-2 border-white shadow-sm">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Welcome Section */}
              <div className="space-y-1">
                <h2 className="text-3xl font-black tracking-tighter uppercase italic">Hi, {user.name.split(' ')[0]}!</h2>
                <p className="text-zinc-500 font-medium">You're on a <span className="text-brand-accent font-bold">{user.streak} day streak</span>. Keep it up!</p>
              </div>

              {/* Main Progress */}
              <div className="flex justify-center py-4">
                <CircularProgress 
                  progress={progress} 
                  steps={stepData.steps} 
                  goal={stepData.goal} 
                />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <StepCard 
                  label="Calories" 
                  value={stepData.calories} 
                  unit="kcal" 
                  icon={Flame} 
                  color="bg-orange-500" 
                />
                <StepCard 
                  label="Distance" 
                  value={stepData.distance} 
                  unit="km" 
                  icon={MapPin} 
                  color="bg-blue-500" 
                />
                <StepCard 
                  label="Active Time" 
                  value={stepData.time} 
                  unit="min" 
                  icon={Clock} 
                  color="bg-emerald-500" 
                />
                <StepCard 
                  label="Streak" 
                  value={user.streak} 
                  unit="days" 
                  icon={Zap} 
                  color="bg-yellow-500" 
                />
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Quick Actions</h3>
                <div className="flex gap-4">
                  <button 
                    onClick={() => addSteps(500)}
                    className="flex-1 neo-brutal bg-brand-primary p-4 rounded-2xl flex items-center justify-center gap-2 font-bold uppercase tracking-tighter"
                  >
                    <Plus className="w-5 h-5" /> Add 500 Steps
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
              <SocialBoard steps={stepData.steps} goal={stepData.goal} userName={user.name} />
              
              <div className="mt-12 space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 px-2">Recent Activity</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="glass p-4 rounded-3xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Friend${i}`} alt="Friend" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Friend {i}</p>
                          <p className="text-xs text-zinc-400">Just reached their goal!</p>
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
                <h2 className="text-3xl font-black tracking-tighter uppercase italic">Rewards</h2>
                <p className="text-zinc-500 font-medium">Level {user.level} • {user.totalSteps.toLocaleString()} Total Steps</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {achievements.map(achievement => (
                  <RewardBadge key={achievement.id} achievement={achievement} />
                ))}
              </div>

              <div className="neo-brutal bg-zinc-900 text-white p-6 rounded-[32px] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-brand-primary uppercase tracking-widest">Next Milestone</p>
                    <h4 className="text-xl font-black tracking-tighter uppercase italic">150,000 Steps</h4>
                  </div>
                  <Trophy className="w-8 h-8 text-brand-primary" />
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '94%' }}
                    className="h-full bg-brand-primary"
                  />
                </div>
                <p className="text-xs text-zinc-400 font-medium">8,000 steps to reach Level 9</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 z-50">
        <div className="max-w-md mx-auto glass rounded-full p-2 flex items-center justify-between shadow-2xl border-white/40">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 flex flex-col items-center py-2 rounded-full transition-all ${activeTab === 'dashboard' ? 'bg-brand-secondary text-brand-primary' : 'text-zinc-400'}`}
          >
            <Activity className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter mt-1">Home</span>
          </button>
          <button 
            onClick={() => setActiveTab('social')}
            className={`flex-1 flex flex-col items-center py-2 rounded-full transition-all ${activeTab === 'social' ? 'bg-brand-secondary text-brand-primary' : 'text-zinc-400'}`}
          >
            <Users className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter mt-1">Social</span>
          </button>
          <button 
            onClick={() => setActiveTab('rewards')}
            className={`flex-1 flex flex-col items-center py-2 rounded-full transition-all ${activeTab === 'rewards' ? 'bg-brand-secondary text-brand-primary' : 'text-zinc-400'}`}
          >
            <Trophy className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter mt-1">Rewards</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
