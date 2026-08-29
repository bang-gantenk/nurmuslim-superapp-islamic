import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  RotateCw, 
  ShieldCheck, 
  Navigation, 
  Info, 
  Sparkles,
  CheckCircle2,
  Sliders,
  Monitor,
  Smartphone,
  Target
} from 'lucide-react';
import { CityLocation } from '../types';
import { calculateQiblaAngle, calculateDistanceToKaaba, INDONESIAN_CITIES } from '../data/prayerCalculation';

interface QiblaCompassViewProps {
  selectedCity: CityLocation;
  setSelectedCity: (city: CityLocation) => void;
}

export const QiblaCompassView: React.FC<QiblaCompassViewProps> = ({
  selectedCity,
  setSelectedCity,
}) => {
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [manualAngle, setManualAngle] = useState<number>(0);
  const [useDeviceSensor, setUseDeviceSensor] = useState<boolean>(true);
  const [sensorSupported, setSensorSupported] = useState<boolean>(false);
  const [sensorPermissionNeeded, setSensorPermissionNeeded] = useState<boolean>(false);
  const [isWindowsOrDesktop, setIsWindowsOrDesktop] = useState<boolean>(false);

  // Calculate target qibla bearing from true North
  const qiblaAngle = calculateQiblaAngle(selectedCity.latitude, selectedCity.longitude);
  const distanceKm = calculateDistanceToKaaba(selectedCity.latitude, selectedCity.longitude);

  // Detect Windows or Desktop Environment
  useEffect(() => {
    const ua = navigator.userAgent || '';
    const platform = (navigator as any).userAgentData?.platform || navigator.platform || '';
    const isWin = /Win/i.test(platform) || /Windows/i.test(ua);
    const isMac = /Macintosh|MacIntel/i.test(platform) && !navigator.maxTouchPoints;
    const isLinuxDesktop = /Linux/i.test(platform) && !/Android/i.test(ua);
    const isDesktopDevice = isWin || isMac || isLinuxDesktop || (window.innerWidth > 1024 && !('ontouchstart' in window));

    setIsWindowsOrDesktop(isDesktopDevice);
    if (isDesktopDevice) {
      setUseDeviceSensor(false);
      setManualAngle(qiblaAngle);
    }
  }, [qiblaAngle]);

  // Compass current rotation
  const currentCompassAngle = useDeviceSensor && sensorSupported ? deviceHeading : manualAngle;

  // Difference between current heading and Qibla direction
  const rawDiff = (qiblaAngle - currentCompassAngle + 360) % 360;
  const isAligned = rawDiff <= 4 || rawDiff >= 356;

  // Listen to device orientation (magnetometer)
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      let heading = e.alpha || 0;

      // Handle iOS webkitCompassHeading
      if ((e as any).webkitCompassHeading !== undefined) {
        heading = (e as any).webkitCompassHeading;
      } else if (e.alpha !== null) {
        heading = 360 - e.alpha;
      }

      setDeviceHeading(Math.round(heading));
      setSensorSupported(true);
    };

    if (window.DeviceOrientationEvent && !isWindowsOrDesktop) {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        setSensorPermissionNeeded(true);
      } else {
        window.addEventListener('deviceorientation', handleOrientation, true);
        window.addEventListener('deviceorientationabsolute', handleOrientation as any, true);
      }
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      window.removeEventListener('deviceorientationabsolute', handleOrientation as any, true);
    };
  }, [isWindowsOrDesktop]);

  // Request iOS 13+ sensor permission
  const requestSensorPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          setSensorPermissionNeeded(false);
          window.addEventListener('deviceorientation', (e) => {
            const heading = (e as any).webkitCompassHeading || (e.alpha ? 360 - e.alpha : 0);
            setDeviceHeading(Math.round(heading));
            setSensorSupported(true);
          }, true);
        }
      } catch (err) {
        console.warn('Sensor permission error:', err);
      }
    }
  };

  // Set directly to target Qibla angle
  const handleAlignToQibla = () => {
    setUseDeviceSensor(false);
    setManualAngle(qiblaAngle);
  };

  // Trigger vibration haptic feedback when perfectly aligned on touch devices
  useEffect(() => {
    if (isAligned && navigator.vibrate) {
      navigator.vibrate(50);
    }
  }, [isAligned]);

  return (
    <div id="qibla-compass-main-view" className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-800 via-stone-900 to-emerald-950 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-700/80 text-amber-200 text-xs font-semibold">
              Ka'bah Al-Musyarrafah • Makkah Al-Mukarramah
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Arah Kiblat Presisi
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
            Arah kiblat untuk wilayah {selectedCity.name} adalah <strong className="text-amber-300">{qiblaAngle}°</strong> dari arah Utara (Barat Laut).
          </p>
        </div>
      </div>

      {/* Windows / Desktop Notice Card */}
      {isWindowsOrDesktop && (
        <div className="p-4 sm:p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-950 dark:text-blue-200 space-y-2.5 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
            <Monitor className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Terdeteksi Menggunakan Windows / Komputer Desktop</span>
          </div>
          <p className="text-xs leading-relaxed text-blue-900/90 dark:text-blue-300/90">
            Sensor kompas magnetik otomatis fisik biasanya hanya ada pada perangkat HP (Android / iOS). Pada komputer Windows, Anda dapat berpedoman pada sudut kompas <strong>{qiblaAngle}° Barat Laut</strong> dari arah Utara, atau klik tombol di bawah untuk menyetel kompas langsung:
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={handleAlignToQibla}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
            >
              <Target className="w-3.5 h-3.5" />
              <span>Arahkan Tepat ke Kiblat ({qiblaAngle}°)</span>
            </button>
            <button
              onClick={() => { setUseDeviceSensor(false); setManualAngle(0); }}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-zinc-700 text-xs font-semibold hover:bg-blue-50"
            >
              Setel ke Utara (0°)
            </button>
          </div>
        </div>
      )}

      {/* City Selector & Mode Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* City Dropdown */}
        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 p-2.5 rounded-2xl border border-stone-200 dark:border-zinc-800 shadow-xs">
          <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 ml-1" />
          <span className="text-xs text-stone-500 font-medium">Lokasi:</span>
          <select
            id="qibla-city-select"
            value={selectedCity.id}
            onChange={(e) => {
              const found = INDONESIAN_CITIES.find(c => c.id === e.target.value);
              if (found) setSelectedCity(found);
            }}
            className="bg-transparent border-none outline-none text-xs sm:text-sm font-bold text-stone-800 dark:text-zinc-100 cursor-pointer"
          >
            {INDONESIAN_CITIES.map(city => (
              <option key={city.id} value={city.id} className="dark:bg-zinc-800 text-stone-900 dark:text-zinc-100">
                {city.name} ({city.province})
              </option>
            ))}
          </select>
        </div>

        {/* Sensor Permission / Manual Toggle */}
        <div className="flex items-center gap-2">
          {sensorPermissionNeeded && (
            <button
              onClick={requestSensorPermission}
              className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs shadow-xs"
            >
              Izinkan Sensor Kompas
            </button>
          )}

          <button
            onClick={() => setUseDeviceSensor(!useDeviceSensor)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
              useDeviceSensor
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                : 'bg-stone-100 text-stone-700 border-stone-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{useDeviceSensor ? 'Sensor HP Otomatis' : 'Mode Putar Manual'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Compass Visualizer */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center space-y-6 relative">
        {/* Status Indicator */}
        <div className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
          isAligned
            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 animate-bounce'
            : 'bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-zinc-300'
        }`}>
          {isAligned ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>TEPAT MENGHADAP KIBLAT ({qiblaAngle}°)!</span>
            </>
          ) : (
            <>
              <Compass className="w-4 h-4 text-amber-500" />
              <span>Putar kompas atau arahkan perangkat ke sudut {qiblaAngle}°</span>
            </>
          )}
        </div>

        {/* Compass Dial Outer Ring */}
        <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
          {/* Alignment Glow Aura */}
          {isAligned && (
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse pointer-events-none"></div>
          )}

          {/* Compass Dial Disk */}
          <div
            className="w-full h-full rounded-full border-4 border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-950/80 relative shadow-inner transition-transform duration-300 ease-out flex items-center justify-center"
            style={{ transform: `rotate(${-currentCompassAngle}deg)` }}
          >
            {/* Compass Cardinal Points */}
            <span className="absolute top-3 font-bold text-sm text-red-600">N (Utara)</span>
            <span className="absolute bottom-3 font-bold text-xs text-stone-400">S (Selatan)</span>
            <span className="absolute right-3 font-bold text-xs text-stone-400">E (Timur)</span>
            <span className="absolute left-3 font-bold text-xs text-stone-400">W (Barat)</span>

            {/* Degree Ticks */}
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="absolute w-full h-0.5 bg-stone-300 dark:bg-zinc-700 pointer-events-none"
                style={{ transform: `rotate(${i * 30}deg)` }}
              ></div>
            ))}

            {/* Kaaba Direction Pin & Indicator */}
            <div
              className="absolute w-full h-full pointer-events-none flex flex-col items-center justify-start pt-1"
              style={{ transform: `rotate(${qiblaAngle}deg)` }}
            >
              <div className="flex flex-col items-center group">
                <div className="w-9 h-9 rounded-xl bg-stone-950 text-amber-400 border-2 border-amber-400 flex items-center justify-center text-sm shadow-md font-bold">
                  🕋
                </div>
                <div className="w-1.5 h-16 bg-gradient-to-b from-amber-400 to-transparent rounded-full"></div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-extrabold mt-1 shadow-xs">
                  Kiblat {qiblaAngle}°
                </span>
              </div>
            </div>

            {/* Inner Center Circle */}
            <div className="w-24 h-24 rounded-full bg-white dark:bg-zinc-900 border-2 border-stone-200 dark:border-zinc-700 shadow-md flex flex-col items-center justify-center z-10">
              <span className="text-xs font-mono font-bold text-stone-800 dark:text-zinc-200">
                {currentCompassAngle}°
              </span>
              <span className="text-[10px] text-stone-400">Arah Jarum</span>
            </div>
          </div>
        </div>

        {/* Manual Angle Rotation Slider & Fast Alignment (if desktop / no sensor) */}
        {(!useDeviceSensor || !sensorSupported || isWindowsOrDesktop) && (
          <div className="w-full max-w-sm space-y-3 pt-2">
            <div className="flex justify-between text-xs text-stone-500 dark:text-zinc-400">
              <span>Putar Derajat Kompas:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{manualAngle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={manualAngle}
              onChange={(e) => {
                setUseDeviceSensor(false);
                setManualAngle(Number(e.target.value));
              }}
              className="w-full h-2 bg-stone-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                onClick={() => setManualAngle((manualAngle - 10 + 360) % 360)}
                className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-zinc-800 text-xs font-semibold"
              >
                -10°
              </button>
              <button
                onClick={handleAlignToQibla}
                className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold shadow-xs"
              >
                🎯 Pas Kiblat ({qiblaAngle}°)
              </button>
              <button
                onClick={() => setManualAngle((manualAngle + 10) % 360)}
                className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-zinc-800 text-xs font-semibold"
              >
                +10°
              </button>
            </div>
          </div>
        )}

        {/* Distance & Info Stats Grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-100 dark:border-zinc-800 text-center">
          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-zinc-800/60">
            <p className="text-[11px] text-stone-500 dark:text-zinc-400 font-medium">Sudut Derajat Kiblat</p>
            <p className="text-lg font-bold text-amber-600 dark:text-amber-400 font-mono mt-0.5">
              {qiblaAngle}° BL
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-zinc-800/60">
            <p className="text-[11px] text-stone-500 dark:text-zinc-400 font-medium">Jarak ke Ka'bah</p>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
              ~{distanceKm.toLocaleString('id-ID')} km
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-stone-50 dark:bg-zinc-800/60">
            <p className="text-[11px] text-stone-500 dark:text-zinc-400 font-medium">Koordinat Makkah</p>
            <p className="text-xs font-bold text-stone-700 dark:text-zinc-300 font-mono mt-1">
              21.42° N, 39.82° E
            </p>
          </div>
        </div>
      </div>

      {/* Calibration Tips Card */}
      <div className="p-5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
        <h4 className="font-bold text-xs text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider">
          <Info className="w-4 h-4" />
          Tips Menentukan Arah Kiblat
        </h4>
        <ul className="text-xs text-emerald-950 dark:text-emerald-100 space-y-1 list-disc list-inside leading-relaxed">
          <li>Di Indonesia rata-rata sudut kiblat berada antara <strong>294° s/d 296°</strong> (arah Barat condong ke Utara sekitar 24°–26°).</li>
          <li>Pada smartphone HP, posisikan ponsel mendatar (horizontal) dan putar pola angka 8 bila sensor perlu dikalibrasi.</li>
          <li>Pada komputer Windows / PC, posisikan sajadah menghadap sudut derajat <strong>{qiblaAngle}°</strong> dengan bantuan petunjuk visual di atas.</li>
        </ul>
      </div>
    </div>
  );
};

