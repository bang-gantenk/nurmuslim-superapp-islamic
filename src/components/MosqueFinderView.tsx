import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Navigation, 
  Users, 
  Sparkles, 
  ExternalLink, 
  PlusCircle, 
  Check, 
  Clock, 
  ShieldCheck,
  Compass,
  Star,
  BookOpen
} from 'lucide-react';
import { MosqueItem, CityLocation } from '../types';
import { INDONESIAN_MOSQUES, calculateGeoDistance } from '../data/mosquesData';

interface MosqueFinderViewProps {
  selectedCity: CityLocation;
}

export const MosqueFinderView: React.FC<MosqueFinderViewProps> = ({
  selectedCity,
}) => {
  const [mosques, setMosques] = useState<MosqueItem[]>(INDONESIAN_MOSQUES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState<string>('Semua');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Mosque Form
  const [newMosqueName, setNewMosqueName] = useState('');
  const [newMosqueCity, setNewMosqueCity] = useState(selectedCity.name);
  const [newMosqueAddress, setNewMosqueAddress] = useState('');
  const [newMosqueCapacity, setNewMosqueCapacity] = useState(1000);
  const [newMosqueAdded, setNewMosqueAdded] = useState(false);

  const facilitiesList = [
    'Semua',
    'Parkir Luas',
    'AC Penuh',
    'Kajian Rutin',
    'Ramah Difabel',
  ];

  const filteredMosques = mosques.map(m => {
    const dist = calculateGeoDistance(selectedCity.latitude, selectedCity.longitude, m.latitude, m.longitude);
    return { ...m, dynamicDistanceKm: dist };
  }).filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchFacility = selectedFacility === 'Semua' || m.facilities.some(f => f.toLowerCase().includes(selectedFacility.toLowerCase()));
    return matchSearch && matchFacility;
  }).sort((a, b) => (a.dynamicDistanceKm || 0) - (b.dynamicDistanceKm || 0));

  const handleAddMosque = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMosqueName || !newMosqueAddress) return;

    const newM: MosqueItem = {
      id: `m-${Date.now()}`,
      name: newMosqueName,
      city: newMosqueCity,
      province: selectedCity.province,
      address: newMosqueAddress,
      latitude: selectedCity.latitude + (Math.random() * 0.02 - 0.01),
      longitude: selectedCity.longitude + (Math.random() * 0.02 - 0.01),
      capacity: newMosqueCapacity,
      rating: 5.0,
      facilities: ['Tempat Wudhu Nyaman', 'Parkir Luas', 'AC Sejuk', 'Kajian Rutin'],
      hasKajian: true,
      kajianSchedule: 'Kajian Rutin Akhir Pekan Ba\'da Maghrib',
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
      googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(newMosqueName + ' ' + newMosqueCity)}`,
    };

    setMosques([newM, ...mosques]);
    setNewMosqueAdded(true);
    setTimeout(() => {
      setNewMosqueAdded(false);
      setShowAddModal(false);
      setNewMosqueName('');
      setNewMosqueAddress('');
    }, 1500);
  };

  const openGoogleMaps = (mosque: MosqueItem) => {
    const url = mosque.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mosque.name + ' ' + mosque.city)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="mosque-finder-main-view" className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-stone-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
              Rumah Allah • Memakmurkan Masjid
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Pencari Masjid Terdekat
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xl">
                Temukan masjid terdekat di wilayah {selectedCity.name} dengan fasilitas lengkap, jadwal kajian sunnah, kapasitas jamaah, dan rute navigasi.
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-bold shadow-md flex items-center gap-2 transition-all active:scale-95 whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4 text-emerald-700" />
              <span>Daftarkan Masjid Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama masjid, kota, atau daerah (contoh: Istiqlal, Jogokariyan, Al-Jabbar)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-xs sm:text-sm text-stone-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Facility Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {facilitiesList.map((fac) => (
            <button
              key={fac}
              onClick={() => setSelectedFacility(fac)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFacility === fac
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-zinc-900 text-stone-600 dark:text-zinc-300 border border-stone-200 dark:border-zinc-800'
              }`}
            >
              {fac}
            </button>
          ))}
        </div>
      </div>

      {/* Mosques Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMosques.map((mosque) => (
          <div
            key={mosque.id}
            id={`mosque-card-${mosque.id}`}
            className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 hover:border-emerald-500/50 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Header Badges */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold">
                      {mosque.city} ({mosque.province})
                    </span>
                    {mosque.hasKajian && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                        ⭐ Ada Kajian
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-stone-900 dark:text-zinc-100">
                    {mosque.name}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-xl bg-stone-100 dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 text-xs font-mono font-bold">
                    ~{mosque.dynamicDistanceKm} km
                  </span>
                </div>
              </div>

              {/* Address */}
              <p className="text-xs text-stone-600 dark:text-zinc-400 flex items-start gap-1.5 leading-relaxed">
                <MapPin className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" />
                <span>{mosque.address}</span>
              </p>

              {/* Stats: Capacity & Kajian */}
              <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-zinc-400 pt-1">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  Kapasitas: <strong className="text-stone-700 dark:text-zinc-300">{mosque.capacity.toLocaleString('id-ID')} Jamaah</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  Rating: <strong className="text-stone-700 dark:text-zinc-300">{mosque.rating}</strong>
                </span>
              </div>

              {/* Kajian Schedule */}
              {mosque.kajianSchedule && (
                <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 text-xs text-emerald-950 dark:text-emerald-200 flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Jadwal Kajian:</span>
                    <span className="text-[11px] text-emerald-800 dark:text-emerald-300">{mosque.kajianSchedule}</span>
                  </div>
                </div>
              )}

              {/* Facilities Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {mosque.facilities.map((fac, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-zinc-300 text-[11px] font-medium"
                  >
                    ✓ {fac}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Terverifikasi
              </span>

              <button
                onClick={() => openGoogleMaps(mosque)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Petunjuk Arah Maps</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Mosque Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full p-6 space-y-4 border border-stone-200 dark:border-zinc-800 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-zinc-800">
              <h3 className="font-bold text-base text-stone-900 dark:text-zinc-100 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-600" />
                Daftarkan Masjid Sekitar Anda
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {newMosqueAdded ? (
              <div className="p-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="font-bold text-stone-900 dark:text-zinc-100">
                  Alhamdulillah! Masjid Berhasil Ditambahkan
                </h4>
                <p className="text-xs text-stone-500">
                  Terima kasih atas kontribusi Anda dalam memakmurkan rumah Allah.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddMosque} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Nama Masjid</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Masjid Jami' An-Nuur"
                    value={newMosqueName}
                    onChange={(e) => setNewMosqueName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Kota / Kabupaten</label>
                  <input
                    type="text"
                    required
                    value={newMosqueCity}
                    onChange={(e) => setNewMosqueCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Alamat Lengkap</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Jl. Raya Utama No. 10, RT 01/RW 02..."
                    value={newMosqueAddress}
                    onChange={(e) => setNewMosqueAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Perkiraan Daya Tampung Jamaah</label>
                  <input
                    type="number"
                    value={newMosqueCapacity}
                    onChange={(e) => setNewMosqueCapacity(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs"
                  />
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-stone-100 dark:bg-zinc-800 font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold"
                  >
                    Simpan Masjid
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
