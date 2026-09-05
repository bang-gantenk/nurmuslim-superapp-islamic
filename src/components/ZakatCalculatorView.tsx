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
  Wheat,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { ZakatCalculationResult } from '../types';

export const ZakatCalculatorView: React.FC = () => {
  const [activeType, setActiveType] = useState<'profesi' | 'maal' | 'fitrah' | 'emas' | 'perniagaan' | 'pertanian'>('profesi');
  
  // Commodity reference prices
  const [goldPricePerGram, setGoldPricePerGram] = useState<number>(1450000); // Standar emas murni Antam terkini ~Rp 1.450.000/g
  const [silverPricePerGram, setSilverPricePerGram] = useState<number>(17500); // Rp 17.500/g perak murni
  const [ricePricePerKg, setRicePricePerKg] = useState<number>(15000); // Standar beras medium-premium Rp 15.000/kg
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Zakat Profesi settings
  const [profesiMethod, setProfesiMethod] = useState<'netto' | 'bruto'>('netto');
  const [profesiNisabBasis, setProfesiNisabBasis] = useState<'emas' | 'beras'>('emas');
  const [monthlyIncome, setMonthlyIncome] = useState<number>(10000000);
  const [otherIncome, setOtherIncome] = useState<number>(2000000);
  const [basicExpenses, setBasicExpenses] = useState<number>(4000000);
  const [debtPayments, setDebtPayments] = useState<number>(1000000);

  // Zakat Maal states
  const [cashAndBank, setCashAndBank] = useState<number>(120000000);
  const [investments, setInvestments] = useState<number>(30000000);
  const [receivablesLancar, setReceivablesLancar] = useState<number>(5000000);
  const [shortTermDebts, setShortTermDebts] = useState<number>(10000000);
  const [maalCalendarBasis, setMaalCalendarBasis] = useState<'hijri' | 'masehi'>('hijri'); // 2.5% or 2.577%

  // Zakat Fitrah states
  const [familyMembers, setFamilyMembers] = useState<number>(4);
  const [fitrahPaymentMode, setFitrahPaymentMode] = useState<'beras' | 'uang'>('uang');
  const [baznasFlatRate, setBaznasFlatRate] = useState<number>(45000); // SK BAZNAS per jiwa Rp 45.000 - Rp 55.000

  // Zakat Emas & Perak states
  const [goldWeightGrams, setGoldWeightGrams] = useState<number>(90);
  const [goldUsedForAdornment, setGoldUsedForAdornment] = useState<number>(0);
  const [silverWeightGrams, setSilverWeightGrams] = useState<number>(0);

  // Zakat Perniagaan states
  const [businessWorkingCapital, setBusinessWorkingCapital] = useState<number>(150000000);
  const [businessStockValue, setBusinessStockValue] = useState<number>(50000000);
  const [businessReceivables, setBusinessReceivables] = useState<number>(20000000);
  const [businessShortDebts, setBusinessShortDebts] = useState<number>(30000000);

  // Zakat Pertanian (Pertanian Brebes, Tegal, Padi, Bawang Merah, dll)
  const [harvestValueRupiah, setHarvestValueRupiah] = useState<number>(25000000);
  const [harvestWeightKg, setHarvestWeightKg] = useState<number>(2000);
  const [irrigationType, setIrrigationType] = useState<'berbiaya' | 'tadakhujan'>('berbiaya'); // 5% vs 10%

  // Nisab Reference Calculations
  const nisabEmasRupiahAnnual = 85 * goldPricePerGram; // 85g emas
  const nisabEmasRupiahMonthly = nisabEmasRupiahAnnual / 12; // 1/12 dari 85g emas
  const nisabBerasRupiahMonthly = 520 * ricePricePerKg; // 520 kg beras menurut Fatwa MUI No. 3/2003
  const nisabPertanianRupiah = 653 * ricePricePerKg; // 653 kg gabah kering panen (5 wasaq)

  // Reset to default official BAZNAS rates
  const handleResetToBaznasRates = () => {
    setGoldPricePerGram(1450000);
    setSilverPricePerGram(17500);
    setRicePricePerKg(15000);
    setBaznasFlatRate(45000);
  };

  // Compute results accurately based on active tab
  const computeResult = (): ZakatCalculationResult => {
    // 1. ZAKAT PROFESI
    if (activeType === 'profesi') {
      const grossIncome = monthlyIncome + otherIncome;
      const totalExpenses = basicExpenses + debtPayments;
      const netIncome = Math.max(0, grossIncome - totalExpenses);

      const targetNisab = profesiNisabBasis === 'emas' ? nisabEmasRupiahMonthly : nisabBerasRupiahMonthly;
      const subjectIncome = profesiMethod === 'netto' ? netIncome : grossIncome;
      const isWajib = subjectIncome >= targetNisab;
      const totalZakatRupiah = isWajib ? Math.round(subjectIncome * 0.025) : 0;

      return {
        zakatType: 'profesi',
        totalHarta: subjectIncome,
        nisabValue: targetNisab,
        isWajibZakat: isWajib,
        totalZakatRupiah,
        details: [
          { label: 'Metode Perhitungan', value: profesiMethod === 'netto' ? 'Penghasilan Bersih (Netto BAZNAS)' : 'Penghasilan Kotor (Bruto)' },
          { label: 'Total Pemasukan Bulanan (Gaji + Tunjangan)', value: `Rp ${grossIncome.toLocaleString('id-ID')}` },
          ...(profesiMethod === 'netto' ? [
            { label: 'Pengeluaran Kebutuhan Pokok & Cicilan', value: `Rp ${totalExpenses.toLocaleString('id-ID')}` },
            { label: 'Sisa Penghasilan Bersih Bulanan', value: `Rp ${netIncome.toLocaleString('id-ID')}` },
          ] : []),
          { 
            label: `Nisab Bulanan (${profesiNisabBasis === 'emas' ? '1/12 x 85g Emas' : '520 kg Beras MUI'})`, 
            value: `Rp ${Math.round(targetNisab).toLocaleString('id-ID')}` 
          },
          { label: 'Status Kewajiban Zakat', value: isWajib ? 'WAJIB (2.5%)' : 'Belum Wajib (Dianjurkan Infaq/Sedekah)' },
        ],
      };
    }

    // 2. ZAKAT MAAL
    if (activeType === 'maal') {
      const grossAssets = cashAndBank + investments + receivablesLancar;
      const netAssets = Math.max(0, grossAssets - shortTermDebts);
      const isWajib = netAssets >= nisabEmasRupiahAnnual;
      const rate = maalCalendarBasis === 'hijri' ? 0.025 : 0.02577; // 2.5% Hijriyah atau 2.577% Masehi
      const totalZakatRupiah = isWajib ? Math.round(netAssets * rate) : 0;

      return {
        zakatType: 'maal',
        totalHarta: netAssets,
        nisabValue: nisabEmasRupiahAnnual,
        isWajibZakat: isWajib,
        totalZakatRupiah,
        details: [
          { label: 'Uang Tunai, Tabungan & Deposito', value: `Rp ${cashAndBank.toLocaleString('id-ID')}` },
          { label: 'Investasi Saham/Reksadana Syariah', value: `Rp ${investments.toLocaleString('id-ID')}` },
          { label: 'Piutang Lancar Tertagih', value: `Rp ${receivablesLancar.toLocaleString('id-ID')}` },
          { label: 'Hutang Jatuh Tempo (Pengurang)', value: `Rp ${shortTermDebts.toLocaleString('id-ID')}` },
          { label: 'Total Harta Bersih Haul 1 Tahun', value: `Rp ${netAssets.toLocaleString('id-ID')}` },
          { label: 'Nisab Maal (85 gram emas)', value: `Rp ${nisabEmasRupiahAnnual.toLocaleString('id-ID')}` },
          { label: 'Kadar Zakat Digunakan', value: maalCalendarBasis === 'hijri' ? '2.5% (Tahun Hijriyah)' : '2.577% (Tahun Masehi 365 hari)' },
        ],
      };
    }

    // 3. ZAKAT FITRAH
    if (activeType === 'fitrah') {
      const ricePerPersonKg = 2.5;
      const totalBerasKg = familyMembers * ricePerPersonKg;
      const totalUangBeras = familyMembers * (ricePerPersonKg * ricePricePerKg);
      const totalUangBaznas = familyMembers * baznasFlatRate;
      const finalAmountRupiah = fitrahPaymentMode === 'uang' ? totalUangBaznas : totalUangBeras;

      return {
        zakatType: 'fitrah',
        totalHarta: finalAmountRupiah,
        nisabValue: 0,
        isWajibZakat: true,
        totalZakatRupiah: finalAmountRupiah,
        details: [
          { label: 'Jumlah Jiwa Ditanggung', value: `${familyMembers} Orang` },
          { label: 'Kadar Beras per Jiwa (MUI & BAZNAS)', value: '2.5 kg (3.5 liter) beras' },
          { label: 'Total Beras Jika Dibayarkan Makanan Pokok', value: `${totalBerasKg} kg beras` },
          { label: 'Nominal Standar per Jiwa', value: `Rp ${baznasFlatRate.toLocaleString('id-ID')} / orang` },
          { label: 'Waktu Pembayaran', value: 'Bulan Ramadhan s.d. Sebelum Sholat Idul Fitri' },
        ],
      };
    }

    // 4. ZAKAT EMAS & PERAK
    if (activeType === 'emas') {
      const zakatableGold = Math.max(0, goldWeightGrams - goldUsedForAdornment);
      const isGoldWajib = zakatableGold >= 85;
      const totalGoldZakatGram = isGoldWajib ? zakatableGold * 0.025 : 0;
      const goldZakatRupiah = Math.round(totalGoldZakatGram * goldPricePerGram);

      // Silver
      const isSilverWajib = silverWeightGrams >= 595;
      const totalSilverZakatGram = isSilverWajib ? silverWeightGrams * 0.025 : 0;
      const silverZakatRupiah = Math.round(totalSilverZakatGram * silverPricePerGram);

      const combinedTotalZakat = goldZakatRupiah + silverZakatRupiah;
      const isAnyWajib = isGoldWajib || isSilverWajib;

      return {
        zakatType: 'emas',
        totalHarta: zakatableGold * goldPricePerGram + silverWeightGrams * silverPricePerGram,
        nisabValue: 85 * goldPricePerGram,
        isWajibZakat: isAnyWajib,
        totalZakatRupiah: combinedTotalZakat,
        details: [
          { label: 'Total Emas Dimiliki', value: `${goldWeightGrams} gram` },
          { label: 'Emas Perhiasan Pakai Rutin (Bebas Zakat)', value: `${goldUsedForAdornment} gram` },
          { label: 'Emas Wajib Zakat (Tersimpan 1 Haul)', value: `${zakatableGold} gram (Nisab: 85g)` },
          { label: 'Status Zakat Emas', value: isGoldWajib ? `Wajib (${totalGoldZakatGram.toFixed(2)} gram = Rp ${goldZakatRupiah.toLocaleString('id-ID')})` : 'Belum Mencapai Nisab 85g' },
          { label: 'Total Perak Dimiliki', value: `${silverWeightGrams} gram (Nisab: 595g)` },
          { label: 'Status Zakat Perak', value: isSilverWajib ? `Wajib (${totalSilverZakatGram.toFixed(2)} gram = Rp ${silverZakatRupiah.toLocaleString('id-ID')})` : 'Belum Mencapai Nisab 595g' },
        ],
      };
    }

    // 5. ZAKAT PERNIAGAAN
    if (activeType === 'perniagaan') {
      const netBusiness = (businessWorkingCapital + businessStockValue + businessReceivables) - businessShortDebts;
      const isWajib = netBusiness >= nisabEmasRupiahAnnual;
      const totalZakatRupiah = isWajib ? Math.round(Math.max(0, netBusiness) * 0.025) : 0;

      return {
        zakatType: 'perniagaan',
        totalHarta: netBusiness,
        nisabValue: nisabEmasRupiahAnnual,
        isWajibZakat: isWajib,
        totalZakatRupiah,
        details: [
          { label: 'Modal Kerja Lancar / Kas & Rekening Usaha', value: `Rp ${businessWorkingCapital.toLocaleString('id-ID')}` },
          { label: 'Nilai Stok / Persediaan Barang Dagang Siap Jual', value: `Rp ${businessStockValue.toLocaleString('id-ID')}` },
          { label: 'Piutang Dagang Lancar', value: `Rp ${businessReceivables.toLocaleString('id-ID')}` },
          { label: 'Hutang Usaha Jatuh Tempo Segera (Pengurang)', value: `Rp ${businessShortDebts.toLocaleString('id-ID')}` },
          { label: 'Total Aset Dagang Bersih', value: `Rp ${netBusiness.toLocaleString('id-ID')}` },
          { label: 'Nisab Perniagaan (85 gram emas)', value: `Rp ${nisabEmasRupiahAnnual.toLocaleString('id-ID')}` },
          { label: 'Kadar Zakat Usaha', value: '2.5% per tahun buku usaha' },
        ],
      };
    }

    // 6. ZAKAT PERTANIAN (Hasil Bumi: Padi, Bawang Brebes/Tegal, dll)
    const isWajibPertanian = harvestWeightKg >= 653 || harvestValueRupiah >= nisabPertanianRupiah;
    const ratePertanian = irrigationType === 'berbiaya' ? 0.05 : 0.10; // 5% (irigasi pompa/berbiaya) atau 10% (tadah hujan)
    const totalZakatRupiah = isWajibPertanian ? Math.round(harvestValueRupiah * ratePertanian) : 0;

    return {
      zakatType: 'pertanian',
      totalHarta: harvestValueRupiah,
      nisabValue: nisabPertanianRupiah,
      isWajibZakat: isWajibPertanian,
      totalZakatRupiah,
      details: [
        { label: 'Jenis Hasil Bumi', value: 'Padi, Bawang Merah, Palawija & Komoditas Pertanian' },
        { label: 'Estimasi Berat Panen', value: `${harvestWeightKg.toLocaleString('id-ID')} kg (Nisab 5 wasaq = 653 kg)` },
        { label: 'Total Nilai Rupiah Panen', value: `Rp ${harvestValueRupiah.toLocaleString('id-ID')}` },
        { label: 'Sistem Pengairan', value: irrigationType === 'berbiaya' ? 'Irigasi Berbiaya / Pompa Air Listrik / Diesel (5%)' : 'Tadah Hujan / Mata Air Alami Tanpa Biaya (10%)' },
        { label: 'Waktu Pengeluaran Zakat', value: 'Dikeluarkan Seketika Tiap Musim Panen (Tanpa Haul 1 Tahun)' },
      ],
    };
  };

  const result = computeResult();

  const handleCopyResult = () => {
    const text = `=== HASIL PERHITUNGAN ZAKAT (STANDAR RESMI BAZNAS RI) ===
Jenis Zakat: Zakat ${activeType.toUpperCase()}
Total Nilai Objek Zakat: Rp ${result.totalHarta.toLocaleString('id-ID')}
Nisab Acuan: Rp ${Math.round(result.nisabValue).toLocaleString('id-ID')}
Status Kewajiban: ${result.isWajibZakat ? 'WAJIB ZAKAT' : 'BELUM WAJIB ZAKAT'}
Nominal Zakat yang Harus Dikeluarkan: Rp ${result.totalZakatRupiah.toLocaleString('id-ID')}

Rincian Detail:
${result.details.map(d => `• ${d.label}: ${d.value}`).join('\n')}

Dalil: "Ambillah zakat dari sebagian harta mereka, dengan zakat itu kamu membersihkan dan mensucikan mereka..." (QS. At-Taubah: 103)`;

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
              Rukun Islam ke-3 • Akurat Standar BAZNAS RI & Fatwa MUI
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Kalkulator Zakat Akurat & Fiqih Sah
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl">
            Perhitungan presisi untuk Zakat Profesi (Penghasilan), Zakat Maal, Zakat Fitrah, Zakat Emas/Perak, Zakat Perniagaan, dan Zakat Pertanian (Bawang Brebes, Tegal & Padi) sesuai kaidah syariah.
          </p>
        </div>
      </div>

      {/* Real-time Commodity & Nisab Settings Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 dark:text-zinc-300">
          <div className="flex items-center gap-1.5">
            <Coins className="w-4 h-4 text-amber-500" />
            <span className="font-semibold">Harga Emas:</span>
            <div className="flex items-center gap-1 bg-stone-100 dark:bg-zinc-800 px-2.5 py-1 rounded-lg border border-stone-200 dark:border-zinc-700">
              <span>Rp</span>
              <input
                type="number"
                value={goldPricePerGram}
                onChange={(e) => setGoldPricePerGram(Number(e.target.value) || 0)}
                className="bg-transparent font-mono font-bold text-xs w-24 text-stone-900 dark:text-zinc-100 focus:outline-none"
              />
              <span className="text-stone-400 text-[10px]">/gram</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Wheat className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">Harga Beras:</span>
            <div className="flex items-center gap-1 bg-stone-100 dark:bg-zinc-800 px-2.5 py-1 rounded-lg border border-stone-200 dark:border-zinc-700">
              <span>Rp</span>
              <input
                type="number"
                value={ricePricePerKg}
                onChange={(e) => setRicePricePerKg(Number(e.target.value) || 0)}
                className="bg-transparent font-mono font-bold text-xs w-20 text-stone-900 dark:text-zinc-100 focus:outline-none"
              />
              <span className="text-stone-400 text-[10px]">/kg</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetToBaznasRates}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 text-stone-600 dark:text-zinc-300 text-xs font-semibold transition-colors"
            title="Reset ke acuan standar BAZNAS RI"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Acuan</span>
          </button>
          <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 font-mono">
            Nisab 85g Emas = Rp {nisabEmasRupiahAnnual.toLocaleString('id-ID')}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'profesi', label: 'Zakat Profesi (Gaji)', icon: Briefcase },
          { id: 'maal', label: 'Zakat Maal (Tabungan)', icon: Wallet },
          { id: 'fitrah', label: 'Zakat Fitrah', icon: Sparkles },
          { id: 'emas', label: 'Zakat Emas & Logam', icon: Coins },
          { id: 'perniagaan', label: 'Zakat Perniagaan (Usaha)', icon: Calculator },
          { id: 'pertanian', label: 'Zakat Pertanian (Hasil Bumi)', icon: Wheat },
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
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20 font-bold'
                  : 'bg-white dark:bg-zinc-900 text-stone-600 dark:text-zinc-300 border border-stone-200 dark:border-zinc-800 hover:bg-stone-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Input Form & Calculation Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Form */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-sm space-y-5">
          <div className="pb-3 border-b border-stone-100 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-stone-900 dark:text-zinc-100">
                Formulir Rincian {activeType.toUpperCase()}
              </h3>
              <p className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
                Masukkan nilai harta sesuai data sebenarnya untuk memastikan keabsahan zakat
              </p>
            </div>
          </div>

          {/* 1. PROFESI FORM */}
          {activeType === 'profesi' && (
            <div className="space-y-4">
              {/* Method Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-stone-100 dark:bg-zinc-800 text-xs">
                <button
                  type="button"
                  onClick={() => setProfesiMethod('netto')}
                  className={`py-2 px-3 rounded-xl font-bold transition-all ${
                    profesiMethod === 'netto'
                      ? 'bg-white dark:bg-zinc-900 text-emerald-700 dark:text-emerald-300 shadow-xs'
                      : 'text-stone-600 dark:text-zinc-400'
                  }`}
                >
                  Metode Netto (Disarankan BAZNAS)
                </button>
                <button
                  type="button"
                  onClick={() => setProfesiMethod('bruto')}
                  className={`py-2 px-3 rounded-xl font-bold transition-all ${
                    profesiMethod === 'bruto'
                      ? 'bg-white dark:bg-zinc-900 text-emerald-700 dark:text-emerald-300 shadow-xs'
                      : 'text-stone-600 dark:text-zinc-400'
                  }`}
                >
                  Metode Bruto (Penghasilan Kotor)
                </button>
              </div>

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
                  Tunjangan, Bonus, Lembur, atau Pendapatan Lain Bulanan (Rp)
                </label>
                <input
                  type="number"
                  value={otherIncome}
                  onChange={(e) => setOtherIncome(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              {profesiMethod === 'netto' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                      Pengeluaran Kebutuhan Pokok Sandang, Pangan, Papan Bulanan (Rp)
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
                      Cicilan Hutang Jatuh Tempo Pokok Bulanan (Rp)
                    </label>
                    <input
                      type="number"
                      value={debtPayments}
                      onChange={(e) => setDebtPayments(Number(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* 2. MAAL FORM */}
          {activeType === 'maal' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Uang Tunai, Saldo Tabungan & Deposito Bank (Rp)
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
                  Piutang Lancar yang Diharapkan Tertagih (Rp)
                </label>
                <input
                  type="number"
                  value={receivablesLancar}
                  onChange={(e) => setReceivablesLancar(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Hutang Jatuh Tempo Segera Dilunasi (Pengurang Harta) (Rp)
                </label>
                <input
                  type="number"
                  value={shortTermDebts}
                  onChange={(e) => setShortTermDebts(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs font-semibold text-stone-600 dark:text-zinc-400">Acuan Haul:</span>
                <button
                  type="button"
                  onClick={() => setMaalCalendarBasis('hijri')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${maalCalendarBasis === 'hijri' ? 'bg-emerald-600 text-white' : 'bg-stone-100 dark:bg-zinc-800'}`}
                >
                  Tahun Hijriyah (2.5%)
                </button>
                <button
                  type="button"
                  onClick={() => setMaalCalendarBasis('masehi')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${maalCalendarBasis === 'masehi' ? 'bg-emerald-600 text-white' : 'bg-stone-100 dark:bg-zinc-800'}`}
                >
                  Tahun Masehi 365 Hari (2.577%)
                </button>
              </div>
            </div>
          )}

          {/* 3. FITRAH FORM */}
          {activeType === 'fitrah' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Jumlah Jiwa yang Ditanggung (Diri Sendiri + Tanggungan Keluarga)
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
                  Nominal Zakat Fitrah per Jiwa (Standar SK BAZNAS RI) (Rp)
                </label>
                <input
                  type="number"
                  value={baznasFlatRate}
                  onChange={(e) => setBaznasFlatRate(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
                <span className="text-[11px] text-stone-400 mt-1 block">
                  Setara 2.5 kg atau 3.5 liter beras per jiwa. Rentang lazim BAZNAS daerah: Rp 45.000 s.d. Rp 55.000.
                </span>
              </div>

              {/* Niat Zakat Fitrah Card */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> Niat Zakat Fitrah untuk Diri Sendiri:
                </span>
                <p className="text-sm font-serif text-right text-stone-900 dark:text-zinc-100 font-bold leading-relaxed" dir="rtl">
                  نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنْ نَفْسِيْ فَرْضًا لِلّٰهِ تَعَالَى
                </p>
                <p className="text-xs italic text-stone-600 dark:text-zinc-400">
                  "Nawaitu an ukhrija zakaatal fithri 'an nafsii fardhan lillaahi ta'aalaa"
                </p>
              </div>
            </div>
          )}

          {/* 4. EMAS FORM */}
          {activeType === 'emas' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Total Kepemilikan Emas Batangan / Koin / Simpanan (Gram)
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
                  Emas Perhiasan yang Rutin Dipakai Wajar (Non-Simpanan) (Gram)
                </label>
                <input
                  type="number"
                  value={goldUsedForAdornment}
                  onChange={(e) => setGoldUsedForAdornment(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
                <span className="text-[11px] text-stone-400 mt-1 block">
                  Menurut Jumhur Ulama (Syafi'i, Maliki, Hanbali), perhiasan yang dipakai wajar tidak wajib dizakati.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Kepemilikan Perak Murni (Gram) - Nisab 595 gram
                </label>
                <input
                  type="number"
                  value={silverWeightGrams}
                  onChange={(e) => setSilverWeightGrams(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {/* 5. PERNIAGAAN FORM */}
          {activeType === 'perniagaan' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Modal Kerja Lancar / Kas & Saldo Rekening Usaha (Rp)
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
                  Nilai Stok Persediaan Barang Dagangan Siap Jual (Rp)
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
                  Piutang Usaha Lancar yang Berpeluang Tertagih (Rp)
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

          {/* 6. PERTANIAN FORM (BREBES, TEGAL, JATENG, DLL) */}
          {activeType === 'pertanian' && (
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200">
                Cocok untuk hasil tani daerah sentra Jateng seperti Bawang Merah Brebes/Tegal, Padi Demak/Kudus, serta palawija. Dikeluarkan langsung pada hari panen (QS. Al-An'am: 141).
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Estimasi Total Berat Panen Bersih (Kg) - Nisab 653 Kg
                </label>
                <input
                  type="number"
                  value={harvestWeightKg}
                  onChange={(e) => setHarvestWeightKg(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1">
                  Total Nilai Rupiah dari Hasil Panen Terjual (Rp)
                </label>
                <input
                  type="number"
                  value={harvestValueRupiah}
                  onChange={(e) => setHarvestValueRupiah(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-zinc-300 mb-1.5">
                  Sistem Pengairan Lahan:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIrrigationType('berbiaya')}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left border transition-all ${
                      irrigationType === 'berbiaya'
                        ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-800 dark:text-emerald-200'
                        : 'bg-stone-50 dark:bg-zinc-800 border-stone-200 dark:border-zinc-700 text-stone-600 dark:text-zinc-400'
                    }`}
                  >
                    <div>Irigasi Berbiaya (5%)</div>
                    <div className="text-[10px] font-normal opacity-75">Pompa air diesel, listrik sumur bor</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIrrigationType('tadakhujan')}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left border transition-all ${
                      irrigationType === 'tadakhujan'
                        ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-800 dark:text-emerald-200'
                        : 'bg-stone-50 dark:bg-zinc-800 border-stone-200 dark:border-zinc-700 text-stone-600 dark:text-zinc-400'
                    }`}
                  >
                    <div>Tadah Hujan Alami (10%)</div>
                    <div className="text-[10px] font-normal opacity-75">Air hujan/sungai tanpa biaya pompa</div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Live Calculation Output Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-zinc-800">
              <h3 className="font-bold text-base text-stone-900 dark:text-zinc-100">
                Hasil Perhitungan Syar'i
              </h3>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                result.isWajibZakat
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-zinc-400'
              }`}>
                {result.isWajibZakat ? 'WAJIB ZAKAT' : 'BELUM WAJIB ZAKAT'}
              </span>
            </div>

            {/* Big Amount Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white text-center shadow-lg space-y-1">
              <p className="text-xs text-emerald-100 font-medium">
                Nominal Kewajiban Zakat yang Harus Dikeluarkan:
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight">
                Rp {result.totalZakatRupiah.toLocaleString('id-ID')}
              </h2>
              {result.isWajibZakat ? (
                <p className="text-[11px] text-emerald-200 pt-1">
                  Telah memenuhi ketentuan nishab dan syarat fiqih yang sah
                </p>
              ) : (
                <p className="text-[11px] text-amber-200 pt-1">
                  Harta belum mencapai nishab minimum kewajiban zakat, dianjurkan infaq/sedekah
                </p>
              )}
            </div>

            {/* Breakdown Details */}
            <div className="space-y-2 pt-1">
              <p className="text-xs font-bold text-stone-700 dark:text-zinc-300">
                Rincian Perhitungan Fiqih:
              </p>
              <div className="space-y-1.5 text-xs">
                {result.details.map((d, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 border-b border-stone-100 dark:border-zinc-800/80">
                    <span className="text-stone-500 dark:text-zinc-400">{d.label}</span>
                    <span className="font-semibold text-stone-800 dark:text-zinc-200 text-right ml-2">{d.value}</span>
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
              <span>{copiedSummary ? 'Rincian Berhasil Tersalin!' : 'Salin Rincian Zakat'}</span>
            </button>
          </div>

          {/* Lembaga Amil Zakat Resmi */}
          <div className="p-5 rounded-3xl bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-3">
            <h4 className="text-xs font-bold text-stone-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Lembaga Amil Zakat Resmi Nasional
            </h4>
            <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed">
              Tunaikan zakat Anda melalui amil zakat terpercaya berizin resmi Kementerian Agama RI:
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
