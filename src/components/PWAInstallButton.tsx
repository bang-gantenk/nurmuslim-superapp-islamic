import React, { useState } from 'react';
import { Download, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PWAInstallModal } from './PWAInstallModal';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'full' | 'pill';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ 
  variant = 'compact',
  className = '' 
}) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  // If already running in standalone mode, hide the install button
  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      const installed = await install();
      if (!installed) {
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  };

  if (variant === 'pill') {
    return (
      <>
        <button
          id="pwa-install-pill-btn"
          onClick={handleClick}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-bold shadow-sm hover:shadow transition-all cursor-pointer ${className}`}
          title="Pasang aplikasi NurMuslim di HP (PWA / APK)"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Pasang App</span>
        </button>
        <PWAInstallModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </>
    );
  }

  if (variant === 'full') {
    return (
      <>
        <button
          id="pwa-install-full-btn"
          onClick={handleClick}
          className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer ${className}`}
        >
          <Smartphone className="w-4 h-4 text-amber-300" />
          <span>Pasang Aplikasi (PWA / WebAPK)</span>
        </button>
        <PWAInstallModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </>
    );
  }

  // Compact variant
  return (
    <>
      <button
        id="pwa-install-compact-btn"
        onClick={handleClick}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800/60 text-xs font-semibold transition-all cursor-pointer ${className}`}
        title="Pasang aplikasi NurMuslim di HP / Laptop"
      >
        <Download className="w-3.5 h-3.5 text-amber-500" />
        <span className="hidden sm:inline">Pasang APK/PWA</span>
        <span className="sm:hidden">App</span>
      </button>
      <PWAInstallModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};
