import React, { useState, useRef } from 'react';
import { 
  Bell, 
  BellRing, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Check, 
  Info, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { playAdzanChime } from '../data/prayerCalculation';

interface AdzanNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  adzanEnabled: boolean;
  setAdzanEnabled: (enabled: boolean) => void;
}

export const AdzanNotificationModal: React.FC<AdzanNotificationModalProps> = ({
  isOpen,
  onClose,
  adzanEnabled,
  setAdzanEnabled,
}) => {
  const [isPlayingTest, setIsPlayingTest] = useState(false);
  const [selectedMuadzin, setSelectedMuadzin] = useState<'makkah' | 'madinah' | 'indonesia'>('makkah');
  const [permissionGranted, setPermissionGranted] = useState(
    typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted'
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!isOpen) return null;

  const muadzins = [
    {
      id: 'makkah',
      name: 'Adzan Masjidil Haram Makkah',
      muadzin: 'Syaikh Ali Ahmad Mulla',
      url: 'https://cdn.islamic.network/audio/adzan/makkah.mp3',
    },
    {
      id: 'madinah',
      name: 'Adzan Masjid Nabawi Madinah',
      muadzin: 'Syaikh Abdul Majeed Surayhi',
      url: 'https://cdn.islamic.network/audio/adzan/madinah.mp3',
    },
    {
      id: 'indonesia',
      name: 'Adzan Masjid Istiqlal Jakarta',
      muadzin: 'Ustadz H. Ahmad Syahid',
      url: 'https://cdn.islamic.network/audio/adzan/indonesia.mp3',
    },
  ];

  const handleToggleTestPlay = () => {
    if (isPlayingTest) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlayingTest(false);
    } else {
      const active = muadzins.find(m => m.id === selectedMuadzin) || muadzins[0];
      if (!audioRef.current) {
        audioRef.current = new Audio(active.url);
      } else {
        audioRef.current.src = active.url;
      }

      audioRef.current.play().then(() => {
        setIsPlayingTest(true);
      }).catch(err => {
        console.warn('Playback error, falling back to harmonic chime synthesis:', err);
        playAdzanChime();
        setIsPlayingTest(true);
        setTimeout(() => setIsPlayingTest(false), 4000);
      });

      audioRef.current.onended = () => {
        setIsPlayingTest(false);
      };
    }
  };

  const handleRequestNotification = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      if (result === 'granted') {
        setPermissionGranted(true);
        setAdzanEnabled(true);
        new Notification("NurMuslim: Notifikasi Adzan Aktif", {
          body: "Alhamdulillah! Anda akan menerima pengingat setiap waktu sholat fardhu tiba.",
          icon: "/favicon.ico"
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full p-6 space-y-5 border border-stone-200 dark:border-zinc-800 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-stone-900 dark:text-zinc-100">
                Pengaturan Suara Adzan & Notifikasi
              </h3>
              <p className="text-xs text-stone-500">
                Pengingat sholat fardhu 5 waktu otomatis
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (isPlayingTest && audioRef.current) {
                audioRef.current.pause();
              }
              onClose();
            }}
            className="text-stone-400 hover:text-stone-700 text-sm font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Permission Toggle */}
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-bold text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
              Izin Notifikasi Layar
            </h4>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
              {permissionGranted ? 'Izin telah aktif di browser ini' : 'Klik untuk mengaktifkan notifikasi pop-up saat adzan'}
            </p>
          </div>

          <button
            onClick={permissionGranted ? () => setAdzanEnabled(!adzanEnabled) : handleRequestNotification}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              adzanEnabled
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-stone-200 dark:bg-zinc-700 text-stone-700 dark:text-zinc-300'
            }`}
          >
            {adzanEnabled ? 'Aktif' : 'Nonaktif'}
          </button>
        </div>

        {/* Muadzin Sound Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-stone-700 dark:text-zinc-300 block">
            Pilihan Suara Muadzin:
          </label>

          <div className="space-y-2">
            {muadzins.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedMuadzin(item.id as any);
                  if (isPlayingTest && audioRef.current) {
                    audioRef.current.pause();
                    setIsPlayingTest(false);
                  }
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                  selectedMuadzin === item.id
                    ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-400 text-stone-900 dark:text-zinc-100 font-semibold'
                    : 'bg-stone-50 dark:bg-zinc-800/60 border-stone-200 dark:border-zinc-700 text-stone-600 dark:text-zinc-400'
                }`}
              >
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-[11px] text-stone-400">{item.muadzin}</p>
                </div>
                {selectedMuadzin === item.id && (
                  <Check className="w-4 h-4 text-amber-600" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Test Audio Button */}
        <div className="pt-2">
          <button
            onClick={handleToggleTestPlay}
            className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              isPlayingTest
                ? 'bg-amber-500 text-stone-950 shadow-md animate-pulse'
                : 'bg-stone-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-stone-800'
            }`}
          >
            {isPlayingTest ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Hentikan Suara Adzan</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Tes Putar Suara Adzan ({selectedMuadzin.toUpperCase()})</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-stone-400 text-center leading-relaxed">
          *Pastikan tab browser tidak ditutup agar pengingat waktu adzan dapat berbunyi tepat waktu sesuai hisab Kemenag RI.
        </p>
      </div>
    </div>
  );
};
