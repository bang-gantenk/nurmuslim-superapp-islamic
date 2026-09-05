import React from 'react';
import { 
  Download, 
  Smartphone, 
  CheckCircle2, 
  X, 
  Layers, 
  Zap, 
  Bell, 
  Globe, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      onClose();
    }
  };

  return (
    <div 
      id="pwa-install-modal-overlay"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="pwa-install-modal-container"
        className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header gradient */}
        <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 p-6 text-white relative">
          <button 
            id="pwa-close-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white/80 hover:text-white transition-colors"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 p-2 shadow-inner border border-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
              <img 
                src="/favicon.svg" 
                alt="NurMuslim Logo" 
                className="w-12 h-12 object-contain filter drop-shadow"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-emerald-950 text-[10px] font-extrabold uppercase tracking-wider">
                  PWA • WebAPK
                </span>
                {isInstalled && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Terpasang
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                Pasang Aplikasi NurMuslim
              </h2>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                Superapp Islami Indonesia Ringan & Lengkap
              </p>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Keunggulan PWA */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/40">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs mb-1">
                <Zap className="w-4 h-4" />
                <span>Super Ringan</span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-zinc-400 leading-relaxed">
                Ukuran &lt; 2 MB tanpa membebani penyimpanan memori HP Anda.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-800/40">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs mb-1">
                <Smartphone className="w-4 h-4" />
                <span>Seperti APK Murni</span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-zinc-400 leading-relaxed">
                Ikon resmi di Home Screen &amp; App Drawer, layar penuh mandiri.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-800/40">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold text-xs mb-1">
                <Globe className="w-4 h-4" />
                <span>Bisa Offline</span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-zinc-400 leading-relaxed">
                Buka Al-Qur'an 30 juz dan jadwal sholat tanpa koneksi internet.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-800/40">
              <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold text-xs mb-1">
                <Bell className="w-4 h-4" />
                <span>Notifikasi Adzan</span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-zinc-400 leading-relaxed">
                Pengingat sholat 5 waktu otomatis tepat waktu di seluruh Indonesia.
              </p>
            </div>
          </div>

          {/* Action button if installable directly */}
          {isInstallable && !isInstalled && (
            <div className="p-4 rounded-xl bg-emerald-600/10 border border-emerald-500/30 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-stone-800 dark:text-zinc-100 text-sm">
                    Browser Mendukung Pemasangan Langsung
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-zinc-400">
                    Klik tombol di bawah untuk memasang ke HP/Laptop sekarang.
                  </p>
                </div>
              </div>
              <button
                id="pwa-direct-install-btn"
                onClick={handleInstallClick}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Pasang Aplikasi Sekarang</span>
              </button>
            </div>
          )}

          {isInstalled && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-stone-800 dark:text-zinc-100 text-sm">
                  Aplikasi Sudah Terpasang
                </h4>
                <p className="text-xs text-stone-500 dark:text-zinc-400">
                  Anda sedang menjalankan NurMuslim dalam mode aplikasi standalone.
                </p>
              </div>
            </div>
          )}

          {/* Panduan Pemasangan Manual per Perangkat */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-zinc-500">
              Panduan Pasang (Android &amp; iOS)
            </h4>

            {/* Android Guide */}
            <div className="p-3.5 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-800/40 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-stone-800 dark:text-zinc-200">
                <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Untuk Pengguna Android (Chrome / Samsung Internet)</span>
              </div>
              <ol className="text-xs text-stone-600 dark:text-zinc-400 space-y-1.5 list-decimal list-inside pl-1">
                <li>Buka aplikasi web ini di <strong>Google Chrome</strong> atau browser bawaan.</li>
                <li>Ketuk menu <strong>titik tiga (⋮)</strong> di sudut kanan atas browser.</li>
                <li>Pilih menu <strong>"Install app"</strong> atau <strong>"Tambahkan ke Layar Utama" (Add to Home screen)</strong>.</li>
                <li>Sistem Android akan mengemasnya menjadi <strong>WebAPK</strong> resmi di daftar aplikasi HP Anda.</li>
              </ol>
            </div>

            {/* iOS Guide */}
            <div className="p-3.5 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-800/40 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-stone-800 dark:text-zinc-200">
                <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Untuk Pengguna iPhone / iPad (Safari)</span>
              </div>
              <ol className="text-xs text-stone-600 dark:text-zinc-400 space-y-1.5 list-decimal list-inside pl-1">
                <li>Buka aplikasi web ini melalui browser <strong>Safari</strong>.</li>
                <li>Ketuk tombol <strong>Share</strong> (ikon kotak dengan panah ke atas) di bagian bawah.</li>
                <li>Gulir ke bawah dan pilih <strong>"Add to Home Screen" (Tambah ke Layar Utama)</strong>.</li>
                <li>Beri nama lalu ketuk <strong>"Add"</strong> di pojok kanan atas.</li>
              </ol>
            </div>

            {/* Desktop Guide */}
            <div className="p-3.5 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-800/40 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-stone-800 dark:text-zinc-200">
                <Layers className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Untuk Komputer / Laptop (Chrome / Edge)</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-zinc-400">
                Klik ikon <strong>Install / Pasang</strong> di sisi kanan address bar browser (di samping ikon bintang bookmark) untuk memasang sebagai aplikasi desktop mandiri.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 dark:bg-zinc-800/60 border-t border-stone-200 dark:border-zinc-800 flex items-center justify-between">
          <span className="text-[11px] text-stone-500 dark:text-zinc-400">
            Versi PWA 1.0 • Bebas Iklan &amp; Aman
          </span>
          <button
            id="pwa-modal-ok-btn"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-200 dark:bg-zinc-700 hover:bg-stone-300 dark:hover:bg-zinc-600 text-stone-800 dark:text-zinc-200 text-xs font-semibold transition-colors"
          >
            Mengerti &amp; Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
