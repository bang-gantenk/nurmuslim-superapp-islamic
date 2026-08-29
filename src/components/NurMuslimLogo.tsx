import React from 'react';

interface NurMuslimLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const NurMuslimLogo: React.FC<NurMuslimLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
}) => {
  const sizeMap = {
    xs: 'w-7 h-7',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Crisp Vector Circular Emblem with 100% Transparent Background */}
      <svg
        className={`${sizeMap[size]} transition-transform duration-300 drop-shadow-md`}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gold Gradient */}
          <linearGradient id="logoGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="35%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#FDE047" />
          </linearGradient>

          {/* Emerald Gradient */}
          <linearGradient id="logoEmeraldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0D9488" />
            <stop offset="40%" stopColor="#065F46" />
            <stop offset="100%" stopColor="#022C22" />
          </linearGradient>

          {/* Star Flare Glow */}
          <radialGradient id="logoStarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="1" />
            <stop offset="40%" stopColor="#FDE047" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Golden Concentric Circles */}
        <circle cx="256" cy="256" r="236" stroke="url(#logoGoldGrad)" strokeWidth="8" fill="none" />
        <circle cx="256" cy="256" r="222" stroke="url(#logoGoldGrad)" strokeWidth="3.5" strokeDasharray="8 5" fill="none" />
        <circle cx="256" cy="256" r="206" stroke="url(#logoGoldGrad)" strokeWidth="2.5" fill="none" />

        {/* Dome Sunrays / Aura */}
        <g stroke="url(#logoGoldGrad)" strokeWidth="3" opacity="0.8">
          <line x1="256" y1="120" x2="256" y2="82" />
          <line x1="198" y1="135" x2="170" y2="102" />
          <line x1="314" y1="135" x2="342" y2="102" />
          <line x1="148" y1="172" x2="116" y2="142" />
          <line x1="364" y1="172" x2="396" y2="142" />
          <line x1="116" y1="222" x2="84" y2="204" />
          <line x1="396" y1="222" x2="428" y2="204" />
        </g>

        {/* Crescent Moon & 5-point Star Top Finial */}
        <g transform="translate(256, 74)">
          <path
            d="M-1,-26 A18,18 0 1,0 16,3 A14,14 0 1,1 -1,-26 Z"
            fill="#065F46"
            stroke="url(#logoGoldGrad)"
            strokeWidth="2"
          />
          <path
            d="M5,-12 L7,-7 L12,-7 L8,-3 L10,2 L5,-1 L1,2 L2,-3 L-2,-7 L3,-7 Z"
            fill="url(#logoGoldGrad)"
          />
        </g>

        {/* Main Majestic Mosque Dome */}
        <path
          d="M256,126 C308,170 342,206 352,274 C352,276 160,276 160,274 C170,206 204,170 256,126 Z"
          fill="url(#logoEmeraldGrad)"
          stroke="url(#logoGoldGrad)"
          strokeWidth="4.5"
        />

        {/* Dome Inner Architectural Ribs */}
        <path d="M256,144 C290,180 318,218 326,274" stroke="url(#logoGoldGrad)" strokeWidth="2.8" fill="none" opacity="0.85" />
        <path d="M256,144 C222,180 194,218 186,274" stroke="url(#logoGoldGrad)" strokeWidth="2.8" fill="none" opacity="0.85" />
        <path d="M256,162 C276,196 294,232 298,274" stroke="url(#logoGoldGrad)" strokeWidth="2.2" fill="none" opacity="0.7" />
        <path d="M256,162 C236,196 218,232 214,274" stroke="url(#logoGoldGrad)" strokeWidth="2.2" fill="none" opacity="0.7" />

        {/* Center Glowing Star In Dome */}
        <circle cx="256" cy="196" r="16" fill="url(#logoStarGlow)" />
        <path d="M256,182 L260,192 L270,196 L260,200 L256,210 L252,200 L242,196 L252,192 Z" fill="#FFFFFF" />

        {/* Dome Base Symbols: Open Quran, Mihrab Gate, Minaret Star */}
        <g fill="url(#logoGoldGrad)" opacity="0.95">
          {/* Open Quran */}
          <path d="M228,236 C225,233 220,233 216,236 L216,248 C220,246 225,246 228,248 Z" />
          <path d="M228,236 C231,233 236,233 240,236 L240,248 C236,246 231,246 228,248 Z" />
          {/* Mosque Gate */}
          <path d="M251,250 L251,238 C251,233 261,233 261,238 L261,250 Z" />
          <circle cx="256" cy="233" r="3" />
          {/* Lattice Pattern */}
          <rect x="272" y="235" width="5" height="5" rx="1" />
          <rect x="280" y="235" width="5" height="5" rx="1" />
          <rect x="272" y="243" width="5" height="5" rx="1" />
          <rect x="280" y="243" width="5" height="5" rx="1" />
        </g>

        {/* Arabic Calligraphy Typography: "نور مسلم" */}
        <g transform="translate(256, 335)" textAnchor="middle">
          {/* Outline / Stroke for contrast on all backgrounds */}
          <text
            fontFamily="'Amiri', 'Scheherazade New', 'Traditional Arabic', serif"
            fontSize="78"
            fontWeight="bold"
            fill="#022C22"
            stroke="#022C22"
            strokeWidth="9"
            strokeLinejoin="round"
            x="0"
            y="0"
          >
            نُور مُسْلِم
          </text>
          <text
            fontFamily="'Amiri', 'Scheherazade New', 'Traditional Arabic', serif"
            fontSize="78"
            fontWeight="bold"
            fill="#FFFFFF"
            stroke="#044E3D"
            strokeWidth="2.5"
            x="0"
            y="0"
          >
            نُور مُسْلِم
          </text>
        </g>

        {/* Latin Typography: "NURMUSLIM" */}
        <text
          x="256"
          y="382"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontSize="30"
          fontWeight="900"
          letterSpacing="4"
          fill="url(#logoGoldGrad)"
          textAnchor="middle"
        >
          NURMUSLIM
        </text>

        {/* Subtitle: "SUPERAPP ISLAMI" */}
        <text
          x="256"
          y="408"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontSize="15"
          fontWeight="800"
          letterSpacing="3"
          fill="#0D9488"
          textAnchor="middle"
        >
          SUPERAPP ISLAMI
        </text>

        {/* Bottom Arabesque Geometric Ornament */}
        <g stroke="url(#logoGoldGrad)" strokeWidth="2.5" fill="none" opacity="0.85" transform="translate(256, 442)">
          <path d="M-42,0 L-21,-16 L0,0 L21,-16 L42,0 L21,16 L0,0 L-21,16 Z" />
          <circle cx="0" cy="0" r="4.5" fill="url(#logoGoldGrad)" />
          <circle cx="-58" cy="0" r="3.5" fill="url(#logoGoldGrad)" />
          <circle cx="58" cy="0" r="3.5" fill="url(#logoGoldGrad)" />
        </g>
      </svg>

      {showText && (
        <div className="ml-2.5 text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-lg text-emerald-950 dark:text-emerald-400 tracking-tight leading-tight">
              NurMuslim
            </span>
            <span className="text-[9px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50">
              SuperApp
            </span>
          </div>
          <p className="text-[10px] text-stone-500 dark:text-zinc-400 font-medium">
            Sahabat Ibadah & Sunnah
          </p>
        </div>
      )}
    </div>
  );
};
