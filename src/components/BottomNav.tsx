import React from 'react';
import { 
  Home, 
  BookOpen, 
  Clock, 
  Compass, 
  Radio, 
  Calculator, 
  Sparkles,
  MapPin,
  MessageSquare
} from 'lucide-react';
import { AppTab } from '../types';

interface BottomNavProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  isPlayingRadio: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  isPlayingRadio,
}) => {
  const tabs = [
    { id: 'home' as AppTab, label: 'Beranda', icon: Home },
    { id: 'quran' as AppTab, label: "Al-Qur'an", icon: BookOpen },
    { id: 'prayer' as AppTab, label: 'Sholat', icon: Clock },
    { id: 'qibla' as AppTab, label: 'Kiblat', icon: Compass },
    { id: 'radio' as AppTab, label: 'Radio', icon: Radio, pulse: isPlayingRadio },
    { id: 'zakat' as AppTab, label: 'Zakat', icon: Calculator },
    { id: 'articles' as AppTab, label: 'Dzikir', icon: Sparkles },
    { id: 'community' as AppTab, label: 'Forum', icon: MessageSquare },
  ];

  return (
    <div className="lg:hidden fixed bottom-2 left-2 right-2 z-40 flex justify-center pointer-events-none">
      <nav 
        id="mobile-bottom-nav" 
        className="pointer-events-auto w-full max-w-md bg-[#ffffff]/90 dark:bg-[#1e242a]/90 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.09] shadow-2xl rounded-2xl px-2 py-1.5 transition-colors"
      >
        <div className="flex items-center justify-around overflow-x-auto no-scrollbar py-0.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id || (tab.id === 'articles' && activeTab === 'dzikir');

            return (
              <button
                key={tab.id}
                id={`btn-bottom-nav-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center min-w-[46px] py-1 px-1 rounded-xl transition-all relative group ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 dark:bg-emerald-500/15'
                    : 'text-stone-500 dark:text-zinc-400 hover:text-stone-800 dark:hover:text-zinc-200'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-105 stroke-[2.2]' : 'stroke-[1.8]'}`} />
                  {tab.pulse && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                  )}
                </div>
                <span className="text-[10px] mt-0.5 whitespace-nowrap leading-tight">{tab.label}</span>
                {isActive && (
                  <span className="absolute -bottom-0.5 w-3.5 h-1 bg-emerald-600 dark:bg-emerald-400 rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

