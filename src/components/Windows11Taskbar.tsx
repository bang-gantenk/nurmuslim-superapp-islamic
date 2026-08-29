import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Clock, 
  Compass, 
  Radio, 
  Calculator, 
  MapPin, 
  MessageSquare, 
  Sun, 
  Moon, 
  Bell, 
  Search, 
  User, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  X,
  Bookmark,
  Share2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { AppTab, CityLocation, RadioStation, UserProfile } from '../types';
import { INDONESIAN_CITIES } from '../data/prayerCalculation';
import { NurMuslimLogo } from './NurMuslimLogo';

interface Windows11TaskbarProps {
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

export const Windows11Taskbar: React.FC<Windows11TaskbarProps> = ({
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
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isSearchFlyoutOpen, setIsSearchFlyoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState<string>('');

  const startMenuRef = useRef<HTMLDivElement>(null);
  const searchFlyoutRef = useRef<HTMLDivElement>(null);

  // Live clock for Windows 11 Taskbar tray
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close flyouts on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (startMenuRef.current && !startMenuRef.current.contains(e.target as Node)) {
        setIsStartMenuOpen(false);
      }
      if (searchFlyoutRef.current && !searchFlyoutRef.current.contains(e.target as Node)) {
        setIsSearchFlyoutOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home' as AppTab, label: 'Beranda', icon: Sparkles, color: 'text-amber-500' },
    { id: 'quran' as AppTab, label: "Al-Qur'an", icon: BookOpen, color: 'text-emerald-500' },
    { id: 'prayer' as AppTab, label: 'Sholat', icon: Clock, color: 'text-teal-500' },
    { id: 'qibla' as AppTab, label: 'Kiblat', icon: Compass, color: 'text-cyan-500' },
    { id: 'radio' as AppTab, label: 'Radio', icon: Radio, color: 'text-rose-500', pulse: isPlayingRadio },
    { id: 'zakat' as AppTab, label: 'Zakat', icon: Calculator, color: 'text-amber-500' },
    { id: 'articles' as AppTab, label: 'Dzikir', icon: Sparkles, color: 'text-indigo-500' },
    { id: 'mosques' as AppTab, label: 'Masjid', icon: MapPin, color: 'text-emerald-500' },
    { id: 'community' as AppTab, label: 'Komunitas', icon: MessageSquare, color: 'text-blue-500' },
  ];

  return (
    <>
      {/* 1. Windows 11 Start Menu Flyout Popup */}
      {isStartMenuOpen && (
        <div
          ref={startMenuRef}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 z-50 w-[92vw] sm:w-[500px] bg-[#ffffff]/95 dark:bg-[#1c2228]/95 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Start Menu Header */}
          <div className="p-5 border-b border-black/[0.06] dark:border-white/[0.06]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <NurMuslimLogo size="sm" />
                <div>
                  <h4 className="font-extrabold text-sm text-stone-900 dark:text-zinc-100">
                    NurMuslim Start Menu
                  </h4>
                  <p className="text-[11px] text-stone-500 dark:text-zinc-400">
                    Pusat Navigasi & Ibadah Harian
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsStartMenuOpen(false)}
                className="p-1 rounded-lg hover:bg-stone-200 dark:hover:bg-zinc-800 text-stone-400 dark:text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Search inside Start Menu */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-100 dark:bg-zinc-800/80 border border-black/[0.04] dark:border-white/[0.06]">
              <Search className="w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Cari surat, doa, atau menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-stone-800 dark:text-zinc-100 outline-none"
              />
            </div>
          </div>

          {/* Pinned Applications Grid */}
          <div className="p-5 max-h-[50vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-stone-700 dark:text-zinc-300">
                Fitur Utama (Pinned)
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                9 Aplikasi
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-3 gap-2.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id || (item.id === 'articles' && activeTab === 'dzikir');
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsStartMenuOpen(false);
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all group text-center ${
                      isActive
                        ? 'bg-emerald-500/15 dark:bg-emerald-500/20 border border-emerald-500/30'
                        : 'hover:bg-stone-100 dark:hover:bg-zinc-800/70 border border-transparent'
                    }`}
                  >
                    <div className={`p-2 rounded-lg bg-stone-100 dark:bg-zinc-800 group-hover:scale-110 transition-transform mb-1.5 ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-stone-800 dark:text-zinc-200">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Start Menu Footer Profile & Power */}
          <div className="p-3 px-5 bg-stone-50/80 dark:bg-zinc-900/80 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
            <div 
              onClick={() => {
                setIsStartMenuOpen(false);
                if (onOpenAuthModal) onOpenAuthModal();
              }}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center justify-center text-sm font-bold">
                {currentUser?.avatar || '🌿'}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-stone-900 dark:text-zinc-100 leading-tight">
                  {currentUser?.name || 'Tamu'}
                </p>
                <p className="text-[10px] text-stone-500 dark:text-zinc-400">
                  {currentUser?.isLoggedIn ? 'Akun Terverifikasi' : 'Ketuk untuk Masuk'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-stone-200 dark:hover:bg-zinc-800 text-stone-600 dark:text-zinc-300 transition-colors"
                title={darkMode ? 'Mode Terang' : 'Mode Gelap'}
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Floating Windows 11 Modern Taskbar Dock at the Bottom */}
      <div 
        id="windows11-floating-taskbar-dock" 
        className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] max-w-fit transition-all duration-300 select-none"
      >
        <div className="flex items-center justify-center p-1.5 sm:p-2 rounded-2xl sm:rounded-2xl bg-[#ffffff]/85 dark:bg-[#1a2026]/85 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.1] shadow-2xl shadow-black/25 gap-1 sm:gap-2">
          
          {/* Windows Start Button (NurMuslim Emblem) */}
          <button
            id="win11-start-button"
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
            className={`p-1.5 sm:p-2 rounded-xl transition-all group flex items-center justify-center shrink-0 ${
              isStartMenuOpen
                ? 'bg-emerald-600/20 ring-2 ring-emerald-500/50 scale-95'
                : 'hover:bg-stone-200/60 dark:hover:bg-zinc-800/70 hover:scale-105 active:scale-95'
            }`}
            title="Start Menu (NurMuslim)"
          >
            <div className="drop-shadow-sm">
              <NurMuslimLogo size="xs" />
            </div>
          </button>

          {/* Windows 11 Search Trigger (Desktop/Tablet) */}
          <div className="hidden md:flex items-center">
            <div 
              onClick={() => setIsStartMenuOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-stone-100/70 dark:bg-zinc-800/60 border border-black/[0.04] dark:border-white/[0.06] hover:bg-white dark:hover:bg-zinc-800 cursor-pointer text-stone-500 dark:text-zinc-400 transition-all text-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium hidden lg:inline">Cari...</span>
            </div>
          </div>

          <div className="h-5 w-[1px] bg-black/[0.08] dark:bg-white/[0.1] mx-0.5 sm:mx-1 shrink-0"></div>

          {/* Windows 11 Taskbar App Icons (Centered Dock) */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.id === 'articles' && activeTab === 'dzikir');

              return (
                <button
                  key={item.id}
                  id={`dock-tab-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsStartMenuOpen(false);
                  }}
                  className={`relative flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 group shrink-0 ${
                    isActive
                      ? 'bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 font-bold shadow-2xs border border-emerald-500/25'
                      : 'text-stone-600 dark:text-zinc-400 hover:bg-stone-200/60 dark:hover:bg-zinc-800/60 hover:text-stone-900 dark:hover:text-zinc-100'
                  }`}
                  title={item.label}
                >
                  <div className="relative">
                    <Icon className={`w-4 h-4 sm:w-4 sm:h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
                    {item.pulse && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping absolute -top-1 -right-1"></span>
                    )}
                  </div>
                  
                  {/* Label on larger screens */}
                  <span className="hidden xl:inline text-[11px] font-medium">
                    {item.label}
                  </span>

                  {/* Windows 11 Signature Active Bottom Indicator Dot/Pill */}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3.5 sm:w-4 h-1 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="h-5 w-[1px] bg-black/[0.08] dark:bg-white/[0.1] mx-0.5 sm:mx-1 shrink-0"></div>

          {/* Windows 11 Floating System Tray (Right Section) */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            
            {/* Live Radio Station Widget (if playing) */}
            {currentRadio && isPlayingRadio && (
              <button
                onClick={() => setActiveTab('radio')}
                className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30 animate-pulse text-[11px] font-semibold"
                title={`Memutar: ${currentRadio.name}`}
              >
                <Radio className="w-3 h-3 text-amber-500" />
                <span className="max-w-[70px] truncate">{currentRadio.name}</span>
                <Volume2 className="w-3 h-3 text-amber-500" />
              </button>
            )}

            {/* Adzan Bell Button */}
            <button
              onClick={onOpenAdzanTest}
              className="p-1.5 sm:p-2 rounded-xl hover:bg-stone-200/60 dark:hover:bg-zinc-800/60 text-stone-600 dark:text-zinc-300 transition-colors"
              title="Simulasi Notifikasi Adzan"
            >
              <Bell className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </button>

            {/* City Selector (Windows Flyout) */}
            <div className="hidden sm:block">
              <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-stone-100/80 dark:bg-zinc-800/70 border border-black/[0.04] dark:border-white/[0.06] text-[11px] text-stone-700 dark:text-zinc-200">
                <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <select
                  value={selectedCity.id}
                  onChange={(e) => {
                    const found = INDONESIAN_CITIES.find(c => c.id === e.target.value);
                    if (found) setSelectedCity(found);
                  }}
                  className="bg-transparent border-none outline-none font-semibold cursor-pointer max-w-[80px] truncate"
                >
                  {INDONESIAN_CITIES.map(city => (
                    <option key={city.id} value={city.id} className="dark:bg-zinc-800 text-stone-900 dark:text-zinc-100">
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 sm:p-2 rounded-xl hover:bg-stone-200/60 dark:hover:bg-zinc-800/60 text-stone-600 dark:text-zinc-300 transition-colors"
              title={darkMode ? 'Mode Terang' : 'Mode Gelap'}
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
            </button>

            {/* User Account / Profile */}
            {onOpenAuthModal && (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-1 p-1 sm:px-2 sm:py-1 rounded-xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 text-[11px] font-bold hover:bg-emerald-600/20 transition-all"
                title={currentUser?.isLoggedIn ? `Akun: ${currentUser.name}` : 'Masuk / Daftar Akun'}
              >
                <span className="text-xs">{currentUser?.avatar || '🌿'}</span>
                <span className="max-w-[65px] truncate hidden md:inline font-semibold">
                  {currentUser?.isLoggedIn ? currentUser.name.split(' ')[0] : 'Masuk'}
                </span>
              </button>
            )}

            {/* System Clock & Hijri Widget */}
            <div className="hidden sm:flex flex-col items-end px-1.5 text-[10px] text-stone-600 dark:text-zinc-300 leading-none">
              <span className="font-bold text-[11px] text-stone-900 dark:text-zinc-100">{currentTime}</span>
              <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">{hijriDate}</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
