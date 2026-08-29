import { CityLocation, PrayerTimeSchedule } from '../types';

export const INDONESIAN_CITIES: CityLocation[] = [
  { id: 'jkt', name: 'DKI Jakarta', province: 'DKI Jakarta', latitude: -6.2088, longitude: 106.8456, timezone: 'WIB' },
  { id: 'sby', name: 'Surabaya', province: 'Jawa Timur', latitude: -7.2575, longitude: 112.7521, timezone: 'WIB' },
  { id: 'bdg', name: 'Bandung', province: 'Jawa Barat', latitude: -6.9175, longitude: 107.6191, timezone: 'WIB' },
  { id: 'mdn', name: 'Medan', province: 'Sumatera Utara', latitude: 3.5952, longitude: 98.6722, timezone: 'WIB' },
  { id: 'smg', name: 'Semarang', province: 'Jawa Tengah', latitude: -6.9667, longitude: 110.4167, timezone: 'WIB' },
  { id: 'mks', name: 'Makassar', province: 'Sulawesi Selatan', latitude: -5.1477, longitude: 119.4327, timezone: 'WITA' },
  { id: 'plb', name: 'Palembang', province: 'Sumatera Selatan', latitude: -2.9909, longitude: 104.7565, timezone: 'WIB' },
  { id: 'tng', name: 'Tangerang', province: 'Banten', latitude: -6.1783, longitude: 106.6319, timezone: 'WIB' },
  { id: 'dpk', name: 'Depok', province: 'Jawa Barat', latitude: -6.4025, longitude: 106.7942, timezone: 'WIB' },
  { id: 'bks', name: 'Bekasi', province: 'Jawa Barat', latitude: -6.2383, longitude: 106.9756, timezone: 'WIB' },
  { id: 'bgr', name: 'Bogor', province: 'Jawa Barat', latitude: -6.5971, longitude: 106.8060, timezone: 'WIB' },
  { id: 'jog', name: 'Yogyakarta', province: 'DI Yogyakarta', latitude: -7.7956, longitude: 110.3695, timezone: 'WIB' },
  { id: 'slo', name: 'Surakarta (Solo)', province: 'Jawa Tengah', latitude: -7.5755, longitude: 110.8243, timezone: 'WIB' },
  { id: 'mlg', name: 'Malang', province: 'Jawa Timur', latitude: -7.9666, longitude: 112.6326, timezone: 'WIB' },
  { id: 'btm', name: 'Batam', province: 'Kepulauan Riau', latitude: 1.1301, longitude: 104.0529, timezone: 'WIB' },
  { id: 'pku', name: 'Pekanbaru', province: 'Riau', latitude: 0.5071, longitude: 101.4478, timezone: 'WIB' },
  { id: 'pdg', name: 'Padang', province: 'Sumatera Barat', latitude: -0.9471, longitude: 100.4172, timezone: 'WIB' },
  { id: 'bdl', name: 'Bandar Lampung', province: 'Lampung', latitude: -5.4500, longitude: 105.2667, timezone: 'WIB' },
  { id: 'ach', name: 'Banda Aceh', province: 'Aceh', latitude: 5.5483, longitude: 95.3238, timezone: 'WIB' },
  { id: 'dps', name: 'Denpasar', province: 'Bali', latitude: -8.6705, longitude: 115.2126, timezone: 'WITA' },
  { id: 'mtm', name: 'Mataram (Lombok)', province: 'Nusa Tenggara Barat', latitude: -8.5833, longitude: 116.1167, timezone: 'WITA' },
  { id: 'bjm', name: 'Banjarmasin', province: 'Kalimantan Selatan', latitude: -3.3194, longitude: 114.5908, timezone: 'WITA' },
  { id: 'bkp', name: 'Balikpapan', province: 'Kalimantan Timur', latitude: -1.2379, longitude: 116.8289, timezone: 'WITA' },
  { id: 'smd', name: 'Samarinda', province: 'Kalimantan Timur', latitude: -0.5022, longitude: 117.1536, timezone: 'WITA' },
  { id: 'ptk', name: 'Pontianak', province: 'Kalimantan Barat', latitude: -0.0263, longitude: 109.3425, timezone: 'WIB' },
  { id: 'mnd', name: 'Manado', province: 'Sulawesi Utara', latitude: 1.4748, longitude: 124.8421, timezone: 'WITA' },
  { id: 'kdi', name: 'Kendari', province: 'Sulawesi Tenggara', latitude: -3.9985, longitude: 122.5126, timezone: 'WITA' },
  { id: 'amb', name: 'Ambon', province: 'Maluku', latitude: -3.6547, longitude: 128.1906, timezone: 'WIT' },
  { id: 'jyp', name: 'Jayapura', province: 'Papua', latitude: -2.5916, longitude: 140.6690, timezone: 'WIT' },
  { id: 'sor', name: 'Sorong', province: 'Papua Barat Daya', latitude: -0.8762, longitude: 131.2558, timezone: 'WIT' },
];

