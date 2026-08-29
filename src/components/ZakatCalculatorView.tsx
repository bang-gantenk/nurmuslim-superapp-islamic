import React, { useState } from 'react';
import { 
  Calculator, 
  Coins, 
  Wallet, 
  Briefcase, 
  Sparkles, 
  Copy, 
  Check, 
  Info, 
  ShieldCheck, 
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ZakatCalculationResult } from '../types';

export const ZakatCalculatorView: React.FC = () => {
  const [activeType, setActiveType] = useState<'maal' | 'profesi' | 'fitrah' | 'emas' | 'perniagaan'>('profesi');
  const [goldPricePerGram, setGoldPricePerGram] = useState<number>(1350000); // Rp 1.350.000 / gram emas
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Form states for Zakat Profesi
  const [monthlyIncome, setMonthlyIncome] = useState<number>(10000000);
  const [otherIncome, setOtherIncome] = useState<number>(2000000);
  const [basicExpenses, setBasicExpenses] = useState<number>(4000000);
  const [debtPayments, setDebtPayments] = useState<number>(1000000);

  // Form states for Zakat Maal
  const [cashAndBank, setCashAndBank] = useState<number>(120000000);
  const [investments, setInvestments] = useState<number>(30000000);
  const [rentedProperties, setRentedProperties] = useState<number>(0);
  const [shortTermDebts, setShortTermDebts] = useState<number>(10000000);

  // Form states for Zakat Fitrah
  const [familyMembers, setFamilyMembers] = useState<number>(4);
  const [ricePricePerKg, setRicePricePerKg] = useState<number>(15000); // Rp 15.000/kg beras x 2.5kg = Rp 37.500

  // Form states for Zakat Emas
  const [goldWeightGrams, setGoldWeightGrams] = useState<number>(90);
  const [goldUsedForAdornment, setGoldUsedForAdornment] = useState<number>(0);

  // Form states for Zakat Perniagaan
  const [businessWorkingCapital, setBusinessWorkingCapital] = useState<number>(150000000);
  const [businessStockValue, setBusinessStockValue] = useState<number>(50000000);
  const [businessReceivables, setBusinessReceivables] = useState<number>(20000000);
  const [businessShortDebts, setBusinessShortDebts] = useState<number>(30000000);

  // Nisab calculations
  const nisabEmasRupiahAnnual = 85 * goldPricePerGram; // ~Rp 114.750.000 / tahun
  const nisabEmasRupiahMonthly = nisabEmasRupiahAnnual / 12; // ~Rp 9.562.500 / bulan

  // Compute results based on active tab
  const computeResult = (): ZakatCalculationResult => {
    if (activeType === 'profesi') {
      const totalNetIncome = (monthlyIncome + otherIncome) - (basicExpenses + debtPayments);
      const isWajib = totalNetIncome >= nisabEmasRupiahMonthly;
      const totalZakatRupiah = isWajib ? Math.round(totalNetIncome * 0.025) : 0;

      return {
        zakatType: 'profesi',
        totalHarta: totalNetIncome,
        nisabValue: nisabEmasRupiahMonthly,
        isWajibZakat: isWajib,
        totalZakatRupiah,
        details: [
          { label: 'Total Pemasukan (Gaji + Tunjangan)', value: `Rp ${(monthlyIncome + otherIncome).toLocaleString('id-ID')}` },
          { label: 'Pengeluaran Pokok & Cicilan', value: `Rp ${(basicExpenses + debtPayments).toLocaleString('id-ID')}` },
          { label: 'Penghasilan Bersih Per Bulan', value: `Rp ${totalNetIncome.toLocaleString('id-ID')}` },
          { label: 'Nisab Profesi (85g emas / 12 bln)', value: `Rp ${Math.round(nisabEmasRupiahMonthly).toLocaleString('id-ID')}` },
        ],
      };
    }

    if (activeType === 'maal') {
      const totalNetAssets = (cashAndBank + investments + rentedProperties) - shortTermDebts;
      const isWajib = totalNetAssets >= nisabEmasRupiahAnnual;
      const totalZakatRupiah = isWajib ? Math.round(totalNetAssets * 0.025) : 0;

      return {
        zakatType: 'maal',
        totalHarta: totalNetAssets,
        nisabValue: nisabEmasRupiahAnnual,
        isWajibZakat: isWajib,
        totalZakatRupiah,
        details: [
          { label: 'Uang Tunai, Tabungan & Deposito', value: `Rp ${cashAndBank.toLocaleString('id-ID')}` },
          { label: 'Investasi, Reksadana & Saham', value: `Rp ${investments.toLocaleString('id-ID')}` },
          { label: 'Hutang Tempo Jatuh (Pengurang)', value: `Rp ${shortTermDebts.toLocaleString('id-ID')}` },
          { label: 'Total Harta Wajib Zakat', value: `Rp ${totalNetAssets.toLocaleString('id-ID')}` },
          { label: 'Nisab Zakat Maal (85 gram emas)', value: `Rp ${nisabEmasRupiahAnnual.toLocaleString('id-ID')}` },
        ],
      };
    }

    if (activeType === 'fitrah') {
      const ricePerPersonKg = 2.5;
      const totalBerasKg = familyMembers * ricePerPersonKg;
      const totalZakatRupiah = familyMembers * (ricePerPersonKg * ricePricePerKg);

      return {
        zakatType: 'fitrah',
        totalHarta: totalZakatRupiah,
        nisabValue: 0,
        isWajibZakat: true,
        totalZakatRupiah,
        details: [
          { label: 'Jumlah Jiwa yang Ditanggung', value: `${familyMembers} Orang` },
          { label: 'Kadar Beras per Jiwa (Standar MUI/Baznas)', value: '2.5 kg (3.5 liter)' },
          { label: 'Total Beras yang Dikeluarkan', value: `${totalBerasKg} kg Beras` },
          { label: 'Nilai Uang per Jiwa', value: `Rp ${(ricePerPersonKg * ricePricePerKg).toLocaleString('id-ID')}` },
        ],
      };
    }

    if (activeType === 'emas') {
      const zakatableGold = Math.max(0, goldWeightGrams - goldUsedForAdornment);
      const isWajib = zakatableGold >= 85;
      const totalZakatGram = isWajib ? zakatableGold * 0.025 : 0;
      const totalZakatRupiah = Math.round(totalZakatGram * goldPricePerGram);

      return {
        zakatType: 'emas',
        totalHarta: zakatableGold * goldPricePerGram,
        nisabValue: 85 * goldPricePerGram,
        isWajibZakat: isWajib,
        totalZakatRupiah,
        details: [
          { label: 'Total Kepemilikan Emas', value: `${goldWeightGrams} gram` },
          { label: 'Emas yang Dipakai Wajar (Non-Simpanan)', value: `${goldUsedForAdornment} gram` },
          { label: 'Emas Wajib Zakat (Telah Haul 1 thn)', value: `${zakatableGold} gram` },
          { label: 'Nisab Emas Murni', value: '85 gram' },
          { label: 'Kadar Zakat (2.5%)', value: `${totalZakatGram.toFixed(2)} gram emas` },
        ],
      };
    }

    // Perniagaan
    const netBusiness = (businessWorkingCapital + businessStockValue + businessReceivables) - businessShortDebts;
    const isWajib = netBusiness >= nisabEmasRupiahAnnual;
    const totalZakatRupiah = isWajib ? Math.round(netBusiness * 0.025) : 0;

    return {
      zakatType: 'perniagaan',
      totalHarta: netBusiness,
      nisabValue: nisabEmasRupiahAnnual,
      isWajibZakat: isWajib,
      totalZakatRupiah,
      details: [
        { label: 'Modal Kerja Lancar / Kas Usaha', value: `Rp ${businessWorkingCapital.toLocaleString('id-ID')}` },
        { label: 'Nilai Stok Barang Dagangan', value: `Rp ${businessStockValue.toLocaleString('id-ID')}` },
        { label: 'Piutang Usaha Lancar', value: `Rp ${businessReceivables.toLocaleString('id-ID')}` },
        { label: 'Hutang Usaha Jatuh Tempo', value: `Rp ${businessShortDebts.toLocaleString('id-ID')}` },
        { label: 'Total Aset Dagang Bersih', value: `Rp ${netBusiness.toLocaleString('id-ID')}` },
        { label: 'Nisab Perniagaan (85g emas)', value: `Rp ${nisabEmasRupiahAnnual.toLocaleString('id-ID')}` },
      ],
    };
  };

  const result = computeResult();

  const handleCopyResult = () => {
    const text = `--- Rincian Perhitungan Zakat (NurMuslim SuperApp) ---
Jenis Zakat: Zakat ${activeType.toUpperCase()}
Total Harta/Penghasilan: Rp ${result.totalHarta.toLocaleString('id-ID')}
Status: ${result.isWajibZakat ? 'WAJIB ZAKAT (2.5%)' : 'BELUM WAJIB ZAKAT'}
Nominal Zakat yang Dikeluarkan: Rp ${result.totalZakatRupiah.toLocaleString('id-ID')}

Detail:
${result.details.map(d => `- ${d.label}: ${d.value}`).join('\n')}

"Ambillah zakat dari sebagian harta mereka, dengan zakat itu kamu membersihkan dan mensucikan mereka..." (QS. At-Taubah: 103)`;

    navigator.clipboard?.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div id="zakat-calculator-main-view" className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-stone-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-semibold">
              Rukun Islam ke-3 • Berkah & Mensucikan Harta
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Kalkulator Zakat User-Friendly
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl">
            Hitung kewajiban Zakat Profesi, Zakat Maal/Harta, Zakat Fitrah, Zakat Emas, dan Zakat Perniagaan secara akurat sesuai kaidah fiqih Islam dan standar BAZNAS RI.
          </p>
        </div>
      </div>

      {/* Gold Price & Nisab Setting Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-zinc-300">
          <Coins className="w-4 h-4 text-amber-500" />
          <span className="font-semibold">Acuan Harga Emas Hari Ini:</span>
          <div className="flex items-center gap-1 bg-stone-100 dark:bg-zinc-800 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-zinc-700">
            <span>Rp</span>
            <input
              id="gold-price-input"
              type="number"
              value={goldPricePerGram}
              onChange={(e) => setGoldPricePerGram(Number(e.target.value) || 0)}
              className="bg-transparent font-mono font-bold text-xs sm:text-sm w-28 text-stone-900 dark:text-zinc-100 focus:outline-none"
            />
            <span className="text-stone-400 text-[11px]">/gram</span>
          </div>
        </div>

        <div className="text-xs text-stone-500 dark:text-zinc-400">
          Nisab 85g Emas = <strong className="text-emerald-600 dark:text-emerald-400 font-mono">Rp {nisabEmasRupiahAnnual.toLocaleString('id-ID')} / tahun</strong>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'profesi', label: 'Zakat Profesi (Gaji)', icon: Briefcase },
          { id: 'maal', label: 'Zakat Maal (Harta)', icon: Wallet },
          { id: 'fitrah', label: 'Zakat Fitrah', icon: Sparkles },
          { id: 'emas', label: 'Zakat Emas & Perak', icon: Coins },
          { id: 'perniagaan', label: 'Zakat Perniagaan / Dagang', icon: Calculator },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeType === tab.id;
          return (
            <button
              key={tab.id}
              id={`zakat-tab-${tab.id}`}
              onClick={() => setActiveType(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20'
                  : 'bg-white dark:bg-zinc-900 text-stone-600 dark:text-zinc-300 border border-stone-200 dark:border-zinc-800 hover:bg-stone-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Form Inputs & Live Calculation Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Form */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-sm space-y-5">
          <div className="pb-3 border-b border-stone-100 dark:border-zinc-800">
            <h3 className="font-bold text-base text-stone-900 dark:text-zinc-100">
              Formulir Input {activeType.toUpperCase()}
            </h3>
            <p className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
              Masukkan rincian aset atau pendapatan Anda untuk menghitung secara otomatis
            </p>
          </div>

          {/* Form Fields according to category */}
          {activeType === 'profesi' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Penghasilan / Gaji Pokok Bulanan (Rp)
                </label>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Pendapatan Lain / Bonus / Tunjangan Bulanan (Rp)
                </label>
                <input
                  type="number"
                  value={otherIncome}
                  onChange={(e) => setOtherIncome(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Pengeluaran Kebutuhan Pokok Bulanan (Pangan, Tempat Tinggal) (Rp)
                </label>
                <input
                  type="number"
                  value={basicExpenses}
                  onChange={(e) => setBasicExpenses(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Cicilan Hutang Jatuh Tempo / Kebutuhan Pokok (Rp)
                </label>
                <input
                  type="number"
                  value={debtPayments}
                  onChange={(e) => setDebtPayments(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {activeType === 'maal' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Uang Tunai, Tabungan & Deposito Bank (Rp)
                </label>
                <input
                  type="number"
                  value={cashAndBank}
                  onChange={(e) => setCashAndBank(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Investasi Saham Syariah, Reksadana & Surat Berharga (Rp)
                </label>
                <input
                  type="number"
                  value={investments}
                  onChange={(e) => setInvestments(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Hutang Jatuh Tempo / Kewajiban Segera (Pengurang Harta) (Rp)
                </label>
                <input
                  type="number"
                  value={shortTermDebts}
                  onChange={(e) => setShortTermDebts(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {activeType === 'fitrah' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Jumlah Jiwa yang Ditanggung (Diri Sendiri + Anggota Keluarga)
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={familyMembers}
                  onChange={(e) => setFamilyMembers(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Harga Beras yang Dikonsumsi Sehari-hari per Kg (Rp)
                </label>
                <input
                  type="number"
                  value={ricePricePerKg}
                  onChange={(e) => setRicePricePerKg(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
                <span className="text-[11px] text-stone-400 mt-1 block">
                  Standar BAZNAS: 2.5 kg beras / 3.5 liter beras per jiwa.
                </span>
              </div>
            </div>
          )}

          {activeType === 'emas' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Total Kepemilikan Emas Batangan / Logam Mulia (Gram)
                </label>
                <input
                  type="number"
                  value={goldWeightGrams}
                  onChange={(e) => setGoldWeightGrams(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Emas Perhiasan yang Rutin Dipakai (Bukan Simpanan/Investasi) (Gram)
                </label>
                <input
                  type="number"
                  value={goldUsedForAdornment}
                  onChange={(e) => setGoldUsedForAdornment(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
                <span className="text-[11px] text-stone-400 mt-1 block">
                  Menurut Jumhur Ulama, perhiasan emas yang dipakai sehari-hari secara wajar tidak wajib dizakati.
                </span>
              </div>
            </div>
          )}

          {activeType === 'perniagaan' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Modal Kerja Lancar / Kas & Bank Usaha (Rp)
                </label>
                <input
                  type="number"
                  value={businessWorkingCapital}
                  onChange={(e) => setBusinessWorkingCapital(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Nilai Stok Barang Dagangan / Inventory Siap Jual (Rp)
                </label>
                <input
                  type="number"
                  value={businessStockValue}
                  onChange={(e) => setBusinessStockValue(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Piutang Usaha yang Lancar & Berpeluang Tertagih (Rp)
                </label>
                <input
                  type="number"
                  value={businessReceivables}
                  onChange={(e) => setBusinessReceivables(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Hutang Usaha Jatuh Tempo Segera (Pengurang) (Rp)
                </label>
                <input
                  type="number"
                  value={businessShortDebts}
                  onChange={(e) => setBusinessShortDebts(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right: Live Calculation Output Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-zinc-800">
              <h3 className="font-bold text-base text-stone-900 dark:text-zinc-100">
                Hasil Perhitungan
              </h3>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                result.isWajibZakat
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-zinc-400'
              }`}>
                {result.isWajibZakat ? 'Wajib Zakat (2.5%)' : 'Belum Wajib Zakat'}
              </span>
            </div>

            {/* Big Amount Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white text-center shadow-lg space-y-1">
              <p className="text-xs text-emerald-100 font-medium">
                Kewajiban Zakat yang Harus Dikeluarkan:
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight">
                Rp {result.totalZakatRupiah.toLocaleString('id-ID')}
              </h2>
              {result.isWajibZakat ? (
                <p className="text-[11px] text-emerald-200 pt-1">
                  Telah mencapai nishab dan memenuhi syarat haul
                </p>
              ) : (
                <p className="text-[11px] text-amber-200 pt-1">
                  Belum mencapai nishab, dianjurkan memperbanyak sedekah/infaq
                </p>
              )}
            </div>

            {/* Breakdown Table */}
            <div className="space-y-2 pt-1">
              <p className="text-xs font-bold text-stone-700 dark:text-zinc-300">
                Rincian Perhitungan:
              </p>
              <div className="space-y-1.5 text-xs">
                {result.details.map((d, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 border-b border-stone-100 dark:border-zinc-800/80">
                    <span className="text-stone-500 dark:text-zinc-400">{d.label}</span>
                    <span className="font-semibold text-stone-800 dark:text-zinc-200">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Copy Button */}
            <button
              id="btn-copy-zakat-summary"
              onClick={handleCopyResult}
              className="w-full py-2.5 rounded-xl bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 text-stone-800 dark:text-zinc-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              {copiedSummary ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSummary ? 'Rincian Tersalin!' : 'Salin Rincian Zakat'}</span>
            </button>
          </div>

          {/* LAZ Distribution Info */}
          <div className="p-5 rounded-3xl bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-3">
            <h4 className="text-xs font-bold text-stone-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Lembaga Amil Zakat Resmi Terpercaya
            </h4>
            <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed">
              Salurkan zakat Anda kepada mustahiq (8 asnaf) secara tepat sasaran melalui lembaga amil zakat resmi nasional:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <span className="p-2 rounded-xl bg-white dark:bg-zinc-800 font-semibold text-center text-stone-700 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700">
                BAZNAS RI
              </span>
              <span className="p-2 rounded-xl bg-white dark:bg-zinc-800 font-semibold text-center text-stone-700 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700">
                Rumah Zakat
              </span>
              <span className="p-2 rounded-xl bg-white dark:bg-zinc-800 font-semibold text-center text-stone-700 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700">
                Dompet Dhuafa
              </span>
              <span className="p-2 rounded-xl bg-white dark:bg-zinc-800 font-semibold text-center text-stone-700 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700">
                Lazismu / Lazisnu
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
