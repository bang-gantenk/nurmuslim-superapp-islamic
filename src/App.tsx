import React, { useState, useEffect, useRef } from 'react';
import { 
  AppTab, 
  CityLocation, 
  PrayerTimeSchedule, 
  RadioStation, 
  Bookmark,
  UserProfile
} from './types';
import { INDONESIAN_CITIES, calculatePrayerTimes, playAdzanChime } from './data/prayerCalculation';
import { RADIO_STATIONS } from './data/radioChannels';

// Components
import { Windows11Titlebar } from './components/Windows11Titlebar';
import { Windows11Taskbar } from './components/Windows11Taskbar';
import { HomeDashboard } from './components/HomeDashboard';
import { QuranView } from './components/QuranView';
import { PrayerTimesView } from './components/PrayerTimesView';
import { QiblaCompassView } from './components/QiblaCompassView';
import { ZakatCalculatorView } from './components/ZakatCalculatorView';
import { RadioSunnahView } from './components/RadioSunnahView';
import { ArticlesAndDoaView } from './components/ArticlesAndDoaView';
import { MosqueFinderView } from './components/MosqueFinderView';
import { CommunityForumView } from './components/CommunityForumView';
import { AdzanNotificationModal } from './components/AdzanNotificationModal';
import { AuthModal } from './components/AuthModal';
import { AuthGateScreen } from './components/AuthGateScreen';