/**
 * Calculates Qibla direction (angle from North in degrees)
 * Kaaba Coordinates: Latitude 21.422487, Longitude 39.826206
 */
export function calculateQiblaAngle(lat: number, lng: number): number {
  const kaabaLat = (21.422487 * Math.PI) / 180;
  const kaabaLng = (39.826206 * Math.PI) / 180;
  const myLat = (lat * Math.PI) / 180;
  const myLng = (lng * Math.PI) / 180;

  const dLng = kaabaLng - myLng;
  const y = Math.sin(dLng);
  const x = Math.cos(myLat) * Math.tan(kaabaLat) - Math.sin(myLat) * Math.cos(dLng);
  let qibla = (Math.atan2(y, x) * 180) / Math.PI;
  if (qibla < 0) {
    qibla += 360;
  }
  return Math.round(qibla * 10) / 10;
}

/**
 * Calculates distance to Kaaba in kilometers
 */
export function calculateDistanceToKaaba(lat: number, lng: number): number {
  const R = 6371; // Earth's radius in km
  const kaabaLat = (21.422487 * Math.PI) / 180;
  const kaabaLng = (39.826206 * Math.PI) / 180;
  const dLat = ((21.422487 - lat) * Math.PI) / 180;
  const dLng = ((39.826206 - lng) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat * Math.PI) / 180) * Math.cos(kaabaLat) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Calculates accurate astronomical prayer times (Kemenag standard: Subuh 20°, Isya 18°)
 */
