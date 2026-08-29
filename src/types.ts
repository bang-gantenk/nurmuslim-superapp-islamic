export type AppTab = 
  | 'home' 
  | 'quran' 
  | 'prayer' 
  | 'qibla' 
  | 'zakat' 
  | 'radio' 
  | 'articles' 
  | 'mosques' 
  | 'community' 
  | 'dzikir';

export interface SurahSummary {
  number: number;
  name: string;
  transliterationEn: string;
  translationId: string;
  totalVerses: number;
  revelationType: 'Mekkah' | 'Madinah';
  juzNumber: number;
}

export interface QuranVerse {
  number: number;
  arabic: string;
  latin: string;
  translationId: string;
  audioUrl?: string;
  tafsir?: string;
}

export interface FullSurah extends SurahSummary {
  verses: QuranVerse[];
  bismillah?: {
    arabic: string;
    translationId: string;
  };
}

export interface Bookmark {
  surahNumber: number;
  surahName: string;
  verseNumber: number;
  timestamp: number;
  note?: string;
}

export interface CityLocation {
  id: string;
  name: string;
  province: string;
  latitude: number;
  longitude: number;
  timezone: string; // 'WIB' | 'WITA' | 'WIT'
}

export interface PrayerTimeSchedule {
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
  date: string;
  hijriDate: string;
}

export interface RadioStation {
  id: string;
  name: string;
  city: string;
  frequency: string;
  streamUrl: string;
  backupStreamUrl?: string;
  streamUrls?: string[];
  description: string;
  logo: string;
  category: 'Sunnah' | 'Murottal' | 'Kajian' | 'Umum';
  isLowBandwidthOptimized: boolean;
  scheduleNow: string;
}

export interface IslamicArticle {
  id: string;
  title: string;
  category: 'Akidah' | 'Fiqih' | 'Sunnah' | 'Adab' | 'Keluarga' | 'Kisah Sahabat';
  author: string;
  readTime: string;
  date: string;
  summary: string;
  content: string;
  haditsReference?: string;
  likes: number;
}

export interface DailyDoa {
  id: string;
  title: string;
  category: 'Sholat' | 'Pagi & Petang' | 'Rumah & Keluarga' | 'Makan & Minum' | 'Safar & Perjalanan' | 'Hajat & Perlindungan';
  arabic: string;
  latin: string;
  translationId: string;
  source: string; // e.g. "HR. Bukhari no. 6320"
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  cityId: string;
  cityName: string;
  joinedDate: string;
  isLoggedIn: boolean;
  role?: 'Member' | 'Ustadz' | 'Pengurus Masjid';
  authProvider?: 'google' | 'microsoft' | 'apple' | 'email';
}

export interface DzikirItem {
  id: string;
  title: string;
  arabic: string;
  latin: string;
  translationId: string;
  source: string;
  targetCount: number;
  period: 'pagi' | 'petang' | 'setelah-sholat' | 'keduanya';
  benefit: string;
}

export interface AsmaulHusnaItem {
  number: number;
  arabic: string;
  latin: string;
  translationId: string;
  explanation: string;
}

export interface MosqueItem {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  latitude: number;
  longitude: number;
  distanceKm?: number;
  capacity: number;
  rating: number;
  facilities: string[];
  hasKajian: boolean;
  kajianSchedule?: string;
  imageUrl: string;
  googleMapsUrl: string;
}

export interface CommunityComment {
  id: string;
  author: string;
  avatar: string;
  isUstadz?: boolean;
  content: string;
  timestamp: string;
  likes: number;
}

export interface CommunityPost {
  id: string;
  title: string;
  author: string;
  avatar: string;
  isUstadz?: boolean;
  roleBadge?: string;
  category: 'Bebas / Obrolan Umum' | 'Tanya Ustadz' | 'Fiqih' | 'Keluarga Sakinah' | 'Muamalah' | 'Doa & Curhat' | 'Kajian Sunnah';
  content: string;
  timestamp: string;
  likes: number;
  comments: CommunityComment[];
  isBookmarked?: boolean;
  authorId?: string;
}

export interface ZakatCalculationResult {
  zakatType: 'maal' | 'profesi' | 'fitrah' | 'emas' | 'perniagaan' | 'pertanian';
  totalHarta: number;
  nisabValue: number;
  isWajibZakat: boolean;
  totalZakatRupiah: number;
  details: { label: string; value: string }[];
}
