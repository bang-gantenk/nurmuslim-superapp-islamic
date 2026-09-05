import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div 
      id="offline-indicator-banner"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl bg-amber-600/95 text-white px-4 py-2.5 text-xs font-semibold shadow-xl backdrop-blur-md border border-amber-400/40 animate-pulse"
    >
      <WifiOff className="w-4 h-4 text-amber-100 flex-shrink-0" />
      <span>Mode Offline — Anda tetap dapat membaca Al-Qur'an dan melihat jadwal sholat tersimpan.</span>
    </div>
  );
};
