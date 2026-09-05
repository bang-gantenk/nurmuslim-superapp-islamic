import React, { useState } from 'react';
import { Search, MapPin, Calendar, Clock, ChevronDown, Check } from 'lucide-react';
import { CityLocation, AppTab } from '../types';
import { INDONESIAN_CITIES } from '../data/prayerCalculation';
import { NurMuslimLogo } from './NurMuslimLogo';

interface Windows11TitlebarProps {
  setActiveTab: (tab: AppTab) => void;
  selectedCity: CityLocation;
  setSelectedCity: (city: CityLocation) => void;
  hijriDate: string;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  onOpenAdzanTest: () => void;
}

export const Windows11Titlebar: React.FC<Windows11TitlebarProps> = ({
  setActiveTab,
  selectedCity,
  setSelectedCity,
  hijriDate,
  selectedDate,
  setSelectedDate,
}) => {
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const [selectedProvinceFilter, setSelectedProvinceFilter] = useState('Semua');

  const provinces = [
    'Semua',
    'Jawa Tengah',
    'DKI Jakarta',
    'Banten',
    'Jawa Barat',
    'DI Yogyakarta',
    'Jawa Timur',
    'Sumatera',
    'Kalimantan',
    'Sulawesi',
    'Bali & Nusa Tenggara',
    'Maluku & Papua',
  ];

  const filteredCities = INDONESIAN_CITIES.filter((city) => {
    const matchesQuery =
      city.name.toLowerCase().includes(citySearchQuery.toLowerCase()) ||
      city.province.toLowerCase().includes(citySearchQuery.toLowerCase());

    if (!matchesQuery) return false;

    if (selectedProvinceFilter === 'Semua') return true;
    if (selectedProvinceFilter === 'Sumatera') {
      return ['Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Kepulauan Riau', 'Jambi', 'Sumatera Selatan', 'Bengkulu', 'Bangka Belitung', 'Lampung'].includes(city.province);
    }
    if (selectedProvinceFilter === 'Kalimantan') {
      return city.province.startsWith('Kalimantan');
    }
    if (selectedProvinceFilter === 'Sulawesi') {
      return city.province.startsWith('Sulawesi') || city.province === 'Gorontalo';
    }
    if (selectedProvinceFilter === 'Bali & Nusa Tenggara') {
      return ['Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur'].includes(city.province);
    }
    if (selectedProvinceFilter === 'Maluku & Papua') {
      return city.province.includes('Maluku') || city.province.includes('Papua');
    }
    return city.province === selectedProvinceFilter;
  });

  // Date formatting for titlebar
  const formattedDateStr = selectedDate.toLocaleDateString('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <>
      <header className="sticky top-0 z-40 w-full select-none bg-[#f3f4f6]/95 dark:bg-[#151a1f]/95 backdrop-blur-xl border-b border-black/[0.08] dark:border-white/[0.08] text-xs text-stone-700 dark:text-zinc-300">
        <div className="max-w-[1280px] mx-auto px-2.5 sm:px-4 h-9 flex items-center justify-between gap-2">
          
          {/* App Icon + App Name */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity shrink-0"
            title="Kembali ke Beranda"
          >
            <NurMuslimLogo size="xs" />
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-stone-900 dark:text-zinc-100 text-[12px] tracking-tight">
                NurMuslim
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800/60">
                SuperApp
              </span>
              <span className="hidden lg:inline text-stone-400 dark:text-zinc-500 text-[11px]">
                — Fiqih & Sunnah Seluruh Indonesia
              </span>
            </div>
          </div>

          {/* Center Info: Tanggal, Bulan, Tahun & Hijriyah */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('prayer')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-200/60 dark:bg-zinc-800/70 hover:bg-stone-300/60 dark:hover:bg-zinc-700/70 transition-colors text-[11px] font-semibold text-stone-800 dark:text-zinc-200"
              title="Klik untuk atur Tanggal, Bulan, Tahun Jadwal Sholat"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{formattedDateStr}</span>
              <span className="hidden sm:inline text-emerald-600 dark:text-emerald-400 font-bold">• {hijriDate}</span>
            </button>
          </div>

          {/* Right: City Selector Button (No Minimize, Maximize, or Close Buttons) */}
          <div className="flex items-center gap-1.5">
            <button
              id="titlebar-city-selector-btn"
              onClick={() => setIsCityModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 text-[11px] font-semibold transition-all cursor-pointer"
              title="Ganti Wilayah / Kota (Jateng & Seluruh Indonesia)"
            >
              <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="max-w-[120px] sm:max-w-[180px] truncate">{selectedCity.name}</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-700/20 text-emerald-700 dark:text-emerald-300 font-mono hidden sm:inline">
                {selectedCity.timezone}
              </span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>
          </div>
        </div>
      </header>

      {/* Full City Selection Modal */}
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
                  Pilih Wilayah / Kota Seluruh Indonesia
                </h3>
                <p className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
                  Tersedia lengkap 35 Kab/Kota Jawa Tengah (Tegal, Brebes, dll) & seluruh 38 provinsi
                </p>
              </div>
              <button 
                onClick={() => setIsCityModalOpen(false)}
                className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-zinc-800 text-stone-500 dark:text-zinc-400 text-xs font-semibold hover:bg-stone-200"
              >
                Tutup
              </button>
            </div>

            {/* Search and Province Filters */}
            <div className="p-3 border-b border-stone-200 dark:border-zinc-800 space-y-2 bg-stone-50/50 dark:bg-zinc-900/50">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Ketik nama kota, kabupaten, atau provinsi (contoh: Tegal, Brebes, Solo, Semarang)..."
                  value={citySearchQuery}
                  onChange={(e) => setCitySearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-zinc-800 border border-stone-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-emerald-500 font-medium"
                  autoFocus
                />
              </div>

              {/* Province Pill Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {provinces.map((prov) => (
                  <button
                    key={prov}
                    onClick={() => setSelectedProvinceFilter(prov)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedProvinceFilter === prov
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white dark:bg-zinc-800 text-stone-600 dark:text-zinc-400 hover:bg-stone-200/70 border border-stone-200 dark:border-zinc-700'
                    }`}
                  >
                    {prov}
                  </button>
                ))}
              </div>
            </div>

            {/* Cities List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5 max-h-[50vh]">
              {filteredCities.length === 0 ? (
                <div className="p-8 text-center text-xs text-stone-500 dark:text-zinc-400">
                  Kota tidak ditemukan untuk kata kunci "{citySearchQuery}". Silakan coba kata kunci lain.
                </div>
              ) : (
                filteredCities.map((city) => {
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
                          {city.province} • Koordinat: {city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}°
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
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-stone-50 dark:bg-zinc-900/80 border-t border-stone-200 dark:border-zinc-800 flex items-center justify-between text-xs text-stone-500 dark:text-zinc-400">
              <span>Total: {filteredCities.length} kota & kabupaten tersedia</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Kemenag RI Certified Math</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
