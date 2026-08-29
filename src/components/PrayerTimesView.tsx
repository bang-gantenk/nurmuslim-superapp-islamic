import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  MapPin, 
  Bell, 
  BellRing, 
  Volume2, 
  VolumeX, 
  Calendar, 
  Moon, 
  Sun, 
  Sparkles, 
  Compass, 
  Share2, 
  Download,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { CityLocation, PrayerTimeSchedule } from '../types';
import { INDONESIAN_CITIES, calculatePrayerTimes, playAdzanChime } from '../data/prayerCalculation';

interface PrayerTimesViewProps {
  selectedCity: CityLocation;
  setSelectedCity: (city: CityLocation) => void;
  prayerTimes: PrayerTimeSchedule;
  adzanNotificationEnabled: boolean;
  setAdzanNotificationEnabled: (enabled: boolean) => void;
  onOpenAdzanTest: () => void;
  onNavigateToQibla: () => void;
}

export const PrayerTimesView: React.FC<PrayerTimesViewProps> = ({
  selectedCity,
  setSelectedCity,
  prayerTimes,
  adzanNotificationEnabled,
  setAdzanNotificationEnabled,
  onOpenAdzanTest,
  onNavigateToQibla,
}) => {
  const [adzanType, setAdzanType] = useState<'makkah' | 'madinah' | 'indonesia'>('makkah');
  const [viewMode, setViewMode] = useState<'daily' | 'monthly'>('daily');
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsSuccess, setGpsSuccess] = useState(false);

  // Request GPS Location
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      alert('Browser atau perangkat Anda tidak mendukung geolokasi GPS.');
      return;
    }

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // find closest city
        let closestCity = INDONESIAN_CITIES[0];
        let minDistance = 99999;

        INDONESIAN_CITIES.forEach((c) => {
          const dist = Math.sqrt(Math.pow(c.latitude - lat, 2) + Math.pow(c.longitude - lng, 2));
          if (dist < minDistance) {
            minDistance = dist;
            closestCity = c;
          }
        });

        setSelectedCity({
          ...closestCity,
          latitude: lat,
          longitude: lng,
          name: `Lokasi GPS (${closestCity.name})`,
        });
        setGpsLoading(false);
        setGpsSuccess(true);
        setTimeout(() => setGpsSuccess(false), 3000);
      },
      (err) => {
        console.warn('GPS Error:', err);
        setGpsLoading(false);
        alert('Tidak dapat mengakses lokasi GPS. Pastikan izin lokasi telah diberikan di browser Anda.');
      },
      { timeout: 10000 }
    );
  };

  const prayers = [
    { id: 'imsak', label: 'Imsak', time: prayerTimes.imsak, icon: Moon, desc: 'Batas akhir sahur puasa (10 menit sebelum Subuh)' },
    { id: 'subuh', label: 'Subuh', time: prayerTimes.subuh, icon: Moon, desc: 'Awal fajar shadiq & awal waktu puasa' },
    { id: 'terbit', label: 'Terbit (Syuruq)', time: prayerTimes.terbit, icon: Sun, desc: 'Matahari mulai terbit, makruh sholat saat ini' },
    { id: 'dhuha', label: 'Dhuha', time: prayerTimes.dhuha, icon: Sun, desc: 'Mulai 20 menit setelah terbit hingga sebelum Dzuhur' },
    { id: 'dzuhur', label: 'Dzuhur', time: prayerTimes.dzuhur, icon: Sun, desc: 'Matahari tergelincir dari zenit' },
    { id: 'ashar', label: 'Ashar', time: prayerTimes.ashar, icon: Sun, desc: 'Panjang bayangan sama dengan tinggi benda' },
    { id: 'maghrib', label: 'Maghrib', time: prayerTimes.maghrib, icon: Moon, desc: 'Matahari terbenam & waktu berbuka puasa' },
    { id: 'isya', label: 'Isya', time: prayerTimes.isya, icon: Moon, desc: 'Hilangnya mega merah di ufuk barat' },
  ];

  // Generate 7-day monthly sample schedule
  const nextDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const tzOffset = selectedCity.timezone === 'WIT' ? 9 : selectedCity.timezone === 'WITA' ? 8 : 7;
    const sched = calculatePrayerTimes(selectedCity.latitude, selectedCity.longitude, tzOffset, d);
    return {
      dateObj: d,
      sched,
    };
  });

  return (
    <div id="prayer-times-main-view" className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-emerald-950 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold border border-blue-600/40">
              Kementerian Agama RI • Metode Hisab Astronomis
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-semibold">
              🌙 {prayerTimes.hijriDate}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Jadwal Sholat & Adzan
              </h1>
              <p className="text-xs sm:text-sm text-blue-200 mt-1">
                {prayerTimes.date} — Wilayah {selectedCity.name} ({selectedCity.timezone})
              </p>
            </div>

            {/* GPS Auto Detect */}
            <div className="flex items-center gap-2">
              <button
                id="btn-detect-gps-location"
                onClick={handleDetectGPS}
                disabled={gpsLoading}
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 backdrop-blur-md flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                <Navigation className={`w-4 h-4 text-amber-300 ${gpsLoading ? 'animate-spin' : ''}`} />
                <span>{gpsLoading ? 'Mendeteksi...' : gpsSuccess ? 'GPS Terhubung!' : 'Gunakan GPS'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Control & Mode Toggles */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* City Dropdown */}
        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 p-2 rounded-2xl border border-stone-200 dark:border-zinc-800 shadow-xs">
          <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 ml-2" />
          <span className="text-xs text-stone-500 font-medium">Kota:</span>
          <select
            id="prayer-city-select"
            value={selectedCity.id}
            onChange={(e) => {
              const found = INDONESIAN_CITIES.find(c => c.id === e.target.value);
              if (found) setSelectedCity(found);
            }}
            className="bg-transparent border-none outline-none text-xs sm:text-sm font-bold text-stone-800 dark:text-zinc-100 cursor-pointer pr-3"
          >
            {INDONESIAN_CITIES.map(city => (
              <option key={city.id} value={city.id} className="dark:bg-zinc-800 text-stone-900 dark:text-zinc-100">
                {city.name} ({city.province} - {city.timezone})
              </option>
            ))}
          </select>
        </div>

        {/* View Switcher & Notification Toggle */}
        <div className="flex items-center gap-2">
          {/* Adzan Sound Switcher */}
          <button
            id="btn-adzan-notification-toggle"
            onClick={() => setAdzanNotificationEnabled(!adzanNotificationEnabled)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              adzanNotificationEnabled
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-sm'
                : 'bg-white dark:bg-zinc-900 text-stone-700 dark:text-zinc-300 border-stone-200 dark:border-zinc-800'
            }`}
          >
            {adzanNotificationEnabled ? <BellRing className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
            <span>{adzanNotificationEnabled ? 'Adzan Aktif' : 'Adzan Mati'}</span>
          </button>

          {/* Test Adzan Audio */}
          <button
            id="btn-test-adzan-audio"
            onClick={onOpenAdzanTest}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span>Tes Adzan</span>
          </button>

          {/* Qibla Direction Shortcut */}
          <button
            id="btn-shortcut-to-qibla"
            onClick={onNavigateToQibla}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-100 dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 hover:bg-stone-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <Compass className="w-4 h-4 text-amber-500" />
            <span>Arah Kiblat</span>
          </button>
        </div>
      </div>

      {/* Main Prayer Schedule Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {prayers.map((item) => {
          const Icon = item.icon;
          const isFardhu = ['subuh', 'dzuhur', 'ashar', 'maghrib', 'isya'].includes(item.id);

          return (
            <div
              key={item.id}
              id={`prayer-card-${item.id}`}
              className={`p-5 rounded-2xl bg-white dark:bg-zinc-900 border transition-all ${
                isFardhu
                  ? 'border-stone-200/90 dark:border-zinc-800 hover:border-emerald-500/50 shadow-xs'
                  : 'border-stone-100 dark:border-zinc-800/60 opacity-90'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-600 dark:text-zinc-400">
                  {item.label}
                </span>
                <Icon className={`w-4 h-4 ${isFardhu ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`} />
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900 dark:text-zinc-100 tracking-tight">
                {item.time}
              </div>

              <p className="text-[10px] sm:text-[11px] text-stone-400 dark:text-zinc-500 mt-2 line-clamp-2">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Special Islamic Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Qiyamul Lail & Sepertiga Malam Terakhir */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 to-stone-900 text-white border border-indigo-800/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Moon className="w-4 h-4" />
            Waktu Utama Tahajud (Sepertiga Malam Terakhir)
          </div>
          <div>
            <h3 className="text-xl font-bold">
              Pukul 01.30 s/d 04.15 {selectedCity.timezone}
            </h3>
            <p className="text-xs text-stone-300 mt-1 leading-relaxed">
              "Rabb kita tabaraka wa ta'ala turun ke langit dunia setiap sepertiga malam terakhir seraya berfirman: 'Siapa yang berdoa kepada-Ku, Aku kabulkan untuknya...'" (HR. Bukhari no. 1145).
            </p>
          </div>
        </div>

        {/* Pengingat Puasa Sunnah (Senin-Kamis & Ayyamul Bidh) */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-900 to-teal-950 text-white border border-emerald-800/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Jadwal Puasa Sunnah
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-100">Puasa Senin & Kamis:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-800 text-emerald-200">Setiap Pekan</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-100">Puasa Ayyamul Bidh:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-800 text-emerald-200">13, 14, 15 Hijriyah</span>
            </div>
            <p className="text-[11px] text-emerald-200/80 italic pt-1">
              "Amalan-amalan manusia dilaporkan pada hari Senin dan Kamis, maka aku suka ketika amalku dilaporkan aku sedang berpuasa." (HR. Tirmidzi).
            </p>
          </div>
        </div>
      </div>

      {/* 7-Day Timetable */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-base text-stone-900 dark:text-zinc-100">
              Jadwal Sholat 7 Hari Kedepan ({selectedCity.name})
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-stone-200 dark:border-zinc-800 text-stone-500 dark:text-zinc-400">
                <th className="py-2.5 px-3 font-semibold">Hari / Tanggal</th>
                <th className="py-2.5 px-2 font-semibold">Imsak</th>
                <th className="py-2.5 px-2 font-semibold">Subuh</th>
                <th className="py-2.5 px-2 font-semibold">Terbit</th>
                <th className="py-2.5 px-2 font-semibold">Dhuha</th>
                <th className="py-2.5 px-2 font-semibold">Dzuhur</th>
                <th className="py-2.5 px-2 font-semibold">Ashar</th>
                <th className="py-2.5 px-2 font-semibold">Maghrib</th>
                <th className="py-2.5 px-2 font-semibold">Isya</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-zinc-800">
              {nextDays.map((d, idx) => (
                <tr key={idx} className={idx === 0 ? 'bg-emerald-50/60 dark:bg-emerald-950/20 font-bold' : ''}>
                  <td className="py-3 px-3 text-stone-800 dark:text-zinc-200 whitespace-nowrap">
                    {d.dateObj.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </td>
                  <td className="py-3 px-2 font-mono">{d.sched.imsak}</td>
                  <td className="py-3 px-2 font-mono text-emerald-600 dark:text-emerald-400">{d.sched.subuh}</td>
                  <td className="py-3 px-2 font-mono">{d.sched.terbit}</td>
                  <td className="py-3 px-2 font-mono">{d.sched.dhuha}</td>
                  <td className="py-3 px-2 font-mono">{d.sched.dzuhur}</td>
                  <td className="py-3 px-2 font-mono">{d.sched.ashar}</td>
                  <td className="py-3 px-2 font-mono text-emerald-600 dark:text-emerald-400">{d.sched.maghrib}</td>
                  <td className="py-3 px-2 font-mono">{d.sched.isya}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
