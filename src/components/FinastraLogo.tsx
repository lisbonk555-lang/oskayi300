import React from 'react';

interface FinastraLogoProps {
  className?: string;
  variant?: 'full' | 'badge' | 'icon';
}

export const FinastraLogo: React.FC<FinastraLogoProps> = ({ 
  className = "h-5", 
  variant = 'full' 
}) => {
  if (variant === 'icon') {
    return (
      <svg 
        className={className} 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Finastra Icon"
      >
        <rect width="40" height="40" rx="10" fill="url(#finastra_grad_icon)" />
        {/* Modern geometric overlapping triangles representing Finastra's multi-layered fintech fusion */}
        <path d="M12 12L28 12L20 28Z" fill="white" fillOpacity="0.95" />
        <path d="M20 16L28 28L12 28Z" fill="#C084FC" fillOpacity="0.85" />
        <circle cx="20" cy="20" r="3" fill="#F59E0B" />
        <defs>
          <linearGradient id="finastra_grad_icon" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6B21A8" />
            <stop offset="0.5" stopColor="#7C3AED" />
            <stop offset="1" stopColor="#4C1D95" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-200 shadow-md ${className}`}>
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="8" fill="#7C3AED" />
          <path d="M12 12L28 12L20 28Z" fill="white" />
          <path d="M20 16L28 28L12 28Z" fill="#E9D5FF" />
        </svg>
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <span className="font-extrabold tracking-wider text-white">FINASTRA</span>
          <span className="text-purple-300 font-bold">FUSION</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="url(#finastra_grad_full)" />
        <path d="M12 12L28 12L20 28Z" fill="white" fillOpacity="0.95" />
        <path d="M20 16L28 28L12 28Z" fill="#C084FC" fillOpacity="0.85" />
        <circle cx="20" cy="20" r="2.5" fill="#F59E0B" />
        <defs>
          <linearGradient id="finastra_grad_full" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#581C87" />
            <stop offset="0.5" stopColor="#7C3AED" />
            <stop offset="1" stopColor="#9333EA" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex flex-col">
        <div className="flex items-center gap-1 leading-none">
          <span className="font-sans font-black text-sm tracking-wider text-white">FINASTRA</span>
          <span className="text-[10px] px-1 py-0.2 bg-purple-500/30 border border-purple-400/40 text-purple-200 rounded font-mono font-bold">
            FUSION
          </span>
        </div>
        <span className="text-[9px] font-mono text-purple-300 tracking-tight leading-tight">
          The OS of Global Finance
        </span>
      </div>
    </div>
  );
};