export default function App() {
  // Theme state (Elegant Dark mode default)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('nurmuslim_theme');
    if (saved) return saved === 'dark';
    return true; // Default to Elegant Dark mode
  });

  // Active Tab state
  const [activeTab, setActiveTab] = useState<AppTab>('home');

  // User Profile / Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('nurmuslim_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      id: 'guest',
      name: 'Tamu',
      email: '',
      avatar: '🌿',
      cityId: 'jakarta',
      cityName: 'Jakarta',
      joinedDate: '',
      isLoggedIn: false,
      role: 'Member',
    };
  });

  // Auth gate status (shows landing auth screen if not logged in and hasn't chosen to explore)
  const [hasPassedAuthGate, setHasPassedAuthGate] = useState<boolean>(() => {
    const savedUser = localStorage.getItem('nurmuslim_user_profile');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.isLoggedIn) return true;
      } catch (e) {}
    }
    return sessionStorage.getItem('nurmuslim_gate_passed') === 'true';
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Selected City for Prayer Times & Qibla
  const [selectedCity, setSelectedCity] = useState<CityLocation>(() => {
    const saved = localStorage.getItem('nurmuslim_city');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INDONESIAN_CITIES[0]; // Default Jakarta
  });

  // Prayer Times calculation state
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeSchedule>(() => {
    const tzOffset = selectedCity.timezone === 'WIT' ? 9 : selectedCity.timezone === 'WITA' ? 8 : 7;
    return calculatePrayerTimes(selectedCity.latitude, selectedCity.longitude, tzOffset);
  });

  // Next Prayer Countdown
  const [nextPrayerName, setNextPrayerName] = useState<string>('Subuh');
  const [timeRemainingNextPrayer, setTimeRemainingNextPrayer] = useState<string>('00:00:00');

  // Al-Qur'an Bookmarks
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem('nurmuslim_bookmarks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      { surahNumber: 18, surahName: 'Al-Kahf', verseNumber: 1, timestamp: Date.now() },
    ];
  });

  // Target Surah/Ayah for deep linking
  const [initialSurahNumber, setInitialSurahNumber] = useState<number>(1);
  const [initialVerseNumber, setInitialVerseNumber] = useState<number>(1);

  // Radio Streaming Engine State & Resilient Fallback Signal
  const [currentRadio, setCurrentRadio] = useState<RadioStation>(RADIO_STATIONS[0]);
  const [isPlayingRadio, setIsPlayingRadio] = useState<boolean>(false);
  const [isLowBandwidth, setIsLowBandwidth] = useState<boolean>(true);
  const [streamIndex, setStreamIndex] = useState<number>(0);
  const [streamStatus, setStreamStatus] = useState<'idle' | 'connecting' | 'playing' | 'buffering' | 'fallback'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Notification Modal
  const [isAdzanModalOpen, setIsAdzanModalOpen] = useState<boolean>(false);
  const [adzanNotificationEnabled, setAdzanNotificationEnabled] = useState<boolean>(() => {
    return localStorage.getItem('nurmuslim_adzan_notif') === 'true';
  });

  const radioAudioRef = useRef<HTMLAudioElement | null>(null);
  const retryTimeoutRef = useRef<any>(null);

  // Apply dark mode class to html document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nurmuslim_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nurmuslim_theme', 'light');
    }
  }, [darkMode]);

  // Save selected city
  useEffect(() => {
    localStorage.setItem('nurmuslim_city', JSON.stringify(selectedCity));
    const tzOffset = selectedCity.timezone === 'WIT' ? 9 : selectedCity.timezone === 'WITA' ? 8 : 7;
    setPrayerTimes(calculatePrayerTimes(selectedCity.latitude, selectedCity.longitude, tzOffset));
  }, [selectedCity]);

  // Save bookmarks
  useEffect(() => {
    localStorage.setItem('nurmuslim_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Save adzan notif preference
  useEffect(() => {
    localStorage.setItem('nurmuslim_adzan_notif', String(adzanNotificationEnabled));
  }, [adzanNotificationEnabled]);

  // Recalculate Prayer Times & Countdown ticker every second
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tzOffset = selectedCity.timezone === 'WIT' ? 9 : selectedCity.timezone === 'WITA' ? 8 : 7;
      const sched = calculatePrayerTimes(selectedCity.latitude, selectedCity.longitude, tzOffset, now);
      setPrayerTimes(sched);

      // determine next prayer
      const currentHours = now.getHours();
      const currentMins = now.getMinutes();
      const currentSecs = now.getSeconds();
      const nowTotalSecs = currentHours * 3600 + currentMins * 60 + currentSecs;

      const prayerSequence = [
        { name: 'Imsak', timeStr: sched.imsak },
        { name: 'Subuh', timeStr: sched.subuh },
        { name: 'Terbit', timeStr: sched.terbit },
        { name: 'Dhuha', timeStr: sched.dhuha },
        { name: 'Dzuhur', timeStr: sched.dzuhur },
        { name: 'Ashar', timeStr: sched.ashar },
        { name: 'Maghrib', timeStr: sched.maghrib },
        { name: 'Isya', timeStr: sched.isya },
      ];

      let next = prayerSequence[0];
      let diffSecs = 0;

      for (const p of prayerSequence) {
        const [h, m] = p.timeStr.split(':').map(Number);
        const pTotalSecs = h * 3600 + m * 60;
        if (pTotalSecs > nowTotalSecs) {
          next = p;
          diffSecs = pTotalSecs - nowTotalSecs;
          break;
        }
      }

      // If all passed today, next is tomorrow's Imsak/Subuh
      if (diffSecs === 0) {
        const [h, m] = sched.subuh.split(':').map(Number);
        const pTotalSecs = (h + 24) * 3600 + m * 60;
        diffSecs = pTotalSecs - nowTotalSecs;
        next = { name: 'Subuh (Besok)', timeStr: sched.subuh };
      }

      setNextPrayerName(next.name);

      const remH = Math.floor(diffSecs / 3600);
      const remM = Math.floor((diffSecs % 3600) / 60);
      const remS = diffSecs % 60;

      setTimeRemainingNextPrayer(
        `${String(remH).padStart(2, '0')}:${String(remM).padStart(2, '0')}:${String(remS).padStart(2, '0')}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [selectedCity]);

  // Helper to extract all candidate URLs for a station
  const getCandidateUrls = (station: RadioStation): string[] => {
    const list: string[] = [];
    if (station.streamUrls && station.streamUrls.length > 0) {
      list.push(...station.streamUrls);
    }
    if (station.streamUrl && !list.includes(station.streamUrl)) {
      list.unshift(station.streamUrl);
    }
    if (station.backupStreamUrl && !list.includes(station.backupStreamUrl)) {
      list.push(station.backupStreamUrl);
    }
    // High-availability CDN mirrors as final safety net
    if (!list.includes('https://radioislamindonesia.com/rodja.mp3')) {
      list.push('https://radioislamindonesia.com/rodja.mp3');
    }
    if (!list.includes('https://qurango.net/radio/tarteel')) {
      list.push('https://qurango.net/radio/tarteel');
    }
    return list;
  };

  // Radio Audio Engine Handling with Resilient Auto-Reconnect & Multi-Server Fallback
  useEffect(() => {
    if (!radioAudioRef.current) {
      radioAudioRef.current = new Audio();
      radioAudioRef.current.preload = 'auto';
    }

    const audio = radioAudioRef.current;
    const candidateUrls = getCandidateUrls(currentRadio);
    const safeIndex = streamIndex % candidateUrls.length;
    const targetUrl = candidateUrls[safeIndex];

    const handlePlaying = () => {
      setStreamStatus('playing');
      setStatusMessage(
        safeIndex === 0 
          ? 'Sinyal Kuat & Mengudara (Server Utama)' 
          : `Terhubung ke Server Alternatif ke-${safeIndex + 1}`
      );
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };

    const handleWaiting = () => {
      if (isPlayingRadio) {
        setStreamStatus('buffering');
        setStatusMessage('Menyelaraskan sinyal transmisi...');
      }
    };

    const handleStalled = () => {
      if (isPlayingRadio) {
        console.log('Audio stream stalled, reconnecting buffer...');
        setStreamStatus('buffering');
        setStatusMessage('Sinyal tersendat, menstabilkan buffer...');
      }
    };

    const handleError = () => {
      if (isPlayingRadio) {
        console.warn(`Stream URL failed: ${targetUrl}. Trying next candidate server...`);
        setStreamStatus('fallback');
        const nextIndex = (streamIndex + 1) % candidateUrls.length;
        setStatusMessage(`Mencoba server transmisi ke-${nextIndex + 1}...`);
        
        // Switch to next candidate URL after short delay
        if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = setTimeout(() => {
          setStreamIndex(nextIndex);
        }, 800);
      }
    };

    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('stalled', handleStalled);
    audio.addEventListener('error', handleError);

    if (isPlayingRadio) {
      setStreamStatus('connecting');
      setStatusMessage(`Menghubungkan ke pemancar (${currentRadio.frequency})...`);

      // Set watchdog timeout in case stream hangs without firing error event
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = setTimeout(() => {
        if (audio.paused && isPlayingRadio) {
          console.warn('Stream connection timeout (6s), switching to next server...');
          const nextIndex = (streamIndex + 1) % candidateUrls.length;
          setStreamIndex(nextIndex);
        }
      }, 6500);

      // Load and play target URL
      if (audio.src !== targetUrl) {
        audio.src = targetUrl;
        audio.load();
      }

      audio.play().catch((err) => {
        console.warn('Playback request error:', err);
        handleError();
      });
    } else {
      audio.pause();
      setStreamStatus('idle');
      setStatusMessage('');
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    }

    return () => {
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('stalled', handleStalled);
      audio.removeEventListener('error', handleError);
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [currentRadio, isPlayingRadio, streamIndex]);

  const toggleRadioPlay = () => {
    if (!isPlayingRadio) {
      setStreamIndex(0);
    }
    setIsPlayingRadio(!isPlayingRadio);
  };

  const handleSelectRadioStation = (station: RadioStation) => {
    if (currentRadio.id !== station.id) {
      setCurrentRadio(station);
      setStreamIndex(0);
      setIsPlayingRadio(true);
    } else {
      toggleRadioPlay();
    }
  };

  const handleRetryNextSignal = () => {
    const candidateUrls = getCandidateUrls(currentRadio);
    const nextIndex = (streamIndex + 1) % candidateUrls.length;
    setStreamIndex(nextIndex);
    setIsPlayingRadio(true);
  };

  const handleSaveBookmark = (surahNumber: number, surahName: string, verseNumber: number) => {
    const filtered = bookmarks.filter(b => !(b.surahNumber === surahNumber && b.verseNumber === verseNumber));
    setBookmarks([{ surahNumber, surahName, verseNumber, timestamp: Date.now() }, ...filtered]);
  };

  const handleRemoveBookmark = (surahNumber: number, verseNumber: number) => {
    setBookmarks(bookmarks.filter(b => !(b.surahNumber === surahNumber && b.verseNumber === verseNumber)));
  };

  const handleResumeReading = (surahNumber: number, verseNumber: number) => {
    setInitialSurahNumber(surahNumber);
    setInitialVerseNumber(verseNumber);
    setActiveTab('quran');
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('nurmuslim_user_profile', JSON.stringify(user));
    setHasPassedAuthGate(true);
    sessionStorage.setItem('nurmuslim_gate_passed', 'true');
  };

  const handleContinueAsGuest = () => {
    setHasPassedAuthGate(true);
    sessionStorage.setItem('nurmuslim_gate_passed', 'true');
  };

  // If user has not passed the auth gate and is not logged in, show the full welcome Auth Gate
  if (!currentUser.isLoggedIn && !hasPassedAuthGate) {
    return (
      <AuthGateScreen
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        onLoginSuccess={handleLoginSuccess}
        onContinueAsGuest={handleContinueAsGuest}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-[#0e1318] text-stone-800 dark:text-[#e4e9f0] transition-colors duration-200 flex flex-col font-sans selection:bg-emerald-500 selection:text-white relative overflow-x-hidden">
      {/* Windows 11 Ambient Bloom Gradient / Wallpaper effect */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-600/15 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-teal-500/10 dark:bg-teal-700/12 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-20 left-10 w-[550px] h-[550px] bg-amber-500/5 dark:bg-amber-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Windows 11 Top Window Titlebar */}
      <Windows11Titlebar
        setActiveTab={setActiveTab}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        hijriDate="1447 H"
        onOpenAdzanTest={() => setIsAdzanModalOpen(true)}
      />

      {/* Main Content Area - Well Fitted Windows 11 Application Container with Bottom Floating Dock Offset */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-3 sm:px-5 lg:px-6 pt-4 sm:pt-6 pb-28 sm:pb-32">
        {activeTab === 'home' && (
          <HomeDashboard
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            prayerTimes={prayerTimes}
            nextPrayerName={nextPrayerName}
            timeRemainingNextPrayer={timeRemainingNextPrayer}
            currentRadio={currentRadio}
            isPlayingRadio={isPlayingRadio}
            toggleRadioPlay={toggleRadioPlay}
            isLowBandwidth={isLowBandwidth}
            setIsLowBandwidth={setIsLowBandwidth}
            bookmarks={bookmarks}
            onResumeReading={handleResumeReading}
            onNavigateTab={setActiveTab}
            onOpenAdzanModal={() => setIsAdzanModalOpen(true)}
            streamStatus={streamStatus}
            statusMessage={statusMessage}
            streamIndex={streamIndex}
            onRetryNextSignal={handleRetryNextSignal}
            onSelectRadioStation={handleSelectRadioStation}
            adzanNotificationEnabled={adzanNotificationEnabled}
            setAdzanNotificationEnabled={setAdzanNotificationEnabled}
          />
        )}

        {activeTab === 'quran' && (
          <QuranView
            initialSurahNumber={initialSurahNumber}
            initialVerseNumber={initialVerseNumber}
            bookmarks={bookmarks}
            onSaveBookmark={handleSaveBookmark}
            onRemoveBookmark={handleRemoveBookmark}
          />
        )}

        {(activeTab === 'prayer' || (activeTab as string) === 'jadwal-sholat') && (
          <PrayerTimesView
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            prayerTimes={prayerTimes}
            adzanNotificationEnabled={adzanNotificationEnabled}
            setAdzanNotificationEnabled={setAdzanNotificationEnabled}
            onOpenAdzanTest={() => setIsAdzanModalOpen(true)}
            onNavigateToQibla={() => setActiveTab('qibla')}
          />
        )}

        {(activeTab === 'qibla' || (activeTab as string) === 'kiblat') && (
          <QiblaCompassView
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        )}

        {activeTab === 'zakat' && (
          <ZakatCalculatorView />
        )}

        {activeTab === 'radio' && (
          <RadioSunnahView
            currentRadio={currentRadio}
            setCurrentRadio={setCurrentRadio}
            isPlayingRadio={isPlayingRadio}
            toggleRadioPlay={toggleRadioPlay}
            isLowBandwidth={isLowBandwidth}
            setIsLowBandwidth={setIsLowBandwidth}
            streamStatus={streamStatus}
            statusMessage={statusMessage}
            streamIndex={streamIndex}
            onRetryNextSignal={handleRetryNextSignal}
            onSelectStation={handleSelectRadioStation}
          />
        )}

        {(activeTab === 'articles' || activeTab === 'dzikir' || (activeTab as string) === 'artikel') && (
          <ArticlesAndDoaView />
        )}

        {(activeTab === 'mosques' || (activeTab as string) === 'masjid') && (
          <MosqueFinderView
            selectedCity={selectedCity}
          />
        )}

        {(activeTab === 'community' || (activeTab as string) === 'komunitas') && (
          <CommunityForumView 
            currentUser={currentUser}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}
      </main>

      {/* Floating Radio Mini Player (visible when radio is playing and user is not on the Radio tab) */}
      {isPlayingRadio && activeTab !== 'radio' && (
        <div
          id="floating-radio-mini-player"
          onClick={() => setActiveTab('radio')}
          className="fixed bottom-24 right-4 sm:right-8 z-40 bg-stone-900/95 dark:bg-zinc-900/95 text-white p-3 pr-4 rounded-2xl border border-emerald-500/50 shadow-2xl backdrop-blur-md flex items-center gap-3 cursor-pointer hover:scale-105 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-xl shadow-md">
            {currentRadio.logo}
          </div>
          <div className="text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <p className="font-bold text-white max-w-[140px] truncate">{currentRadio.name}</p>
            </div>
            <p className="text-[10px] text-emerald-300 truncate max-w-[140px]">
              {isLowBandwidth ? '📻 Hemat Sinyal (32k)' : '📻 Live Stream'}
            </p>
          </div>
        </div>
      )}

      {/* Modern Windows 11 Floating Bottom Taskbar Navigation Dock */}
      <Windows11Taskbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentRadio={currentRadio}
        isPlayingRadio={isPlayingRadio}
        toggleRadioPlay={toggleRadioPlay}
        hijriDate="1447 H"
        onOpenAdzanTest={() => setIsAdzanModalOpen(true)}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Adzan Sound & Notification Settings Modal */}
      <AdzanNotificationModal
        isOpen={isAdzanModalOpen}
        onClose={() => setIsAdzanModalOpen(false)}
        adzanEnabled={adzanNotificationEnabled}
        setAdzanEnabled={setAdzanNotificationEnabled}
      />

      {/* Auth / Account Management Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
    </div>
  );
}

