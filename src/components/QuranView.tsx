import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  BookOpen, 
  Bookmark as BookmarkIcon, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Check, 
  ArrowLeft, 
  Share2, 
  Copy, 
  Sparkles,
  Type,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SurahSummary, FullSurah, QuranVerse, Bookmark } from '../types';
import { ALL_SURAHS } from '../data/surahList';
import { getSurahDetails } from '../data/quranVerses';

interface QuranViewProps {
  initialSurahNumber?: number;
  initialVerseNumber?: number;
  bookmarks: Bookmark[];
  onSaveBookmark: (surahNumber: number, surahName: string, verseNumber: number) => void;
  onRemoveBookmark: (surahNumber: number, verseNumber: number) => void;
}

export const QuranView: React.FC<QuranViewProps> = ({
  initialSurahNumber = 1,
  initialVerseNumber = 1,
  bookmarks,
  onSaveBookmark,
  onRemoveBookmark,
}) => {
  const [activeSurahNumber, setActiveSurahNumber] = useState<number | null>(null);
  const [currentSurahData, setCurrentSurahData] = useState<FullSurah | null>(null);
  const [isLoadingSurah, setIsLoadingSurah] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Mekkah' | 'Madinah'>('all');
  const [viewTab, setViewTab] = useState<'surat' | 'juz' | 'bookmark'>('surat');

  // Reader Preferences
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [showLatin, setShowLatin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [tajwidMode, setTajwidMode] = useState(false);

  // Audio Playback State
  const [playingVerseIndex, setPlayingVerseIndex] = useState<number | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedTafsirVerse, setSelectedTafsirVerse] = useState<QuranVerse | null>(null);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle initial surah opening if passed from home "Resume reading"
  useEffect(() => {
    if (initialSurahNumber && initialSurahNumber > 0) {
      loadSurah(initialSurahNumber, initialVerseNumber);
    }
  }, [initialSurahNumber]);

  // Load full surah data
  const loadSurah = async (surahNum: number, targetVerse?: number) => {
    setIsLoadingSurah(true);
    setActiveSurahNumber(surahNum);
    stopAudio();

    try {
      const data = await getSurahDetails(surahNum);
      setCurrentSurahData(data);
      setIsLoadingSurah(false);

      // Auto scroll to target verse
      if (targetVerse && targetVerse > 1) {
        setTimeout(() => {
          const el = document.getElementById(`ayah-${targetVerse}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Failed to load surah:', err);
      setIsLoadingSurah(false);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlayingAudio(false);
    setPlayingVerseIndex(null);
  };

  const playVerseAudio = (verseNumber: number, customAudioUrl?: string) => {
    if (!currentSurahData) return;

    if (playingVerseIndex === verseNumber && isPlayingAudio) {
      audioRef.current?.pause();
      setIsPlayingAudio(false);
      return;
    }

    const verse = currentSurahData.verses.find(v => v.number === verseNumber);
    if (!verse) return;

    const surahPadded = String(currentSurahData.number).padStart(3, '0');
    const ayahPadded = String(verseNumber).padStart(3, '0');
    const url = customAudioUrl || verse.audioUrl || `https://verses.quran.com/Alafasy/mp3/${surahPadded}${ayahPadded}.mp3`;

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    audioRef.current.src = url;
    audioRef.current.play().then(() => {
      setIsPlayingAudio(true);
      setPlayingVerseIndex(verseNumber);

      // Scroll verse into view
      const el = document.getElementById(`ayah-${verseNumber}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }).catch(err => {
      console.warn('Audio play error:', err);
      setIsPlayingAudio(false);
    });

    // Auto next verse handler
    audioRef.current.onended = () => {
      if (verseNumber < currentSurahData.verses.length) {
        playVerseAudio(verseNumber + 1);
      } else {
        setIsPlayingAudio(false);
        setPlayingVerseIndex(null);
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
      }
    };
  };

  const handleCopyAyah = (verse: QuranVerse) => {
    if (!currentSurahData) return;
    const text = `${verse.arabic}\n\n"${verse.latin}"\n\nArtinya: ${verse.translationId}\n\n(QS. ${currentSurahData.transliterationEn}: ${verse.number})`;
    navigator.clipboard?.writeText(text);
    setCopiedAyah(verse.number);
    setTimeout(() => setCopiedAyah(null), 2000);
  };

  // Filter surahs
  const filteredSurahs = ALL_SURAHS.filter(s => {
    const matchSearch = s.transliterationEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.translationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.includes(searchQuery) ||
      String(s.number).includes(searchQuery);
    
    if (filterType === 'all') return matchSearch;
    return matchSearch && s.revelationType === filterType;
  });

  // Group surahs by Juz
  const juzGroups = Array.from({ length: 30 }, (_, i) => {
    const juzNum = i + 1;
    const surahsInJuz = ALL_SURAHS.filter(s => s.juzNumber === juzNum);
    return { juzNum, surahs: surahsInJuz };
  });

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'normal': return 'text-xl sm:text-2xl leading-loose';
      case 'large': return 'text-2xl sm:text-3xl leading-loose';
      case 'xlarge': return 'text-3xl sm:text-4xl leading-loose';
    }
  };

  return (
    <div id="quran-main-view" className="space-y-6 pb-20">
      {/* If Inside a Surah Reader */}
      {activeSurahNumber && currentSurahData ? (
        <div id="surah-reader-container" className="space-y-6">
          {/* Reader Top Bar */}
          <div className="sticky top-14 z-30 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-stone-200 dark:border-zinc-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                id="btn-back-to-surah-list"
                onClick={() => {
                  stopAudio();
                  setActiveSurahNumber(null);
                  setCurrentSurahData(null);
                }}
                className="p-2 rounded-xl bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 text-stone-700 dark:text-zinc-200 transition-colors"
                title="Kembali ke Daftar Surat"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-stone-900 dark:text-zinc-100">
                    Surat {currentSurahData.transliterationEn}
                  </h1>
                  <span className="font-arabic text-emerald-600 dark:text-emerald-400 font-bold text-base">
                    {currentSurahData.name}
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-zinc-400">
                  {currentSurahData.translationId} • {currentSurahData.totalVerses} Ayat • {currentSurahData.revelationType} • Juz {currentSurahData.juzNumber}
                </p>
              </div>
            </div>

            {/* Reader Controls (Font size, Latin toggle, Translation toggle, Full Audio) */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Previous / Next Surah */}
              <div className="flex items-center gap-1 bg-stone-100 dark:bg-zinc-800 p-1 rounded-xl">
                <button
                  disabled={currentSurahData.number <= 1}
                  onClick={() => loadSurah(currentSurahData.number - 1)}
                  className="p-1 rounded-lg hover:bg-white dark:hover:bg-zinc-700 disabled:opacity-30"
                  title="Surat Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs px-1 font-mono font-bold">
                  {currentSurahData.number}/114
                </span>
                <button
                  disabled={currentSurahData.number >= 114}
                  onClick={() => loadSurah(currentSurahData.number + 1)}
                  className="p-1 rounded-lg hover:bg-white dark:hover:bg-zinc-700 disabled:opacity-30"
                  title="Surat Selanjutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Play All Audio */}
              <button
                id="btn-play-all-audio"
                onClick={() => {
                  if (isPlayingAudio) {
                    stopAudio();
                  } else {
                    playVerseAudio(1);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isPlayingAudio
                    ? 'bg-amber-500 text-stone-950 shadow-md animate-pulse'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                }`}
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                <span>{isPlayingAudio ? 'Jeda Tilawah' : 'Putar Murottal'}</span>
              </button>

              {/* Font Size Selector */}
              <div className="flex items-center gap-1 bg-stone-100 dark:bg-zinc-800 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-0.5 rounded-lg ${fontSize === 'normal' ? 'bg-white dark:bg-zinc-700 font-bold shadow-xs' : 'text-stone-500'}`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-0.5 rounded-lg text-sm ${fontSize === 'large' ? 'bg-white dark:bg-zinc-700 font-bold shadow-xs' : 'text-stone-500'}`}
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2 py-0.5 rounded-lg text-base ${fontSize === 'xlarge' ? 'bg-white dark:bg-zinc-700 font-bold shadow-xs' : 'text-stone-500'}`}
                >
                  A++
                </button>
              </div>

              {/* Toggle Latin & Translation */}
              <button
                onClick={() => setShowLatin(!showLatin)}
                className={`px-2.5 py-1 rounded-xl text-xs font-medium border ${
                  showLatin 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800' 
                    : 'bg-stone-100 text-stone-500 border-stone-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700'
                }`}
              >
                Latin
              </button>
              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className={`px-2.5 py-1 rounded-xl text-xs font-medium border ${
                  showTranslation 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800' 
                    : 'bg-stone-100 text-stone-500 border-stone-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700'
                }`}
              >
                Arti
              </button>
            </div>
          </div>

          {/* Surah Header Card with Bismillah */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-900 to-emerald-950 text-white text-center shadow-lg relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-700/60 text-emerald-200 text-xs font-semibold border border-emerald-500/30">
                Surat ke-{currentSurahData.number} • Diturunkan di {currentSurahData.revelationType}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {currentSurahData.transliterationEn}
              </h2>
              <p className="font-arabic text-3xl sm:text-4xl text-amber-300 font-bold">
                {currentSurahData.name}
              </p>
              <p className="text-sm text-emerald-100/90 font-medium">
                "{currentSurahData.translationId}" — Terdiri dari {currentSurahData.totalVerses} Ayat
              </p>

              {/* Bismillah (except At-Taubah #9) */}
              {currentSurahData.number !== 9 && (
                <div className="pt-4 border-t border-white/10 mt-4">
                  <p className="font-arabic text-2xl sm:text-3xl text-white font-bold leading-relaxed">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                  <p className="text-xs text-emerald-200/80 mt-1 italic">
                    Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Verses List */}
          <div className="space-y-4">
            {currentSurahData.verses.map((verse) => {
              const isPlaying = playingVerseIndex === verse.number;
              const isBookmarked = bookmarks.some(
                b => b.surahNumber === currentSurahData.number && b.verseNumber === verse.number
              );

              return (
                <div
                  key={verse.number}
                  id={`ayah-${verse.number}`}
                  className={`p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border transition-all ${
                    isPlaying
                      ? 'border-amber-400 dark:border-amber-500 shadow-md bg-amber-50/40 dark:bg-amber-950/20'
                      : 'border-stone-200/80 dark:border-zinc-800 hover:border-stone-300 dark:hover:border-zinc-700'
                  }`}
                >
                  {/* Ayah Meta & Action Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-zinc-800/80 text-xs">
                    {/* Verse Number Badge */}
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center border border-emerald-300 dark:border-emerald-800/60 font-mono text-xs">
                        {verse.number}
                      </span>
                      <span className="text-stone-400 text-[11px] hidden sm:inline">
                        Ayat {verse.number} dari {currentSurahData.totalVerses}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1.5">
                      {/* Play Verse Audio */}
                      <button
                        onClick={() => playVerseAudio(verse.number, verse.audioUrl)}
                        className={`p-2 rounded-xl transition-colors ${
                          isPlaying
                            ? 'bg-amber-500 text-stone-950 font-bold'
                            : 'bg-stone-100 dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-stone-600 dark:text-zinc-300'
                        }`}
                        title="Dengar Audio Ayat"
                      >
                        {isPlaying ? <Volume2 className="w-4 h-4 text-stone-950" /> : <Play className="w-4 h-4" />}
                      </button>

                      {/* Bookmark Button */}
                      <button
                        onClick={() => {
                          if (isBookmarked) {
                            onRemoveBookmark(currentSurahData.number, verse.number);
                          } else {
                            onSaveBookmark(currentSurahData.number, currentSurahData.transliterationEn, verse.number);
                          }
                        }}
                        className={`p-2 rounded-xl transition-colors ${
                          isBookmarked
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 text-stone-600 dark:text-zinc-300'
                        }`}
                        title={isBookmarked ? 'Hapus Tanda Baca' : 'Simpan Tanda Baca Terakhir'}
                      >
                        <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>

                      {/* Copy Ayah */}
                      <button
                        onClick={() => handleCopyAyah(verse)}
                        className="p-2 rounded-xl bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 text-stone-600 dark:text-zinc-300 transition-colors"
                        title="Salin Ayat & Terjemahan"
                      >
                        {copiedAyah === verse.number ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>

                      {/* Tafsir Preview Button */}
                      {verse.tafsir && (
                        <button
                          onClick={() => setSelectedTafsirVerse(verse)}
                          className="px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium text-[11px] hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors"
                        >
                          Tafsir
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Arabic Text (Right-to-Left) */}
                  <div className="py-5">
                    <p className={`font-arabic text-stone-900 dark:text-zinc-50 ${getFontSizeClass()} text-right font-medium`}>
                      {verse.arabic}
                      <span className="inline-block mx-2 font-arabic text-emerald-600 dark:text-emerald-400 text-xl font-bold">
                        ۝{verse.number}
                      </span>
                    </p>
                  </div>

                  {/* Latin Transliteration */}
                  {showLatin && verse.latin && (
                    <div className="pt-2 text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-medium leading-relaxed">
                      {verse.latin}
                    </div>
                  )}

                  {/* Indonesian Translation */}
                  {showTranslation && (
                    <div className="pt-2 text-xs sm:text-sm text-stone-700 dark:text-zinc-300 leading-relaxed">
                      {verse.translationId}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tafsir Modal */}
          {selectedTafsirVerse && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full p-6 space-y-4 border border-stone-200 dark:border-zinc-800 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-zinc-800">
                  <h3 className="font-bold text-base text-stone-900 dark:text-zinc-100 flex items-center gap-2">
                    <Info className="w-5 h-5 text-emerald-600" />
                    Tafsir Ringkas — Ayat {selectedTafsirVerse.number}
                  </h3>
                  <button
                    onClick={() => setSelectedTafsirVerse(null)}
                    className="text-stone-400 hover:text-stone-700 dark:hover:text-zinc-200 text-sm font-bold p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  <p className="font-arabic text-xl text-right text-stone-900 dark:text-zinc-100">
                    {selectedTafsirVerse.arabic}
                  </p>
                  <p className="text-xs text-stone-600 dark:text-zinc-400 italic">
                    "{selectedTafsirVerse.translationId}"
                  </p>
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/40 text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 leading-relaxed">
                    <p className="font-semibold text-emerald-800 dark:text-emerald-400 mb-1">
                      Keterangan / Faidah Tafsir:
                    </p>
                    {selectedTafsirVerse.tafsir}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTafsirVerse(null)}
                  className="w-full py-2.5 rounded-xl bg-stone-100 dark:bg-zinc-800 text-stone-800 dark:text-zinc-200 font-semibold text-xs hover:bg-stone-200 dark:hover:bg-zinc-700"
                >
                  Tutup Tafsir
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Surah List & Selection Overview */
        <div id="quran-browser-container" className="space-y-6">
          {/* Header Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-950 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-emerald-700 text-emerald-200 text-xs font-semibold">
                  Al-Qur'anul Karim (Mushaf Standar Indonesia)
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold">
                Baca & Dengar Al-Qur'an 30 Juz
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
                114 Surat lengkap dengan teks Arab bertanda tajwid, transliterasi Latin resmi, terjemahan Kemenag RI, serta audio murottal tartil.
              </p>
            </div>
          </div>

          {/* Search & Navigation Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="search-surah-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari surat (misal: Al-Kahf, Yasin, 18, Sapi Betina)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-xs sm:text-sm text-stone-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* View Mode Tabs (Surat / Juz / Tanda Baca) */}
            <div className="flex items-center gap-1 bg-stone-100 dark:bg-zinc-800 p-1 rounded-2xl">
              <button
                id="tab-view-surat"
                onClick={() => setViewTab('surat')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  viewTab === 'surat'
                    ? 'bg-white dark:bg-zinc-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                    : 'text-stone-500 dark:text-zinc-400'
                }`}
              >
                114 Surat
              </button>
              <button
                id="tab-view-juz"
                onClick={() => setViewTab('juz')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  viewTab === 'juz'
                    ? 'bg-white dark:bg-zinc-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                    : 'text-stone-500 dark:text-zinc-400'
                }`}
              >
                30 Juz
              </button>
              <button
                id="tab-view-bookmarks"
                onClick={() => setViewTab('bookmark')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                  viewTab === 'bookmark'
                    ? 'bg-white dark:bg-zinc-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                    : 'text-stone-500 dark:text-zinc-400'
                }`}
              >
                <BookmarkIcon className="w-3.5 h-3.5" />
                <span>Tanda Baca ({bookmarks.length})</span>
              </button>
            </div>
          </div>

          {/* Revelation Filter Chips */}
          {viewTab === 'surat' && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 dark:text-zinc-400 font-medium">Tempat Turun:</span>
              {(['all', 'Mekkah', 'Madinah'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    filterType === type
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-zinc-300 hover:bg-stone-200'
                  }`}
                >
                  {type === 'all' ? 'Semua Surat' : type}
                </button>
              ))}
            </div>
          )}

          {/* Content Based on Tab */}
          {viewTab === 'surat' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredSurahs.map((surah) => (
                <div
                  key={surah.number}
                  id={`surah-card-${surah.number}`}
                  onClick={() => loadSurah(surah.number)}
                  className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center border border-emerald-200 dark:border-emerald-800/60 group-hover:bg-emerald-600 group-hover:text-white transition-colors font-mono text-sm">
                      {surah.number}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-stone-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {surah.transliterationEn}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-zinc-400">
                        {surah.translationId} • {surah.totalVerses} Ayat
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-arabic text-lg sm:text-xl font-bold text-stone-800 dark:text-zinc-200">
                      {surah.name}
                    </p>
                    <span className="text-[10px] text-stone-400 uppercase">
                      {surah.revelationType}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewTab === 'juz' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {juzGroups.map((j) => (
                <div
                  key={j.juzNum}
                  className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-zinc-800">
                    <span className="font-bold text-base text-stone-900 dark:text-zinc-100">
                      Juz {j.juzNum}
                    </span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                      {j.surahs.length} Surat
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {j.surahs.map((s) => (
                      <button
                        key={s.number}
                        onClick={() => loadSurah(s.number)}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/50 flex items-center justify-between text-xs transition-colors"
                      >
                        <span className="font-medium text-stone-800 dark:text-zinc-200">
                          {s.number}. {s.transliterationEn}
                        </span>
                        <span className="font-arabic font-bold text-stone-600 dark:text-zinc-300">
                          {s.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewTab === 'bookmark' && (
            <div className="space-y-3">
              {bookmarks.length === 0 ? (
                <div className="p-12 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-stone-200 dark:border-zinc-800 space-y-3">
                  <BookmarkIcon className="w-10 h-10 text-stone-300 mx-auto" />
                  <p className="font-semibold text-stone-800 dark:text-zinc-200 text-sm">
                    Belum ada tanda baca tersimpan
                  </p>
                  <p className="text-xs text-stone-500 dark:text-zinc-400 max-w-sm mx-auto">
                    Saat membaca Al-Qur'an, klik tombol ikon pita (bookmark) pada ayat yang ingin Anda tandai sebagai bacaan terakhir.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {bookmarks.map((bm, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-800/40 shadow-xs flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400">
                          Tanda Baca
                        </span>
                        <h4 className="font-bold text-base text-stone-900 dark:text-zinc-100">
                          Surat {bm.surahName}
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-zinc-400">
                          Ayat ke-{bm.verseNumber} • Ditandai pada {new Date(bm.timestamp).toLocaleDateString('id-ID')}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => loadSurah(bm.surahNumber, bm.verseNumber)}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
                        >
                          Buka
                        </button>
                        <button
                          onClick={() => onRemoveBookmark(bm.surahNumber, bm.verseNumber)}
                          className="p-1.5 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                          title="Hapus"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
