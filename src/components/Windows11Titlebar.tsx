import React, { useState } from 'react';
import { Minus, Square, X, Search, MapPin, Bell } from 'lucide-react';
import { CityLocation, AppTab } from '../types';
import { INDONESIAN_CITIES } from '../data/prayerCalculation';
import { NurMuslimLogo } from './NurMuslimLogo';

interface Windows11TitlebarProps {
  setActiveTab: (tab: AppTab) => void;
  selectedCity: CityLocation;
  setSelectedCity: (city: CityLocation) => void;
  hijriDate: string;
  onOpenAdzanTest: () => void;
}

export const Windows11Titlebar: React.FC<Windows11TitlebarProps> = ({
  setActiveTab,
  selectedCity,
  setSelectedCity,
  hijriDate,
  onOpenAdzanTest,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full select-none bg-[#f3f4f6]/95 dark:bg-[#151a1f]/95 backdrop-blur-xl border-b border-black/[0.08] dark:border-white/[0.08] text-xs text-stone-700 dark:text-zinc-300">
      <div className="max-w-[1280px] mx-auto px-2 sm:px-4 h-9 flex items-center justify-between gap-2">
        
        {/* App Icon + App Name */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity shrink-0"
        >
          <NurMuslimLogo size="xs" />
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-stone-900 dark:text-zinc-100 text-[12px] tracking-tight">
              NurMuslim
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800/60">
              SuperApp
            </span>
            <span className="hidden md:inline text-stone-400 dark:text-zinc-500 text-[11px]">
              — Sahabat Ibadah & Sunnah Indonesia
            </span>
          </div>
        </div>

        {/* Center Quick Badge */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-[11px] font-semibold">
            <span>🌙 {hijriDate}</span>
          </div>
        </div>

        {/* Right: Window Controls */}
        <div className="flex items-center gap-1">
          {/* Quick Location */}
          <div className="flex sm:hidden items-center gap-1 px-1.5 py-0.5 rounded bg-stone-200/60 dark:bg-zinc-800/80 text-[10px]">
            <MapPin className="w-2.5 h-2.5 text-emerald-600" />
            <select
              value={selectedCity.id}
              onChange={(e) => {
                const found = INDONESIAN_CITIES.find(c => c.id === e.target.value);
                if (found) setSelectedCity(found);
              }}
              className="bg-transparent border-none outline-none font-semibold cursor-pointer max-w-[65px] truncate"
            >
              {INDONESIAN_CITIES.map(city => (
                <option key={city.id} value={city.id} className="dark:bg-zinc-800 text-stone-900 dark:text-zinc-100">
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="p-1.5 hover:bg-stone-200 dark:hover:bg-zinc-700/70 text-stone-500 dark:text-zinc-400 rounded transition-colors"
            title="Minimize"
          >
            <Minus className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1.5 hover:bg-stone-200 dark:hover:bg-zinc-700/70 text-stone-500 dark:text-zinc-400 rounded transition-colors"
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            <Square className="w-2.5 h-2.5" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className="p-1.5 hover:bg-rose-500 hover:text-white text-stone-500 dark:text-zinc-400 rounded transition-colors"
            title="Close"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    </header>
  );
};
