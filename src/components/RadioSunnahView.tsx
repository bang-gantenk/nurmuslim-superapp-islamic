import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio as RadioIcon, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Wifi, 
  WifiOff, 
  Clock, 
  Heart,
  RotateCw,
  Search,
  CheckCircle2,
  AlertCircle,
  Activity,
  Zap,
  Globe,
  RadioTower
} from 'lucide-react';
import { RadioStation } from '../types';
import { RADIO_STATIONS } from '../data/radioChannels';

interface RadioSunnahViewProps {
  currentRadio: RadioStation;
  setCurrentRadio: (station: RadioStation) => void;
  isPlayingRadio: boolean;
  toggleRadioPlay: () => void;
  isLowBandwidth: boolean;
  setIsLowBandwidth: (val: boolean) => void;
  streamStatus?: 'idle' | 'connecting' | 'playing' | 'buffering' | 'fallback';
  statusMessage?: string;
  streamIndex?: number;
  onRetryNextSignal?: () => void;
  onSelectStation?: (station: RadioStation) => void;
}

export const RadioSunnahView: React.FC<RadioSunnahViewProps> = ({
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
  onSelectStation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Sunnah' | 'Murottal' | 'Kajian'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [volume, setVolume] = useState<number>(85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState<number | null>(null);
  const [likedStations, setLikedStations] = useState<string[]>(['rodja', 'radiomuslim', 'hangfm']);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Sleep Timer countdown
  useEffect(() => {
    if (sleepTimerMinutes === null) {
      setSleepTimerRemaining(null);
      return;
    }

    setSleepTimerRemaining(sleepTimerMinutes * 60);

    const interval = setInterval(() => {
      setSleepTimerRemaining((prev) => {
        if (prev === null || prev <= 1) {
          if (isPlayingRadio) toggleRadioPlay();
          setSleepTimerMinutes(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sleepTimerMinutes, isPlayingRadio]);

  // Audio Equalizer Visualizer animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let bars = Array.from({ length: 36 }, () => Math.random() * 15 + 4);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = canvas.width / bars.length;

      bars.forEach((height, i) => {
        if (isPlayingRadio && streamStatus === 'playing') {
          const target = Math.sin(Date.now() / 180 + i * 0.35) * 18 + 22 + Math.random() * 6;
          bars[i] = bars[i] + (target - bars[i]) * 0.25;
        } else if (isPlayingRadio && (streamStatus === 'connecting' || streamStatus === 'buffering' || streamStatus === 'fallback')) {
          const target = Math.sin(Date.now() / 100 + i * 0.5) * 8 + 12;
          bars[i] = bars[i] + (target - bars[i]) * 0.15;
        } else {
          bars[i] = bars[i] + (3 - bars[i]) * 0.1;
        }

        if (isPlayingRadio && streamStatus === 'playing') {
          ctx.fillStyle = `rgba(16, 185, 129, ${0.4 + (bars[i] / 45) * 0.6})`;
        } else if (isPlayingRadio) {
          ctx.fillStyle = `rgba(245, 158, 11, ${0.4 + (bars[i] / 45) * 0.6})`;
        } else {
          ctx.fillStyle = 'rgba(156, 163, 175, 0.2)';
        }

        ctx.fillRect(
          i * barWidth + 2,
          canvas.height - bars[i],
          barWidth - 4,
          bars[i]
        );
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlayingRadio, streamStatus]);

  const toggleFavorite = (id: string) => {
    if (likedStations.includes(id)) {
      setLikedStations(likedStations.filter(s => s !== id));
    } else {
      setLikedStations([...likedStations, id]);
    }
  };

  const handleStationClick = (station: RadioStation) => {
    if (onSelectStation) {
      onSelectStation(station);
    } else {
      if (currentRadio.id === station.id) {
        toggleRadioPlay();
      } else {
        setCurrentRadio(station);
        if (!isPlayingRadio) toggleRadioPlay();
      }
    }
  };

  const filteredStations = RADIO_STATIONS.filter(station => {
    const matchesCategory = selectedCategory === 'All' || station.category === selectedCategory;
    const matchesQuery = searchQuery.trim() === '' || 
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.frequency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const totalCandidateServers = currentRadio.streamUrls ? currentRadio.streamUrls.length : 2;

  return (
    <div id="radio-sunnah-main-view" className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 text-white shadow-xl relative overflow-hidden border border-emerald-900/50">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-200 text-xs font-bold border border-emerald-700/50 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Multi-Server Sinyal Aktif
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-900/60 text-amber-300 text-xs font-medium border border-amber-700/40 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Auto-Reconnect Anti-Hang
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Radio As-Sunnah & Murottal 24 Jam
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
            Dengarkan siaran kajian Islam ilmiah, bimbingan syariah Ahlus Sunnah wal Jama'ah, dan lantunan tartil Al-Qur'an secara langsung dengan koneksi audio stabil tanpa hambatan sinyal.
          </p>
        </div>
      </div>

      {/* Main Big Radio Player Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 text-white border border-stone-800 shadow-2xl space-y-6">
        {/* Top bar: Station Info & Mode Switches */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: Station Identity */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-3xl shadow-lg border border-white/10 shrink-0">
              {currentRadio.logo}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-800">
                  {currentRadio.category}
                </span>
                <span className="text-xs text-stone-300 font-mono bg-stone-800/80 px-2 py-0.5 rounded-lg border border-stone-700">
                  {currentRadio.frequency}
                </span>
                <span className="text-xs text-amber-300 flex items-center gap-1">
                  <Globe className="w-3 h-3" /> {currentRadio.city}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {currentRadio.name}
              </h2>
              <p className="text-xs text-stone-300">
                {currentRadio.description}
              </p>
              <p className="text-xs text-amber-400 font-medium pt-0.5 flex items-center gap-1.5">
                <RadioIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>Sedang Tayang: <strong>{currentRadio.scheduleNow}</strong></span>
              </p>
            </div>
          </div>

          {/* Right: Sinyal Diagnostics & Mode Controls */}
          <div className="flex flex-col md:items-end gap-2.5">
            {/* Live Sinyal State Badge */}
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
                !isPlayingRadio 
                  ? 'bg-stone-800 text-stone-400 border-stone-700'
                  : streamStatus === 'playing'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                  : streamStatus === 'fallback'
                  ? 'bg-amber-950 text-amber-300 border-amber-700'
                  : 'bg-blue-950 text-blue-300 border-blue-700'
              }`}>
                {streamStatus === 'playing' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {streamStatus === 'buffering' && <Activity className="w-4 h-4 text-amber-400 animate-spin" />}
                {streamStatus === 'connecting' && <RadioTower className="w-4 h-4 text-blue-400 animate-pulse" />}
                {streamStatus === 'fallback' && <AlertCircle className="w-4 h-4 text-amber-400" />}
                {!isPlayingRadio && <RadioIcon className="w-4 h-4 text-stone-400" />}

                <span>
                  {!isPlayingRadio 
                    ? 'Radio Siap Diputar'
                    : streamStatus === 'playing'
                    ? `Sinyal Kuat • Server #${(streamIndex || 0) + 1}`
                    : streamStatus === 'fallback'
                    ? `Mencari Server #${(streamIndex || 0) + 1}...`
                    : 'Menangkap Sinyal Siaran...'}
                </span>
              </div>

              {/* Manual Refresh / Switch Server Button */}
              {onRetryNextSignal && (
                <button
                  id="btn-retry-next-server"
                  onClick={onRetryNextSignal}
                  className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 hover:border-stone-500 text-xs font-medium flex items-center gap-1.5 transition-all shadow-xs"
                  title="Klik untuk berpindah ke jalur server transmisi cadangan bila siaran tersendat"
                >
                  <RotateCw className={`w-3.5 h-3.5 text-emerald-400 ${streamStatus === 'buffering' || streamStatus === 'connecting' ? 'animate-spin' : ''}`} />
                  <span>Ganti Server Sinyal</span>
                </button>
              )}
            </div>

            {/* Low Bandwidth Toggle */}
            <button
              id="btn-toggle-low-bandwidth-mode"
              onClick={() => setIsLowBandwidth(!isLowBandwidth)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                isLowBandwidth
                  ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
              }`}
            >
              {isLowBandwidth ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-stone-950" />
                  <span>Mode Hemat Kuota Aktif (Anti-Jeda)</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-stone-400" />
                  <span>Aktifkan Hemat Sinyal</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Audio Equalizer Visualizer Canvas */}
        <div className="w-full bg-black/50 rounded-2xl p-3 sm:p-4 border border-white/5 flex flex-col items-center">
          <canvas
            ref={canvasRef}
            width={640}
            height={64}
            className="w-full h-14 max-w-3xl"
          />
          <div className="flex flex-wrap items-center justify-between gap-2 w-full text-[11px] text-stone-400 px-2 pt-2 border-t border-white/5">
            <span className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${
                isPlayingRadio && streamStatus === 'playing'
                  ? 'bg-emerald-400 animate-pulse'
                  : isPlayingRadio
                  ? 'bg-amber-400 animate-ping'
                  : 'bg-stone-600'
              }`}></span>
              <span>Status: <strong className="text-stone-200">{statusMessage || (isPlayingRadio ? 'Mengudara' : 'Standby')}</strong></span>
            </span>

            <div className="flex items-center gap-3">
              <span>Server: <strong className="text-emerald-400">#{(streamIndex || 0) + 1} dari {totalCandidateServers}</strong></span>
              <span>Bitrate: <strong className="text-stone-300">{isLowBandwidth ? '32-64 kbps (Hemat)' : '128 kbps (HD)'}</strong></span>
              {sleepTimerRemaining !== null && (
                <span className="text-amber-400 font-mono font-bold">
                  ⏱️ Mati dalam: {formatTimer(sleepTimerRemaining)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Player Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          {/* Play/Pause & Favorite */}
          <div className="flex items-center gap-3">
            <button
              id="btn-radio-play-pause"
              onClick={toggleRadioPlay}
              className={`px-8 py-3.5 rounded-2xl text-white font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-xl transition-all active:scale-95 ${
                isPlayingRadio && streamStatus === 'playing'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-900/40'
                  : isPlayingRadio
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-amber-900/40'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-emerald-900/30'
              }`}
            >
              {isPlayingRadio ? (
                <>
                  <Pause className="w-5 h-5 fill-white" />
                  <span>Jeda Siaran</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-white" />
                  <span>Dengarkan Sekarang</span>
                </>
              )}
            </button>

            <button
              onClick={() => toggleFavorite(currentRadio.id)}
              className={`p-3.5 rounded-2xl border transition-colors ${
                likedStations.includes(currentRadio.id)
                  ? 'bg-rose-950 text-rose-400 border-rose-800'
                  : 'bg-stone-800 text-stone-400 border-stone-700 hover:text-white'
              }`}
              title="Favoritkan Saluran Ini"
            >
              <Heart className={`w-5 h-5 ${likedStations.includes(currentRadio.id) ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

          {/* Sleep Timer Preset Selector */}
          <div className="flex items-center gap-1.5 bg-stone-800/90 p-1.5 rounded-2xl border border-stone-700 text-xs">
            <Clock className="w-3.5 h-3.5 text-stone-400 ml-1.5" />
            <span className="text-stone-400 text-[11px] mr-1">Timer Tidur:</span>
            {[15, 30, 60, 90].map((mins) => (
              <button
                key={mins}
                onClick={() => setSleepTimerMinutes(sleepTimerMinutes === mins ? null : mins)}
                className={`px-2.5 py-1 rounded-xl font-medium transition-all ${
                  sleepTimerMinutes === mins
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'text-stone-300 hover:bg-stone-700'
                }`}
              >
                {mins}m
              </button>
            ))}
            {sleepTimerMinutes !== null && (
              <button
                onClick={() => setSleepTimerMinutes(null)}
                className="px-2 py-1 text-rose-400 hover:text-rose-300 text-xs font-bold"
                title="Batalkan Timer"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Station List & Search Filter */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg text-stone-900 dark:text-zinc-100 flex items-center gap-2">
              <RadioIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Daftar Saluran Radio As-Sunnah & Murottal
            </h3>
            <p className="text-xs text-stone-500 dark:text-zinc-400">
              Pilih saluran di bawah untuk mendengarkan langsung. Tersedia saluran kajian Sunnah Nusantara & Murottal 30 Juz.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari radio (e.g. Hang, Muslim, Rodja)..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-emerald-500 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {(['All', 'Sunnah', 'Murottal', 'Kajian'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-stone-600 dark:text-zinc-400 border border-stone-200 dark:border-zinc-800 hover:border-emerald-400'
              }`}
            >
              {cat === 'All' ? 'Semua Saluran' : cat}
            </button>
          ))}
        </div>

        {/* Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredStations.map((station) => {
            const isSelected = currentRadio.id === station.id;
            const isCurrentPlaying = isSelected && isPlayingRadio;

            return (
              <div
                key={station.id}
                id={`station-card-${station.id}`}
                onClick={() => handleStationClick(station)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-600 shadow-md ring-1 ring-emerald-500'
                    : 'bg-white dark:bg-zinc-900 border-stone-200/80 dark:border-zinc-800 hover:border-emerald-400 dark:hover:border-emerald-700 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0 ${
                    isSelected ? 'bg-emerald-600 text-white' : 'bg-stone-100 dark:bg-zinc-800 text-stone-700 dark:text-zinc-200'
                  }`}>
                    {station.logo}
                  </div>

                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm sm:text-base text-stone-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                        {station.name}
                      </h4>
                      {likedStations.includes(station.id) && (
                        <span className="text-[10px] text-rose-500">❤️</span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 dark:text-zinc-400 truncate">
                      {station.city} • {station.frequency}
                    </p>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium line-clamp-1 mt-0.5">
                      {station.scheduleNow}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform active:scale-95 ${
                      isCurrentPlaying
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-md animate-pulse'
                        : isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-100 dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 group-hover:bg-emerald-600 group-hover:text-white'
                    }`}
                  >
                    {isCurrentPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredStations.length === 0 && (
          <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-stone-200 dark:border-zinc-800">
            <p className="text-stone-500 dark:text-zinc-400 text-sm">
              Tidak ada saluran radio yang cocok dengan pencarian "<strong>{searchQuery}</strong>".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-3 px-4 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold"
            >
              Tampilkan Semua Saluran
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
