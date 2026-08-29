import React, { useState } from 'react';
import { 
  Compass, 
  BookOpen, 
  Clock, 
  Radio, 
  Calculator, 
  MapPin, 
  MessageSquare, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Bell, 
  Sparkles,
  User,
  ShieldCheck,
  Search,
  Minus,
  Square,
  X,
  Layers,
  ChevronDown,
  Globe
} from 'lucide-react';
import { AppTab, CityLocation, RadioStation, UserProfile } from '../types';
import { INDONESIAN_CITIES } from '../data/prayerCalculation';
import { NurMuslimLogo } from './NurMuslimLogo';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  selectedCity: CityLocation;
  setSelectedCity: (city: CityLocation) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  currentRadio: RadioStation | null;
  isPlayingRadio: boolean;
  toggleRadioPlay: () => void;
  hijriDate: string;
  onOpenAdzanTest: () => void;
  currentUser?: UserProfile;
  onOpenAuthModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedCity,
  setSelectedCity,
  darkMode,
  setDarkMode,
  currentRadio,
  isPlayingRadio,
  toggleRadioPlay,
  hijriDate,
  onOpenAdzanTest,
  currentUser,
  onOpenAuthModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isWindowMaximized, setIsWindowMaximized] = useState(false);

  const navItems = [
    { id: 'home' as AppTab, label: 'Beranda', icon: Sparkles },
    { id: 'quran' as AppTab, label: "Al-Qur'an", icon: BookOpen },
    { id: 'prayer' as AppTab, label: 'Jadwal Sholat', icon: Clock },
    { id: 'qibla' as AppTab, label: 'Arah Kiblat', icon: Compass },
    { id: 'radio' as AppTab, label: 'Radio Sunnah', icon: Radio, pulse: isPlayingRadio },
    { id: 'zakat' as AppTab, label: 'Zakat', icon: Calculator },
    { id: 'articles' as AppTab, label: 'Dzikir & Doa', icon: Sparkles },
    { id: 'mosques' as AppTab, label: 'Masjid', icon: MapPin },
    { id: 'community' as AppTab, label: 'Komunitas', icon: MessageSquare },
  ];

  return (
    <header id="app-header" className="sticky top-0 z-40 w-full select-none transition-colors">
      {/* 1. Windows 11 Mica Title Bar (Top Window Frame) */}
      <div className="bg-[#f3f4f6]/95 dark:bg-[#1a2026]/95 backdrop-blur-xl border-b border-black/[0.08] dark:border-white/[0.08] text-xs text-stone-700 dark:text-zinc-300">
        <div className="max-w-[1340px] mx-auto px-2 sm:px-4 h-9 flex items-center justify-between gap-2">
          
          {/* Left: Windows App Icon + Title */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity shrink-0"
          >
            <div className="flex items-center justify-center">
              <NurMuslimLogo size="xs" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-stone-900 dark:text-zinc-100 text-[12px] tracking-tight">
                NurMuslim
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800/60">
                Fluent
              </span>
              <span className="hidden md:inline text-stone-400 dark:text-zinc-500 text-[11px]">
                — SuperApp Islami Indonesia
              </span>
            </div>
          </div>

          {/* Center: Windows 11 Fluent Search Box */}
          <div className="hidden lg:flex items-center flex-1 max-w-sm mx-4">
            <div className="w-full flex items-center gap-2 px-3 py-1 rounded-md bg-white/70 dark:bg-zinc-800/60 border border-black/[0.06] dark:border-white/[0.08] shadow-2xs hover:bg-white dark:hover:bg-zinc-800 transition-all focus-within:border-emerald-500 focus-within:bg-white dark:focus-within:bg-zinc-900">
              <Search className="w-3.5 h-3.5 text-stone-400 dark:text-zinc-500 shrink-0" />
              <input
                type="text"
                placeholder="Cari surat, doa, jadwal sholat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    setActiveTab('quran');
                  }
                }}
                className="w-full bg-transparent text-xs text-stone-800 dark:text-zinc-100 placeholder:text-stone-400 dark:placeholder:text-zinc-500 outline-none"
              />
              <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-stone-200/60 dark:bg-zinc-700/60 text-stone-500 dark:text-zinc-400">
                Enter
              </span>
            </div>
          </div>

          {/* Right: Windows System Tray & Window Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Hijri Date Pill */}
            <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-[11px] font-medium">
              <span>🌙</span>
              <span>{hijriDate}</span>
            </div>

            {/* Adzan Preview Bell */}
            <button
              id="btn-adzan-test-preview"
              onClick={onOpenAdzanTest}
              className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-stone-200/70 dark:hover:bg-zinc-800 text-stone-600 dark:text-zinc-300 text-[11px] font-medium transition-colors"
              title="Simulasi Notifikasi Suara Adzan"
            >
              <Bell className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden xl:inline">Tes Adzan</span>
            </button>

            {/* Radio Mini Indicator */}
            {currentRadio && (
              <button
                id="btn-radio-mini-toggle"
                onClick={() => {
                  setActiveTab('radio');
                  if (!isPlayingRadio) toggleRadioPlay();
                }}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] transition-all ${
                  isPlayingRadio 
                    ? 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30 animate-pulse font-semibold' 
                    : 'hover:bg-stone-200/70 dark:hover:bg-zinc-800 text-stone-500 dark:text-zinc-400'
                }`}
                title={isPlayingRadio ? `Sedang memutar: ${currentRadio.name}` : 'Buka Radio Sunnah'}
              >
                <Radio className="w-3 h-3 text-amber-500" />
                <span className="max-w-[80px] sm:max-w-[100px] truncate hidden sm:inline">{currentRadio.name}</span>
                {isPlayingRadio ? <Volume2 className="w-3 h-3 text-amber-500" /> : <VolumeX className="w-3 h-3 opacity-50" />}
              </button>
            )}

            {/* Location Selector (Windows 11 Flyout Style) */}
            <div className="relative">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-200/60 dark:bg-zinc-800/80 border border-black/[0.05] dark:border-white/[0.06] text-[11px] text-stone-700 dark:text-zinc-200">
                <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <select
                  id="city-location-select"
                  value={selectedCity.id}
                  onChange={(e) => {
                    const found = INDONESIAN_CITIES.find(c => c.id === e.target.value);
                    if (found) setSelectedCity(found);
                  }}
                  className="bg-transparent border-none outline-none font-semibold cursor-pointer max-w-[85px] sm:max-w-[120px] truncate"
                >
                  {INDONESIAN_CITIES.map(city => (
                    <option key={city.id} value={city.id} className="dark:bg-zinc-800 text-stone-900 dark:text-zinc-100">
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Theme Switcher Toggle */}
            <button
              id="btn-toggle-dark-mode"
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 rounded-md hover:bg-stone-200/80 dark:hover:bg-zinc-800 text-stone-600 dark:text-zinc-300 transition-colors"
              title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
            </button>

            {/* User Profile Pill */}
            {onOpenAuthModal && (
              <button
                id="btn-navbar-auth-profile"
                onClick={onOpenAuthModal}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold transition-all ${
                  currentUser?.isLoggedIn
                    ? 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                }`}
                title={currentUser?.isLoggedIn ? `Akun: ${currentUser.name}` : 'Masuk / Daftar Akun'}
              >
                {currentUser?.isLoggedIn ? (
                  <>
                    <span className="text-xs">{currentUser.avatar || '🧔'}</span>
                    <span className="max-w-[70px] truncate hidden sm:inline font-semibold">
                      {currentUser.name.split(' ')[0]}
                    </span>
                  </>
                ) : (
                  <>
                    <User className="w-3 h-3" />
                    <span>Masuk</span>
                  </>
                )}
              </button>
            )}

            {/* Windows 11 Standard Window Controls */}
            <div className="flex items-center ml-1 border-l border-black/[0.08] dark:border-white/[0.08] pl-1">
              <button
                type="button"
                className="p-1.5 hover:bg-stone-200 dark:hover:bg-zinc-700/70 text-stone-500 dark:text-zinc-400 rounded transition-colors"
                title="Minimize Window"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => setIsWindowMaximized(!isWindowMaximized)}
                className="p-1.5 hover:bg-stone-200 dark:hover:bg-zinc-700/70 text-stone-500 dark:text-zinc-400 rounded transition-colors"
                title={isWindowMaximized ? 'Restore' : 'Maximize Window'}
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
        </div>
      </div>

      {/* 2. Windows 11 Centered Taskbar Navigation Dock */}
      <div className="bg-[#fbfbfb]/90 dark:bg-[#1f2429]/90 backdrop-blur-2xl border-b border-black/[0.06] dark:border-white/[0.06] shadow-2xs">
        <div className="max-w-[1340px] mx-auto px-4 py-2 flex items-center justify-between gap-4">
          
          {/* Main Brand with Transparent Logo */}
          <div 
            id="brand-logo"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="group-hover:scale-105 transition-transform drop-shadow-sm flex items-center justify-center">
              <NurMuslimLogo size="sm" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base text-stone-900 dark:text-zinc-100 tracking-tight leading-none">
                  NurMuslim
                </span>
                <span className="text-[9px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50">
                  SuperApp
                </span>
              </div>
              <p className="text-[10px] text-stone-500 dark:text-zinc-400 font-medium hidden xl:block mt-0.5">
                Sahabat Ibadah & Sunnah
              </p>
            </div>
          </div>

          {/* Windows 11 Centered Apps Dock */}
          <nav id="desktop-nav-links" className="hidden lg:flex items-center justify-center gap-1 flex-1 max-w-4xl mx-auto overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.id === 'articles' && activeTab === 'dzikir');

              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 group shrink-0 ${
                    isActive
                      ? 'bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 shadow-2xs font-bold border border-emerald-500/30'
                      : 'text-stone-600 dark:text-zinc-400 hover:bg-stone-200/60 dark:hover:bg-zinc-800/70 hover:text-stone-900 dark:hover:text-zinc-100 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
                  <span>{item.label}</span>
                  {item.pulse && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping absolute top-1.5 right-1.5"></span>
                  )}
                  
                  {/* Windows 11 Signature Active Indicator Pill */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-emerald-600 dark:bg-emerald-400 transition-all"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action Widget / Status (Right Side) */}
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-zinc-800/80 border border-black/[0.04] dark:border-white/[0.06] text-[11px] text-stone-600 dark:text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-stone-800 dark:text-zinc-200">Online 1447 H</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

