import React, { useState, useMemo } from 'react';
import { 
  Clock, 
  MapPin, 
  Bell, 
  BellRing, 
  Volume2, 
  Calendar, 
  Moon, 
  Sun, 
  Sparkles, 
  Compass, 
  Search,
  Check,
  ChevronLeft,
  ChevronRight,
  Navigation,
  CalendarDays
} from 'lucide-react';
import { CityLocation, PrayerTimeSchedule } from '../types';
import { INDONESIAN_CITIES, calculatePrayerTimes } from '../data/prayerCalculation';

interface PrayerTimesViewProps {
  selectedCity: CityLocation;
  setSelectedCity: (city: CityLocation) => void;
  prayerTimes: PrayerTimeSchedule;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  adzanNotificationEnabled: boolean;
  setAdzanNotificationEnabled: (enabled: boolean) => void;
  onOpenAdzanTest: () => void;
  onNavigateToQibla: () => void;
}

export const PrayerTimesView: React.FC<PrayerTimesViewProps> = ({
  selectedCity,
  setSelectedCity,
  prayerTimes,
  selectedDate,
  setSelectedDate,
  adzanNotificationEnabled,
  setAdzanNotificationEnabled,
  onOpenAdzanTest,
  onNavigateToQibla,
}) => {
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsSuccess, setGpsSuccess] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [activeProvinceFilter, setActiveProvinceFilter] = useState('Semua');

  // Month names in Indonesian
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  // Quick Date Handlers
  const handleSetToday = () => {
    setSelectedDate(new Date());
  };

  const handleSetYesterday = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d);
  };

  const handleSetTomorrow = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d);
  };

  const handleSetDayAfterTomorrow = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 2);
    setSelectedDate(d);
  };

  // Change specific component of date
  const handleChangeDay = (day: number) => {
    const d = new Date(selectedDate);
    d.setDate(day);
    setSelectedDate(d);
  };

  const handleChangeMonth = (monthIndex: number) => {
    const d = new Date(selectedDate);
    d.setMonth(monthIndex);
    setSelectedDate(d);
  };

  const handleChangeYear = (year: number) => {
    const d = new Date(selectedDate);
    d.setFullYear(year);
    setSelectedDate(d);
  };

  // HTML <input type="date"> value format YYYY-MM-DD
  const inputDateValue = useMemo(() => {
    const y = selectedDate.getFullYear();
    const m = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const d = String(selectedDate.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, [selectedDate]);

  const handleNativeDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const [y, m, d] = e.target.value.split('-').map(Number);
    const newD = new Date(y, m - 1, d);
    setSelectedDate(newD);
  };

  // Days in selected month
  const daysInSelectedMonth = useMemo(() => {
    return new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  }, [selectedDate]);

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
        alert('Tidak dapat mengakses lokasi GPS. Pastikan izin lokasi aktif.');
      },
      { timeout: 10000 }
    );
  };

  const prayers = [
    { id: 'imsak', label: 'Imsak', time: prayerTimes.imsak, icon: Moon, desc: 'Batas akhir sahur puasa (10 mnt sebelum Subuh)' },
    { id: 'subuh', label: 'Subuh', time: prayerTimes.subuh, icon: Moon, desc: 'Awal fajar shadiq & awal waktu puasa' },
    { id: 'terbit', label: 'Terbit (Syuruq)', time: prayerTimes.terbit, icon: Sun, desc: 'Matahari mulai terbit di ufuk timur' },
    { id: 'dhuha', label: 'Dhuha', time: prayerTimes.dhuha, icon: Sun, desc: 'Tinggi matahari sepenggalah (~25 mnt pasca terbit)' },
    { id: 'dzuhur', label: 'Dzuhur', time: prayerTimes.dzuhur, icon: Sun, desc: 'Matahari tergelincir dari zenit' },
    { id: 'ashar', label: 'Ashar', time: prayerTimes.ashar, icon: Sun, desc: 'Bayangan sama dengan panjang benda' },
    { id: 'maghrib', label: 'Maghrib', time: prayerTimes.maghrib, icon: Moon, desc: 'Matahari terbenam & waktu berbuka puasa' },
    { id: 'isya', label: 'Isya', time: prayerTimes.isya, icon: Moon, desc: 'Hilangnya mega merah di ufuk barat' },
  ];

  // 7-day schedule around the selected date
  const scheduleAroundSelectedDate = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(selectedDate);
      d.setDate(selectedDate.getDate() + (i - 1)); // yesterday, today, +5 days
      const tzOffset = selectedCity.timezone === 'WIT' ? 9 : selectedCity.timezone === 'WITA' ? 8 : 7;
      const sched = calculatePrayerTimes(selectedCity.latitude, selectedCity.longitude, tzOffset, d);
      return {
        dateObj: d,
        sched,
        isCurrentSelected: d.toDateString() === selectedDate.toDateString(),
      };
    });
  }, [selectedCity, selectedDate]);

  // City filter for modal
  const filteredCities = useMemo(() => {
    return INDONESIAN_CITIES.filter((city) => {
      const matches =
        city.name.toLowerCase().includes(citySearchQuery.toLowerCase()) ||
        city.province.toLowerCase().includes(citySearchQuery.toLowerCase());
      if (!matches) return false;

      if (activeProvinceFilter === 'Semua') return true;
      if (activeProvinceFilter === 'Jawa Tengah') return city.province === 'Jawa Tengah';
      if (activeProvinceFilter === 'Sumatera') {
        return ['Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Kepulauan Riau', 'Jambi', 'Sumatera Selatan', 'Bengkulu', 'Bangka Belitung', 'Lampung'].includes(city.province);
      }
      if (activeProvinceFilter === 'Jawa Lainnya') {
        return ['DKI Jakarta', 'Banten', 'Jawa Barat', 'DI Yogyakarta', 'Jawa Timur'].includes(city.province);
      }
      return city.province.includes(activeProvinceFilter);
    });
  }, [citySearchQuery, activeProvinceFilter]);

  const isToday = useMemo(() => {
    const today = new Date();
    return today.toDateString() === selectedDate.toDateString();
  }, [selectedDate]);

  return (
    <div id="prayer-times-main-view" className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-emerald-950 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold border border-blue-600/40">
              Kementerian Agama RI • Standar Hisab Astronomis
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-semibold">
              🌙 {prayerTimes.hijriDate}
            </span>
            {isToday ? (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/90 text-stone-950 text-xs font-bold">
                Hari Ini
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold">
                Tanggal Terpilih
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Jadwal Sholat & Imsakiyah
              </h1>
              <p className="text-xs sm:text-sm text-blue-200 mt-1 flex items-center gap-2">
                <span>{prayerTimes.date}</span>
                <span>•</span>
                <strong className="text-white font-bold">{selectedCity.name}</strong> ({selectedCity.province} - {selectedCity.timezone})
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                id="btn-detect-gps-location"
                onClick={handleDetectGPS}
                disabled={gpsLoading}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 backdrop-blur-md flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
              >
                <Navigation className={`w-3.5 h-3.5 text-amber-300 ${gpsLoading ? 'animate-spin' : ''}`} />
                <span>{gpsLoading ? 'Mendeteksi...' : gpsSuccess ? 'GPS Terhubung!' : 'Deteksi GPS'}</span>
              </button>

              <button
                id="btn-change-city-modal"
                onClick={() => setIsCityModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Pilih Kota ({selectedCity.name})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TANGGAL, BULAN & TAHUN SELECTOR CARD */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-zinc-100">
                Sesuaikan Tanggal, Bulan & Tahun
              </h3>
              <p className="text-xs text-stone-500 dark:text-zinc-400">
                Jadwal sholat otomatis menghitung posisi matahari secara astronomis sesuai tanggal yang Anda pilih
              </p>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={handleSetYesterday}
              className="px-2.5 py-1.5 rounded-xl bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 text-stone-700 dark:text-zinc-300 text-xs font-semibold whitespace-nowrap transition-colors"
            >
              Kemarin
            </button>
            <button
              onClick={handleSetToday}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isToday
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 text-stone-700 dark:text-zinc-300'
              }`}
            >
              Hari Ini
            </button>
            <button
              onClick={handleSetTomorrow}
              className="px-2.5 py-1.5 rounded-xl bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 text-stone-700 dark:text-zinc-300 text-xs font-semibold whitespace-nowrap transition-colors"
            >
              Besok
            </button>
            <button
              onClick={handleSetDayAfterTomorrow}
              className="px-2.5 py-1.5 rounded-xl bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 text-stone-700 dark:text-zinc-300 text-xs font-semibold whitespace-nowrap transition-colors"
            >
              Lusa
            </button>
          </div>
        </div>

        {/* 3 Selectors: Tanggal, Bulan, Tahun + Native Calendar Input */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          {/* Tanggal (Day) */}
          <div className="sm:col-span-3 space-y-1">
            <label className="block text-xs font-semibold text-stone-600 dark:text-zinc-400">
              Tanggal (Hari):
            </label>
            <select
              id="select-prayer-day"
              value={selectedDate.getDate()}
              onChange={(e) => handleChangeDay(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 font-bold text-xs sm:text-sm text-stone-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
            >
              {Array.from({ length: daysInSelectedMonth }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  Tanggal {d}
                </option>
              ))}
            </select>
          </div>

          {/* Bulan (Month) */}
          <div className="sm:col-span-4 space-y-1">
            <label className="block text-xs font-semibold text-stone-600 dark:text-zinc-400">
              Bulan:
            </label>
            <select
              id="select-prayer-month"
              value={selectedDate.getMonth()}
              onChange={(e) => handleChangeMonth(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 font-bold text-xs sm:text-sm text-stone-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
            >
              {monthNames.map((name, idx) => (
                <option key={idx} value={idx}>
                  {idx + 1} - {name}
                </option>
              ))}
            </select>
          </div>

          {/* Tahun (Year) */}
          <div className="sm:col-span-3 space-y-1">
            <label className="block text-xs font-semibold text-stone-600 dark:text-zinc-400">
              Tahun:
            </label>
            <select
              id="select-prayer-year"
              value={selectedDate.getFullYear()}
              onChange={(e) => handleChangeYear(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 font-bold text-xs sm:text-sm text-stone-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
            >
              {[2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035].map((y) => (
                <option key={y} value={y}>
                  Tahun {y}
                </option>
              ))}
            </select>
          </div>

          {/* Native Date Picker Shortcut */}
          <div className="sm:col-span-2 space-y-1">
            <label className="block text-xs font-semibold text-stone-600 dark:text-zinc-400">
              Pilih Kalender:
            </label>
            <input
              type="date"
              value={inputDateValue}
              onChange={handleNativeDateChange}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs font-semibold text-stone-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Selected Date Summary Indicator */}
        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-800 dark:text-emerald-300">
              Jadwal Sholat Aktif:
            </span>
            <span className="font-semibold text-stone-800 dark:text-zinc-200">
              {prayerTimes.date}
            </span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
              ({prayerTimes.hijriDate})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const d = new Date(selectedDate);
                d.setDate(d.getDate() - 1);
                setSelectedDate(d);
              }}
              className="p-1 rounded hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-200 flex items-center gap-1 font-semibold"
              title="Hari Sebelumnya"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Sebelumnya
            </button>
            <span className="text-stone-300">|</span>
            <button
              onClick={() => {
                const d = new Date(selectedDate);
                d.setDate(d.getDate() + 1);
                setSelectedDate(d);
              }}
              className="p-1 rounded hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-200 flex items-center gap-1 font-semibold"
              title="Hari Berikutnya"
            >
              Berikutnya <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Prayer Schedule Cards (8 Waktu Lengkap) */}
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

              <p className="text-[11px] text-stone-500 dark:text-zinc-400 mt-2 line-clamp-1">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Secondary Controls: Adzan Audio & Kiblat */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            id="btn-adzan-notification-toggle"
            onClick={() => setAdzanNotificationEnabled(!adzanNotificationEnabled)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              adzanNotificationEnabled
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-sm'
                : 'bg-stone-50 dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 border-stone-200 dark:border-zinc-700'
            }`}
          >
            {adzanNotificationEnabled ? <BellRing className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
            <span>{adzanNotificationEnabled ? 'Pengingat Adzan Aktif' : 'Aktifkan Pengingat Adzan'}</span>
          </button>

          <button
            id="btn-test-adzan-audio"
            onClick={onOpenAdzanTest}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span>Tes Kumandang Adzan</span>
          </button>
        </div>

        <button
          id="btn-shortcut-to-qibla"
          onClick={onNavigateToQibla}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-100 dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 hover:bg-stone-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <Compass className="w-4 h-4 text-amber-500" />
          <span>Lihat Arah Kiblat {selectedCity.name}</span>
        </button>
      </div>

      {/* 7-Day Contextual Schedule Table */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-zinc-800">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-zinc-100">
              Tinjauan Jadwal Sholat 7 Hari
            </h3>
            <p className="text-xs text-stone-500 dark:text-zinc-400">
              Melihat pergeseran menit jadwal sholat harian di {selectedCity.name}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-stone-200 dark:border-zinc-800 text-stone-500 dark:text-zinc-400 font-semibold">
                <th className="pb-2.5 font-semibold">Tanggal & Hari</th>
                <th className="pb-2.5 font-semibold">Imsak</th>
                <th className="pb-2.5 font-semibold">Subuh</th>
                <th className="pb-2.5 font-semibold">Terbit</th>
                <th className="pb-2.5 font-semibold">Dzuhur</th>
                <th className="pb-2.5 font-semibold">Ashar</th>
                <th className="pb-2.5 font-semibold">Maghrib</th>
                <th className="pb-2.5 font-semibold">Isya</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-zinc-800">
              {scheduleAroundSelectedDate.map((item, idx) => {
                const dayLabel = item.dateObj.toLocaleDateString('id-ID', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                });

                return (
                  <tr
                    key={idx}
                    onClick={() => setSelectedDate(item.dateObj)}
                    className={`cursor-pointer transition-colors ${
                      item.isCurrentSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-900 dark:text-emerald-200'
                        : 'hover:bg-stone-50 dark:hover:bg-zinc-800/60 text-stone-700 dark:text-zinc-300'
                    }`}
                  >
                    <td className="py-3 flex items-center gap-1.5 font-medium">
                      <span>{dayLabel}</span>
                      {item.isCurrentSelected && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-600 text-white font-bold">
                          Terpilih
                        </span>
                      )}
                    </td>
                    <td className="py-3 font-mono">{item.sched.imsak}</td>
                    <td className="py-3 font-mono">{item.sched.subuh}</td>
                    <td className="py-3 font-mono">{item.sched.terbit}</td>
                    <td className="py-3 font-mono">{item.sched.dzuhur}</td>
                    <td className="py-3 font-mono">{item.sched.ashar}</td>
                    <td className="py-3 font-mono">{item.sched.maghrib}</td>
                    <td className="py-3 font-mono">{item.sched.isya}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* City Selector Modal */}
      {isCityModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setIsCityModalOpen(false)}
        >
          <div 
            className="w-full max-w-xl max-h-[85vh] bg-white dark:bg-[#181e24] rounded-2xl shadow-2xl border border-stone-200 dark:border-zinc-800 flex flex-col overflow-hidden text-stone-800 dark:text-zinc-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-stone-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Pilih Wilayah / Kota Indonesia
                </h3>
                <p className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
                  Termasuk seluruh Jawa Tengah (Tegal, Brebes, Pekalongan, Pemalang, Banyumas, Solo, dll)
                </p>
              </div>
              <button 
                onClick={() => setIsCityModalOpen(false)}
                className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-zinc-800 text-stone-500 dark:text-zinc-400 text-xs font-semibold hover:bg-stone-200"
              >
                Tutup
              </button>
            </div>

            {/* Search Input & Province Filter */}
            <div className="p-3 border-b border-stone-200 dark:border-zinc-800 space-y-2 bg-stone-50/50 dark:bg-zinc-900/50">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Ketik nama kota/kabupaten (misal: Tegal, Brebes, Pemalang, Kendal, Surabaya)..."
                  value={citySearchQuery}
                  onChange={(e) => setCitySearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-zinc-800 border border-stone-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-emerald-500 font-medium"
                  autoFocus
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {['Semua', 'Jawa Tengah', 'Jawa Lainnya', 'Sumatera'].map((prov) => (
                  <button
                    key={prov}
                    onClick={() => setActiveProvinceFilter(prov)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      activeProvinceFilter === prov
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white dark:bg-zinc-800 text-stone-600 dark:text-zinc-400 hover:bg-stone-200/70 border border-stone-200 dark:border-zinc-700'
                    }`}
                  >
                    {prov}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5 max-h-[50vh]">
              {filteredCities.map((city) => {
                const isSelected = selectedCity.id === city.id;
                return (
                  <button
                    key={city.id}
                    onClick={() => {
                      setSelectedCity(city);
                      setIsCityModalOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-400/50 text-emerald-900 dark:text-emerald-200 font-bold'
                        : 'hover:bg-stone-100 dark:hover:bg-zinc-800/80 border border-transparent text-stone-800 dark:text-zinc-200'
                    }`}
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                        <span>{city.name}</span>
                        {city.province === 'Jawa Tengah' && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300/40">
                            Jateng
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-500 dark:text-zinc-400">
                        {city.province} • {city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}°
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-200/60 dark:bg-zinc-800 text-stone-600 dark:text-zinc-400 font-medium">
                        {city.timezone}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
