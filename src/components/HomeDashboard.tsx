import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  Compass, 
  Calculator, 
  Radio, 
  Sparkles, 
  MapPin, 
  MessageSquare, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Bell, 
  BellRing,
  Heart,
  Share2,
  Copy,
  Check,
  Flame,
  ShieldCheck,
  Headphones
} from 'lucide-react';
import { AppTab, CityLocation, PrayerTimeSchedule, RadioStation, Bookmark } from '../types';
import { ISLAMIC_ARTICLES, DZIKIR_PAGI_PETANG } from '../data/articlesAndDoa';
import { RADIO_STATIONS } from '../data/radioChannels';

interface HomeDashboardProps {
  setActiveTab?: (tab: AppTab) => void;
  onNavigateTab?: (tab: AppTab) => void;
  prayerTimes: PrayerTimeSchedule;
  selectedCity: CityLocation;
  setSelectedCity?: (city: CityLocation) => void;
  lastBookmark?: Bookmark | null;
  bookmarks?: Bookmark[];
  onContinueReading?: (surahNumber: number, verseNumber: number) => void;
  onResumeReading?: (surahNumber: number, verseNumber: number) => void;
  nextPrayerName?: string;
  timeRemainingNextPrayer?: string;
  currentRadio: RadioStation;
  setCurrentRadio?: (station: RadioStation) => void;
  isPlayingRadio: boolean;
  toggleRadioPlay: () => void;
  isLowBandwidth: boolean;
  setIsLowBandwidth: (val: boolean) => void;
  streamStatus?: 'idle' | 'connecting' | 'playing' | 'buffering' | 'fallback';
  statusMessage?: string;
  streamIndex?: number;
  onRetryNextSignal?: () => void;
  onSelectRadioStation?: (station: RadioStation) => void;
  adzanNotificationEnabled?: boolean;
  setAdzanNotificationEnabled?: (val: boolean) => void;
  onOpenAdzanTest?: () => void;
  onOpenAdzanModal?: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  setActiveTab: propSetActiveTab,
  onNavigateTab,
  prayerTimes,
  selectedCity,
  setSelectedCity,
  lastBookmark: propLastBookmark,
  bookmarks,
  onContinueReading: propOnContinueReading,
  onResumeReading,
  nextPrayerName,
  timeRemainingNextPrayer,
  currentRadio,
  setCurrentRadio,
  isPlayingRadio,
  toggleRadioPlay,
  isLowBandwidth,
  setIsLowBandwidth,
  streamStatus = 'idle',
  statusMessage = '',
  streamIndex = 0,
  onRetryNextSignal,
  onSelectRadioStation,
  adzanNotificationEnabled = false,
  setAdzanNotificationEnabled,
  onOpenAdzanTest,
  onOpenAdzanModal,
}) => {
  const setActiveTab = onNavigateTab || propSetActiveTab || (() => {});
  const onContinueReading = onResumeReading || propOnContinueReading || (() => {});
  const lastBookmark = propLastBookmark || (bookmarks && bookmarks.length > 0 ? bookmarks[0] : null);
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [timeUntilNext, setTimeUntilNext] = useState<{ name: string; time: string; diffStr: string; progressPercent: number }>({
    name: 'Dzuhur',
    time: '12:00',
    diffStr: '00:00:00',
    progressPercent: 65,
  });

  // Calculate next prayer countdown
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

      const scheduleList = [
        { name: 'Imsak', timeStr: prayerTimes.imsak },
        { name: 'Subuh', timeStr: prayerTimes.subuh },
        { name: 'Terbit', timeStr: prayerTimes.terbit },
        { name: 'Dhuha', timeStr: prayerTimes.dhuha },
        { name: 'Dzuhur', timeStr: prayerTimes.dzuhur },
        { name: 'Ashar', timeStr: prayerTimes.ashar },
        { name: 'Maghrib', timeStr: prayerTimes.maghrib },
        { name: 'Isya', timeStr: prayerTimes.isya },
      ];

      const toMins = (tStr: string) => {
        const [h, m] = tStr.split(':').map(Number);
        return h * 60 + m;
      };

      let nextPrayer = scheduleList.find(p => toMins(p.timeStr) > currentMinutes);
      let isTomorrow = false;

      if (!nextPrayer) {
        nextPrayer = scheduleList[0]; // Imsak tomorrow
        isTomorrow = true;
      }

      let diffMinutes = toMins(nextPrayer.timeStr) - currentMinutes;
      if (isTomorrow) {
        diffMinutes += 24 * 60;
      }

      const diffSecs = Math.max(0, Math.floor(diffMinutes * 60));
      const hours = Math.floor(diffSecs / 3600);
      const minutes = Math.floor((diffSecs % 3600) / 60);
      const seconds = diffSecs % 60;

      const diffStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      // approximate progress percent in prayer interval
      const progressPercent = Math.min(100, Math.max(10, 100 - (diffMinutes / 240) * 100));

      setTimeUntilNext({
        name: nextPrayer.name,
        time: nextPrayer.timeStr,
        diffStr,
        progressPercent,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  const handleCopyQuote = () => {
    const quoteText = `"Dan bersabarlah kamu, sesungguhnya janji Allah adalah benar dan janganlah sekali-kali orang-orang yang tidak meyakini (kebenaran ayat-ayat Allah) itu menggelisahkan kamu." (QS. Ar-Rum: 60)`;
    navigator.clipboard?.writeText(quoteText);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  const quickFeatures = [
    {
      id: 'quran',
      title: "Al-Qur'an 30 Juz",
      desc: 'Teks Kemenag, Audio Tartil & Terjemahan',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-600',
      badge: '114 Surat',
      tab: 'quran' as AppTab,
    },
    {
      id: 'prayer',
      title: 'Jadwal Sholat & Adzan',
      desc: 'Waktu Akurat & Notifikasi Otomatis',
      icon: Clock,
      color: 'from-blue-500 to-indigo-600',
      badge: selectedCity.name,
      tab: 'prayer' as AppTab,
    },
    {
      id: 'qibla',
      title: 'Arah Kiblat Presisi',
      desc: 'Kompas Digital & Sensor Magnetik',
      icon: Compass,
      color: 'from-amber-500 to-orange-600',
      badge: 'Ka\'bah Makkah',
      tab: 'qibla' as AppTab,
    },
    {
      id: 'zakat',
      title: 'Kalkulator Zakat',
      desc: 'Zakat Maal, Profesi, Fitrah & Emas',
      icon: Calculator,
      color: 'from-emerald-600 to-green-700',
      badge: 'Nisab Real-Time',
      tab: 'zakat' as AppTab,
    },
    {
      id: 'radio',
      title: 'Radio As-Sunnah',
      desc: 'Kajian & Murottal 24 Jam Hemat Sinyal',
      icon: Radio,
      color: 'from-rose-500 to-red-600',
      badge: 'Live Audio',
      tab: 'radio' as AppTab,
    },
    {
      id: 'dzikir',
      title: 'Dzikir & Doa Harian',
      desc: 'Tasbih Digital & Hisnul Muslim',
      icon: Sparkles,
      color: 'from-purple-500 to-violet-600',
      badge: 'Pagi & Petang',
      tab: 'articles' as AppTab,
    },
    {
      id: 'mosques',
      title: 'Pencari Masjid Terdekat',
      desc: 'Rute Navigasi, Fasilitas & Info Kajian',
      icon: MapPin,
      color: 'from-teal-500 to-emerald-700',
      badge: 'GPS Maps',
      tab: 'mosques' as AppTab,
    },
    {
      id: 'community',
      title: 'Komunitas & Tanya Ustadz',
      desc: 'Forum Silaturahmi & Tanya Jawab Fiqih',
      icon: MessageSquare,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Ustadz Terverifikasi',
      tab: 'community' as AppTab,
    },
  ];

  return (
    <div id="home-dashboard-view" className="space-y-6 pb-20 lg:pb-10">
      {/* Hero Prayer Card */}
      <section 
        id="hero-prayer-card"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-900 to-stone-900 text-white p-6 sm:p-8 shadow-xl"
      >
        {/* Background Islamic Ornament Graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-96 opacity-10 pointer-events-none bg-islamic-pattern"></div>
        <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Next Prayer Countdown */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-700/60 text-emerald-200 text-xs font-semibold backdrop-blur-sm border border-emerald-500/30 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                {selectedCity.name}, {selectedCity.province} ({selectedCity.timezone})
              </span>
              <span className="text-xs text-emerald-200/90 font-medium">
                {prayerTimes.hijriDate}
              </span>
            </div>

            <div>
              <p className="text-emerald-200/80 text-sm font-medium">Menuju Waktu Sholat Berikutnya</p>
              <div className="flex items-baseline gap-3 mt-1">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {timeUntilNext.name}
                </h1>
                <span className="text-2xl sm:text-3xl font-semibold text-amber-300">
                  {timeUntilNext.time}
                </span>
              </div>
            </div>

            {/* Countdown Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-stone-300">Sisa Waktu:</span>
              <span className="font-mono font-bold text-base sm:text-lg text-emerald-300">
                {timeUntilNext.diffStr}
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="btn-toggle-adzan-notification"
                onClick={() => setAdzanNotificationEnabled(!adzanNotificationEnabled)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  adzanNotificationEnabled
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                {adzanNotificationEnabled ? <BellRing className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                <span>{adzanNotificationEnabled ? 'Notifikasi Adzan Aktif' : 'Aktifkan Pengingat Adzan'}</span>
              </button>

              <button
                id="btn-trigger-adzan-test"
                onClick={onOpenAdzanTest}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-emerald-700/80 hover:bg-emerald-600 text-emerald-50 transition-all border border-emerald-500/30"
              >
                <Volume2 className="w-4 h-4 text-emerald-300" />
                <span>Tes Audio Adzan</span>
              </button>
            </div>
          </div>

          {/* Right: Today Prayer Times Grid */}
          <div className="lg:col-span-5 bg-black/25 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
                Jadwal Hari Ini ({prayerTimes.date.split(',')[0]})
              </span>
              <button
                onClick={() => setActiveTab('prayer')}
                className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-0.5"
              >
                Selengkapnya <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 pt-3">
              {[
                { label: 'Subuh', time: prayerTimes.subuh },
                { label: 'Dhuha', time: prayerTimes.dhuha },
                { label: 'Dzuhur', time: prayerTimes.dzuhur },
                { label: 'Ashar', time: prayerTimes.ashar },
                { label: 'Maghrib', time: prayerTimes.maghrib },
                { label: 'Isya', time: prayerTimes.isya },
                { label: 'Imsak', time: prayerTimes.imsak },
                { label: 'Terbit', time: prayerTimes.terbit },
              ].map((item, idx) => {
                const isNext = item.label === timeUntilNext.name;
                return (
                  <div
                    key={idx}
                    className={`text-center p-2 rounded-xl transition-all ${
                      isNext
                        ? 'bg-amber-400 text-stone-950 font-bold shadow-md scale-105'
                        : 'bg-white/5 hover:bg-white/10 text-white'
                    }`}
                  >
                    <p className={`text-[11px] ${isNext ? 'text-stone-900 font-bold' : 'text-stone-300'}`}>
                      {item.label}
                    </p>
                    <p className="font-mono text-xs sm:text-sm font-semibold mt-0.5">
                      {item.time}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Terakhir Dibaca / Resume Quran Banner */}
      {lastBookmark && (
        <section 
          id="resume-reading-banner"
          className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 dark:from-emerald-950/40 dark:via-zinc-900 dark:to-amber-950/20 border border-emerald-200 dark:border-emerald-800/40 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-emerald-800 dark:text-emerald-400 font-semibold uppercase tracking-wider">
                Terakhir Dibaca
              </p>
              <h2 className="text-base font-bold text-stone-900 dark:text-zinc-100">
                Surat {lastBookmark.surahName} : Ayat {lastBookmark.verseNumber}
              </h2>
            </div>
          </div>

          <button
            id="btn-continue-reading"
            onClick={() => onContinueReading(lastBookmark.surahNumber, lastBookmark.verseNumber)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
          >
            <span>Lanjutkan Membaca</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </section>
      )}

      {/* Core Feature Grid */}
      <section id="features-grid-section" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 dark:text-zinc-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Fitur Utama SuperApp
          </h2>
          <span className="text-xs text-stone-500 dark:text-zinc-400">8 Menu Lengkap</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {quickFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                id={`feature-card-${feat.id}`}
                onClick={() => setActiveTab(feat.tab)}
                className="group relative p-4 rounded-2xl win11-acrylic-card hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feat.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.08] text-stone-700 dark:text-zinc-300">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-stone-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-zinc-400 mt-1 line-clamp-2">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>Buka Fitur</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Radio As-Sunnah Live Streaming Hero Card */}
      <section 
        id="home-radio-section"
        className="p-5 sm:p-6 rounded-3xl bg-stone-900 text-white border border-stone-800 shadow-lg relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-emerald-950/30 to-transparent pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Radio As-Sunnah Real-Time
              </span>
              {isLowBandwidth && (
                <span className="px-2 py-0.5 rounded-full bg-amber-900/40 text-amber-300 text-[11px] border border-amber-700/40 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Mode Hemat Sinyal Aktif
                </span>
              )}
              {isPlayingRadio && (
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border flex items-center gap-1 ${
                  streamStatus === 'playing'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    : 'bg-amber-950 text-amber-300 border-amber-800'
                }`}>
                  📶 {streamStatus === 'playing' ? `Sinyal Kuat (Server #${streamIndex + 1})` : statusMessage || 'Menghubungkan sinyal...'}
                </span>
              )}
            </div>

            <h3 className="text-xl font-extrabold text-white">
              {currentRadio.name}
            </h3>
            <p className="text-xs text-stone-300 max-w-xl">
              {currentRadio.description} ({currentRadio.city} - {currentRadio.frequency})
            </p>
            <p className="text-xs text-amber-400 font-medium">
              Sedang Mengudara: {currentRadio.scheduleNow}
            </p>
          </div>

          {/* Radio Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {isPlayingRadio && onRetryNextSignal && (
              <button
                onClick={onRetryNextSignal}
                className="px-3 py-2 rounded-xl text-xs font-medium bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-all flex items-center gap-1"
                title="Ganti ke jalur server alternatif jika pemancar lambat"
              >
                <span>🔄 Ganti Server</span>
              </button>
            )}

            <button
              id="btn-home-toggle-low-bandwidth"
              onClick={() => setIsLowBandwidth(!isLowBandwidth)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                isLowBandwidth
                  ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                  : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
              }`}
              title="Mengoptimalkan streaming audio agar tidak tersendat saat sinyal 2G/3G"
            >
              {isLowBandwidth ? '⚡ Mode Hemat ON' : '📶 Optimasi Sinyal'}
            </button>

            <button
              id="btn-home-play-radio"
              onClick={toggleRadioPlay}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-transform active:scale-95"
            >
              {isPlayingRadio ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Jeda Siaran</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Dengarkan Live</span>
                </>
              )}
            </button>

            <button
              id="btn-home-all-radio-channels"
              onClick={() => setActiveTab('radio')}
              className="p-2.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 text-xs flex items-center gap-1.5"
            >
              <Headphones className="w-4 h-4 text-emerald-400" />
              <span>Semua Saluran</span>
            </button>
          </div>
        </div>
      </section>

      {/* Two Column Layout: Mutiara Hikmah & Daily Article */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ayat & Mutiara Hikmah Card */}
        <section 
          id="daily-hikmah-card"
          className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-4"
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-zinc-800">
              <span className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Ayat & Mutiara Hikmah Hari Ini
              </span>
              <button
                onClick={handleCopyQuote}
                className="text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs flex items-center gap-1"
                title="Salin ayat & kutipan"
              >
                {copiedQuote ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedQuote ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <p className="font-arabic text-xl sm:text-2xl text-right leading-loose text-stone-900 dark:text-zinc-100">
                فَاصْبِرْ إِنَّ وَعْدَ اللَّهِ حَقٌّ ۖ وَلَا يَسْتَخِفَّنَّكَ الَّذِينَ لَا يُوقِنُونَ
              </p>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-300 italic leading-relaxed">
                "Dan bersabarlah kamu, sesungguhnya janji Allah adalah benar dan janganlah sekali-kali orang-orang yang tidak meyakini (kebenaran ayat-ayat Allah) itu menggelisahkan kamu."
              </p>
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                — QS. Ar-Rum: 60
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-between">
            <button
              onClick={() => setActiveTab('quran')}
              className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              Baca Al-Qur'an Penuh <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              Kumpulan Dzikir & Doa <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* Featured Daily Article Card */}
        <section 
          id="featured-article-card"
          className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-4"
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-zinc-800">
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                Artikel Islami Harian
              </span>
              <span className="text-xs text-stone-400">{ISLAMIC_ARTICLES[0].readTime}</span>
            </div>

            <div className="mt-3 space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                {ISLAMIC_ARTICLES[0].category}
              </span>
              <h3 className="text-base font-bold text-stone-900 dark:text-zinc-100">
                {ISLAMIC_ARTICLES[0].title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                {ISLAMIC_ARTICLES[0].summary}
              </p>
              <p className="text-[11px] text-stone-500 dark:text-zinc-500">
                Oleh: {ISLAMIC_ARTICLES[0].author}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-stone-500 dark:text-zinc-400 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> {ISLAMIC_ARTICLES[0].likes} pembaca terbantu
            </span>
            <button
              onClick={() => setActiveTab('articles')}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              Baca Artikel Lengkap <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
