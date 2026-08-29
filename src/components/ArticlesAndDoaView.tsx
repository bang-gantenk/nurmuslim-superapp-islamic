import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Heart, 
  Share2, 
  Copy, 
  Check, 
  Bookmark, 
  RotateCcw, 
  ChevronRight, 
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Sun,
  Moon,
  Clock
} from 'lucide-react';
import { IslamicArticle, DailyDoa } from '../types';
import { 
  ISLAMIC_ARTICLES, 
  DAILY_DOA_LIST, 
  DZIKIR_PAGI_ITEMS,
  DZIKIR_PETANG_ITEMS,
  DZIKIR_SETELAH_SHOLAT_ITEMS,
  DZIKIR_PAGI_PETANG, 
  ASMAUL_HUSNA 
} from '../data/articlesAndDoa';

export const ArticlesAndDoaView: React.FC = () => {
  const [subTab, setSubTab] = useState<'articles' | 'doa' | 'dzikir' | 'asmaul-husna'>('articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<IslamicArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Dzikir Category: 'pagi' | 'petang' | 'setelah-sholat'
  const [dzikirSubCategory, setDzikirSubCategory] = useState<'pagi' | 'petang' | 'setelah-sholat'>('pagi');

  // Tasbih / Counter state for Dzikir
  const [dzikirCounters, setDzikirCounters] = useState<Record<string, number>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleIncrementCounter = (id: string, maxTarget: number) => {
    const current = dzikirCounters[id] || 0;
    if (current < maxTarget) {
      setDzikirCounters({ ...dzikirCounters, [id]: current + 1 });
      if (navigator.vibrate) navigator.vibrate(30);
    }
  };

  const handleResetCounter = (id: string) => {
    setDzikirCounters({ ...dzikirCounters, [id]: 0 });
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = ['Semua', 'Sunnah', 'Fiqih', 'Akidah', 'Keluarga'];

  const filteredArticles = ISLAMIC_ARTICLES.filter(art => {
    const matchCat = selectedCategory === 'Semua' || art.category === selectedCategory;
    const matchSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const filteredDoas = DAILY_DOA_LIST.filter(d => {
    return d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.translationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredAsmaul = ASMAUL_HUSNA.filter(a => {
    return a.latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.translationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.explanation.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Current active dzikir items based on 3 distinct choices
  const currentDzikirList = dzikirSubCategory === 'pagi'
    ? DZIKIR_PAGI_ITEMS
    : dzikirSubCategory === 'petang'
    ? DZIKIR_PETANG_ITEMS
    : DZIKIR_SETELAH_SHOLAT_ITEMS;

  const filteredDzikir = currentDzikirList.filter(item => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.translationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div id="articles-doa-main-view" className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* If Reading an Article */}
      {selectedArticle ? (
        <div className="space-y-6">
          {/* Back button & Meta */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedArticle(null)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-100 dark:bg-zinc-800 text-stone-700 dark:text-zinc-200 text-xs font-semibold hover:bg-stone-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Daftar Artikel</span>
            </button>

            <button
              onClick={() => handleCopyText(selectedArticle.id, `${selectedArticle.title}\n\n${selectedArticle.content}\n\n(Rujukan: ${selectedArticle.haditsReference || 'NurMuslim SuperApp'})`)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold"
            >
              {copiedId === selectedArticle.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedId === selectedArticle.id ? 'Tersalin!' : 'Bagikan Faidah'}</span>
            </button>
          </div>

          {/* Article Full Card */}
          <article className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-sm space-y-6">
            <div className="space-y-3 pb-6 border-b border-stone-100 dark:border-zinc-800">
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                {selectedArticle.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-zinc-100 tracking-tight leading-snug">
                {selectedArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  Oleh: <strong className="text-stone-700 dark:text-zinc-300">{selectedArticle.author}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedArticle.date}
                </span>
                <span>⏱️ {selectedArticle.readTime}</span>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose dark:prose-invert max-w-none text-stone-800 dark:text-zinc-200 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-normal">
              {selectedArticle.content}
            </div>

            {/* Source Reference Tag */}
            {selectedArticle.haditsReference && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
                <strong>Rujukan Dalil / Hadits:</strong> {selectedArticle.haditsReference}
              </div>
            )}
          </article>
        </div>
      ) : (
        /* Main Hub: Articles, Doa Harian, Dzikir, Asmaul Husna */
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-900 via-emerald-900 to-stone-900 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-teal-800/80 text-teal-200 text-xs font-semibold">
                  Tazkiyatun Nufs • Menambah Keimanan Harian
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Artikel Islami, Doa & Dzikir Harian
              </h1>
              <p className="text-xs sm:text-sm text-teal-100/90 max-w-2xl">
                Kumpulan faidah ilmu syar'i, doa harian shahih, dzikir 3 waktu (Pagi, Petang, dan Setelah Sholat Sesuai Sunnah), serta 99 Asmaul Husna.
              </p>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1 bg-stone-100 dark:bg-zinc-800 p-1 rounded-2xl overflow-x-auto no-scrollbar">
              <button
                id="subtab-articles"
                onClick={() => setSubTab('articles')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  subTab === 'articles'
                    ? 'bg-white dark:bg-zinc-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                    : 'text-stone-600 dark:text-zinc-400'
                }`}
              >
                Artikel Harian ({ISLAMIC_ARTICLES.length})
              </button>
              <button
                id="subtab-doa"
                onClick={() => setSubTab('doa')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  subTab === 'doa'
                    ? 'bg-white dark:bg-zinc-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                    : 'text-stone-600 dark:text-zinc-400'
                }`}
              >
                Doa Harian ({DAILY_DOA_LIST.length})
              </button>
              <button
                id="subtab-dzikir"
                onClick={() => setSubTab('dzikir')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  subTab === 'dzikir'
                    ? 'bg-white dark:bg-zinc-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                    : 'text-stone-600 dark:text-zinc-400'
                }`}
              >
                Dzikir Sunnah (3 Pilihan)
              </button>
              <button
                id="subtab-asmaul"
                onClick={() => setSubTab('asmaul-husna')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  subTab === 'asmaul-husna'
                    ? 'bg-white dark:bg-zinc-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                    : 'text-stone-600 dark:text-zinc-400'
                }`}
              >
                Asmaul Husna
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari artikel, doa, dzikir..."
                className="w-full sm:w-64 pl-9 pr-3 py-2 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-xs text-stone-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Tab 1: Articles */}
          {subTab === 'articles' && (
            <div className="space-y-4">
              {/* Category Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-zinc-300 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    id={`article-card-${art.id}`}
                    onClick={() => setSelectedArticle(art)}
                    className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 hover:border-emerald-500/50 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3 group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold">
                          {art.category}
                        </span>
                        <span className="text-[11px] text-stone-400">
                          {art.readTime}
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-stone-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                        {art.title}
                      </h3>

                      <p className="text-xs text-stone-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                        {art.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-zinc-800/80 text-xs text-stone-500 dark:text-zinc-400">
                      <span>{art.author}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Baca Selengkapnya <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Doa Harian */}
          {subTab === 'doa' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDoas.map((doa) => (
                  <div
                    key={doa.id}
                    id={`doa-card-${doa.id}`}
                    className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 shadow-xs space-y-4"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-zinc-800">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                        {doa.category}
                      </span>
                      <button
                        onClick={() => handleCopyText(doa.id, `${doa.title}\n\n${doa.arabic}\n\n"${doa.latin}"\n\nArtinya: ${doa.translationId}\n\n(Riwayat: ${doa.source})`)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-600 hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors"
                        title="Salin Doa"
                      >
                        {copiedId === doa.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <h3 className="font-bold text-base text-stone-900 dark:text-zinc-100">
                      {doa.title}
                    </h3>

                    {/* Arabic */}
                    <div className="py-2">
                      <p className="font-arabic text-xl sm:text-2xl text-stone-900 dark:text-zinc-50 text-right leading-loose font-medium">
                        {doa.arabic}
                      </p>
                    </div>

                    {/* Latin */}
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium italic">
                      {doa.latin}
                    </p>

                    {/* Translation */}
                    <p className="text-xs text-stone-700 dark:text-zinc-300 leading-relaxed">
                      <strong>Artinya:</strong> "{doa.translationId}"
                    </p>

                    <div className="pt-2 border-t border-stone-100 dark:border-zinc-800 text-[11px] text-stone-400 italic">
                      HR: {doa.source}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Dzikir Sunnah (3 Explicit Choices: Pagi, Petang, Setelah Sholat Sesuai Sunnah) */}
          {subTab === 'dzikir' && (
            <div className="space-y-5">
              {/* 3 Explicit Options Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  id="dzikir-opt-pagi"
                  onClick={() => setDzikirSubCategory('pagi')}
                  className={`p-4 rounded-2xl text-left border transition-all flex items-center gap-3.5 ${
                    dzikirSubCategory === 'pagi'
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 shadow-sm text-amber-900 dark:text-amber-200'
                      : 'bg-white dark:bg-zinc-900 border-stone-200 dark:border-zinc-800 text-stone-700 dark:text-zinc-300 hover:border-stone-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${dzikirSubCategory === 'pagi' ? 'bg-amber-500 text-white' : 'bg-amber-100 dark:bg-amber-950 text-amber-700'}`}>
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">1. Dzikir Pagi</h4>
                    <p className="text-[11px] opacity-80">Subuh s/d Terbit & Dhuha ({DZIKIR_PAGI_ITEMS.length} Doa)</p>
                  </div>
                </button>

                <button
                  id="dzikir-opt-petang"
                  onClick={() => setDzikirSubCategory('petang')}
                  className={`p-4 rounded-2xl text-left border transition-all flex items-center gap-3.5 ${
                    dzikirSubCategory === 'petang'
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 shadow-sm text-indigo-900 dark:text-indigo-200'
                      : 'bg-white dark:bg-zinc-900 border-stone-200 dark:border-zinc-800 text-stone-700 dark:text-zinc-300 hover:border-stone-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${dzikirSubCategory === 'petang' ? 'bg-indigo-500 text-white' : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700'}`}>
                    <Moon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">2. Dzikir Petang</h4>
                    <p className="text-[11px] opacity-80">Ashar s/d Menjelang Isya ({DZIKIR_PETANG_ITEMS.length} Doa)</p>
                  </div>
                </button>

                <button
                  id="dzikir-opt-sholat"
                  onClick={() => setDzikirSubCategory('setelah-sholat')}
                  className={`p-4 rounded-2xl text-left border transition-all flex items-center gap-3.5 ${
                    dzikirSubCategory === 'setelah-sholat'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-sm text-emerald-900 dark:text-emerald-200'
                      : 'bg-white dark:bg-zinc-900 border-stone-200 dark:border-zinc-800 text-stone-700 dark:text-zinc-300 hover:border-stone-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${dzikirSubCategory === 'setelah-sholat' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700'}`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">3. Setelah Shalat Sesuai Sunnah</h4>
                    <p className="text-[11px] opacity-80">Sesuai Hadits Shahih Nabi ﷺ ({DZIKIR_SETELAH_SHOLAT_ITEMS.length} Doa)</p>
                  </div>
                </button>
              </div>

              {/* Info banner for selected category */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                <div>
                  <strong>Sedang Membuka: </strong>
                  {dzikirSubCategory === 'pagi' && 'Dzikir Pagi Hari — Melindungi dan memberi keberkahan hari.'}
                  {dzikirSubCategory === 'petang' && 'Dzikir Petang Hari — Melindungi dari godaan setan dan marabahaya malam.'}
                  {dzikirSubCategory === 'setelah-sholat' && 'Dzikir Setelah Shalat Fardhu Sesuai Sunnah Shahih (Istighfar, Tahlil, Ayat Kursi, Tasbih 33x, Tahmid 33x, Takbir 33x).'}
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-200/60 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-bold whitespace-nowrap">
                  {filteredDzikir.length} Bacaan
                </span>
              </div>

              {/* Dzikir Cards List */}
              <div className="space-y-4">
                {filteredDzikir.map((item) => {
                  const count = dzikirCounters[item.id] || 0;
                  const isFinished = count >= item.targetCount;

                  return (
                    <div
                      key={item.id}
                      id={`dzikir-card-${item.id}`}
                      className={`p-6 rounded-3xl bg-white dark:bg-zinc-900 border transition-all ${
                        isFinished
                          ? 'border-emerald-500 dark:border-emerald-500 shadow-sm bg-emerald-50/20'
                          : 'border-stone-200/80 dark:border-zinc-800'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-zinc-800">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                            Dibaca {item.targetCount}x
                          </span>
                          <span className="text-xs text-stone-500 font-semibold capitalize">
                            {item.period === 'setelah-sholat' ? 'Setelah Shalat Fardhu' : `Waktu: ${item.period}`}
                          </span>
                        </div>

                        {/* Reset Button */}
                        {count > 0 && (
                          <button
                            onClick={() => handleResetCounter(item.id)}
                            className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-zinc-200 flex items-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" /> Reset
                          </button>
                        )}
                      </div>

                      <h3 className="font-bold text-base text-stone-900 dark:text-zinc-100 mt-2">
                        {item.title}
                      </h3>

                      {/* Arabic */}
                      <p className="font-arabic text-xl sm:text-2xl text-stone-900 dark:text-zinc-50 text-right leading-loose my-3">
                        {item.arabic}
                      </p>

                      <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium italic">
                        {item.latin}
                      </p>

                      <p className="text-xs text-stone-700 dark:text-zinc-300 mt-2 leading-relaxed">
                        <strong>Artinya:</strong> "{item.translationId}"
                      </p>

                      {item.benefit && (
                        <p className="text-[11px] text-amber-700 dark:text-amber-300/90 mt-2 italic bg-amber-50/60 dark:bg-amber-950/20 p-2.5 rounded-xl border border-amber-200/50 dark:border-amber-800/30">
                          ✨ <strong>Faidah & Dalil:</strong> {item.benefit}
                        </p>
                      )}

                      {/* Interactive Counter Trigger */}
                      <div className="pt-4 mt-4 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-between">
                        <div className="text-xs text-stone-500 dark:text-zinc-400">
                          Kemajuan: <strong className="text-emerald-600 font-mono text-sm">{count} / {item.targetCount}</strong>
                        </div>

                        <button
                          onClick={() => handleIncrementCounter(item.id, item.targetCount)}
                          disabled={isFinished}
                          className={`px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all active:scale-95 ${
                            isFinished
                              ? 'bg-emerald-600 text-white cursor-default'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                          }`}
                        >
                          {isFinished ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Selesai ({item.targetCount}x)</span>
                            </>
                          ) : (
                            <>
                              <span>Hitung (+1)</span>
                              <span className="font-mono text-emerald-200">[{count}/{item.targetCount}]</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 4: Asmaul Husna */}
          {subTab === 'asmaul-husna' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredAsmaul.map((item) => (
                <div
                  key={item.number}
                  className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs space-y-2 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                      {item.number}
                    </span>
                    <span className="font-arabic text-2xl font-bold text-stone-900 dark:text-zinc-100">
                      {item.arabic}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400">
                      {item.latin}
                    </h4>
                    <p className="text-xs font-medium text-stone-800 dark:text-zinc-200">
                      {item.translationId}
                    </p>
                    <p className="text-[11px] text-stone-500 dark:text-zinc-400 mt-1 line-clamp-2">
                      {item.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

