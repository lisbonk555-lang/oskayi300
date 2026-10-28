import React from 'react';

interface OilLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function OilLogo({ className = '', size = 44, showText = true }: OilLogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* SVG Oil Drop with stylized O and gold/green gradient */}
      <div 
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Deep oil black gradient with gold and emerald reflections */}
            <linearGradient id="oilDropGrad" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="25%" stopColor="#1a1a1a" />
              <stop offset="70%" stopColor="#0a0a0a" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            
            <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5E6B3" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#AA7C11" />
            </linearGradient>

            <filter id="glowDrop" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#D4AF37" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Exterior Glow Halo */}
          <path
            d="M50 4 C50 4, 18 48, 18 70 C18 87.67, 32.33 100, 50 100 C67.67 100, 82 87.67, 82 70 C82 48, 50 4, 50 4 Z"
            fill="url(#oilDropGrad)"
            filter="url(#glowDrop)"
          />

          {/* Sleek Golden Interior Crest */}
          <path
            d="M50 14 C50 14, 26 50, 26 69 C26 83, 37 92, 50 92 C63 92, 74 83, 74 69 C74 50, 50 14, 50 14 Z"
            stroke="url(#goldSheen)"
            strokeWidth="2.5"
            strokeOpacity="0.85"
            fill="#080808"
          />

          {/* Central Bold 'O' Letter */}
          <circle
            cx="50"
            cy="68"
            r="16"
            stroke="url(#goldSheen)"
            strokeWidth="5.5"
            fill="none"
          />

          {/* Ghana Green Energy Core Sparkle */}
          <circle
            cx="50"
            cy="68"
            r="4.5"
            fill="#10B981"
          />

          {/* High-gloss Oil Light Reflection */}
          <path
            d="M40 28 C34 40, 31 54, 32 64"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.55"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 font-sans">
              OIL
            </span>
            <span className="text-neutral-400 font-light">|</span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-600">
              Instant Loan
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mt-0.5">
            Powered by Oskayi Consult
          </span>
        </div>
      )}
    </div>
  );
}