export function calculatePrayerTimes(
  lat: number,
  lng: number,
  timezoneOffsetHours: number = 7, // Default WIB = UTC+7
  date: Date = new Date()
): PrayerTimeSchedule {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );

  // Solar declination (approx)
  const D = (2 * Math.PI * (dayOfYear - 1)) / 365;
  const declination =
    0.006918 -
    0.399912 * Math.cos(D) +
    0.070257 * Math.sin(D) -
    0.006758 * Math.cos(2 * D) +
    0.000907 * Math.sin(2 * D);

  // Equation of time in minutes
  const eqTime =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(D) -
      0.032077 * Math.sin(D) -
      0.014615 * Math.cos(2 * D) -
      0.040849 * Math.sin(2 * D));

  const latRad = (lat * Math.PI) / 180;
  const decRad = declination;

  // Solar noon in hours (UTC + offset)
  const solarNoon = 12 + timezoneOffsetHours - lng / 15 - eqTime / 60;

  // Helper for Sun hour angle given altitude angle alpha
  function hourAngle(alphaDeg: number): number {
    const alphaRad = (alphaDeg * Math.PI) / 180;
    const cosHA = (Math.sin(alphaRad) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
    if (cosHA > 1) return 0;
    if (cosHA < -1) return Math.PI;
    return Math.acos(cosHA);
  }

  // Indonesian Kemenag Standards: Subuh = -20°, Isya = -18°, Sunrise/Sunset = -0.833°
  const haSubuh = hourAngle(-20);
  const haSunrise = hourAngle(-0.833);
  const haIsya = hourAngle(-18);

  // Ashar: shadow length = 1 + shadow at noon
  const noonSunAlt = Math.PI / 2 - Math.abs(latRad - decRad);
  const asharAlt = Math.atan(1 / (1 + 1 / Math.tan(noonSunAlt))) * (180 / Math.PI);
  const haAshar = hourAngle(asharAlt);

  const subuhHours = solarNoon - (haSubuh * 180) / Math.PI / 15;
  const sunriseHours = solarNoon - (haSunrise * 180) / Math.PI / 15;
  const dzuhurHours = solarNoon + 2 / 60; // 2 mins ihtiyat
  const asharHours = solarNoon + (haAshar * 180) / Math.PI / 15;
  const sunsetHours = solarNoon + (haSunrise * 180) / Math.PI / 15 + 2 / 60;
  const isyaHours = solarNoon + (haIsya * 180) / Math.PI / 15;

  const imsakHours = subuhHours - 10 / 60; // 10 mins before Subuh
  const dhuhaHours = sunriseHours + 25 / 60; // ~25 mins after sunrise

  function formatTime(decimalHours: number): string {
    let normalized = decimalHours % 24;
    if (normalized < 0) normalized += 24;
    const hours = Math.floor(normalized);
    const mins = Math.floor((normalized - hours) * 60);
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  }

  // Indonesian Hijri Date Approximation
  const hijriMonths = [
    'Muharram', 'Safar', "Rabi'ul Awwal", "Rabi'ul Akhir",
    'Jumadil Ula', 'Jumadil Akhira', 'Rajab', "Sya'ban",
    'Ramadhan', 'Syawwal', "Dzulqa'dah", 'Dzulhijjah'
  ];

  // Hijri date computation
  const gDay = date.getDate();
  const gMonth = date.getMonth();
  const gYear = date.getFullYear();

  // Simple Julian Day to Hijri conversion
  let jd = Math.floor((1461 * (gYear + 4800 + Math.floor((gMonth - 13) / 12))) / 4) +
    Math.floor((367 * (gMonth - 1 - 12 * Math.floor((gMonth - 13) / 12))) / 12) -
    Math.floor((3 * Math.floor((gYear + 4900 + Math.floor((gMonth - 13) / 12)) / 100)) / 4) +
    gDay - 32075;

  let l = jd - 1948440 + 10632;
  let n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
  l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  let hMonth = Math.floor((24 * l) / 709);
  let hDay = l - Math.floor((709 * hMonth) / 24);
  let hYear = 30 * n + j - 30;

  const hijriStr = `${hDay} ${hijriMonths[hMonth - 1] || 'Ramadhan'} ${hYear} H`;

  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('id-ID', dateOptions);

  return {
    imsak: formatTime(imsakHours),
    subuh: formatTime(subuhHours),
    terbit: formatTime(sunriseHours),
    dhuha: formatTime(dhuhaHours),
    dzuhur: formatTime(dzuhurHours),
    ashar: formatTime(asharHours),
    maghrib: formatTime(sunsetHours),
    isya: formatTime(isyaHours),
    date: formattedDate,
    hijriDate: hijriStr,
  };
}

/**
 * Play Adzan tone or audio
 */
export function playAdzanChime(): void {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [440, 493.88, 554.37, 659.25, 739.99]; // A, B, C#, E, F# (Hijaz spiritual scale)
    let startTime = audioCtx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime + idx * 0.4);
      gain.gain.setValueAtTime(0.01, startTime + idx * 0.4);
      gain.gain.exponentialRampToValueAtTime(0.3, startTime + idx * 0.4 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + idx * 0.4 + 0.38);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(startTime + idx * 0.4);
      osc.stop(startTime + idx * 0.4 + 0.4);
    });
  } catch (e) {
    console.log('Web Audio tone preview not supported on this device:', e);
  }
}
