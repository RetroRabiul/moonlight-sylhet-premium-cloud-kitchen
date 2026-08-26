import React from 'react';
import logoImg from '../assets/images/nightfuel_logo_1787642575940.jpg';

interface NightFuelLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact' | 'symbol' | 'image';
  showSubtitle?: boolean;
}

export const NightFuelLogo: React.FC<NightFuelLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  showSubtitle = true,
}) => {
  // If variant is image, return the authentic brand logo image
  if (variant === 'image') {
    const sizeClasses = {
      sm: 'h-8 w-auto',
      md: 'h-11 w-auto',
      lg: 'h-16 w-auto',
      xl: 'h-24 w-auto',
    }[size];

    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <img
          src={logoImg}
          alt="MoonLight Premium Cloud Kitchen Logo"
          referrerPolicy="no-referrer"
          className={`${sizeClasses} object-contain rounded-lg shadow-md`}
        />
      </div>
    );
  }

  // Symbol only (Gold Fork + Steam Bowl Icon badge)
  if (variant === 'symbol') {
    const boxSize = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-14 h-14',
      xl: 'w-20 h-20',
    }[size];

    return (
      <div
        className={`${boxSize} rounded-xl bg-black border border-neutral-800 flex items-center justify-center overflow-hidden relative group p-1 ${className}`}
      >
        <img
          src={logoImg}
          alt="MoonLight Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    );
  }

  // Vector Brand Mark with stylized golden Fork 'I' and golden Steaming Bowl 'U'
  const fontSizes = {
    sm: { main: 'text-sm tracking-wider', sub: 'text-[7.5px]', forkW: 'w-2.5 h-4', bowlW: 'w-3 h-3.5' },
    md: { main: 'text-lg sm:text-xl tracking-wider', sub: 'text-[9px] tracking-[0.25em]', forkW: 'w-3 h-5', bowlW: 'w-4 h-4.5' },
    lg: { main: 'text-2xl sm:text-3xl tracking-widest', sub: 'text-[11px] tracking-[0.3em]', forkW: 'w-4 h-7', bowlW: 'w-5 h-6' },
    xl: { main: 'text-3xl sm:text-5xl tracking-widest', sub: 'text-sm tracking-[0.35em]', forkW: 'w-6 h-10', bowlW: 'w-8 h-8' },
  }[size];

  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      {/* Top brand line: N + [Gold Fork] + GHTF + [Gold Steam Bowl] + EL */}
      <div className={`flex items-center font-brand font-bold text-white ${fontSizes.main}`}>
        {/* N */}
        <span className="font-brand">N</span>

        {/* Golden Fork for letter 'I' */}
        <span className="inline-flex items-center justify-center px-0.5" title="Fork (I)">
          <svg
            viewBox="0 0 24 48"
            className={`${fontSizes.forkW} text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]`}
          >
            {/* 4 Prongs */}
            <path d="M 4 2 L 4 18 C 4 23 8 26 10 27 L 10 46 C 10 47 11 48 12 48 C 13 48 14 47 14 46 L 14 27 C 16 26 20 23 20 18 L 20 2 C 20 1 19 0 18 0 C 17 0 16 1 16 2 L 16 16 C 16 18 15 19 14 19 L 14 2 C 14 1 13 0 12 0 C 11 0 10 1 10 2 L 10 19 C 9 19 8 18 8 16 L 8 2 C 8 1 7 0 6 0 C 5 0 4 1 4 2 Z" />
          </svg>
        </span>

        {/* GHTF */}
        <span className="font-brand">GHTF</span>

        {/* Golden Steaming Bowl for letter 'U' */}
        <span className="inline-flex items-center justify-center px-0.5 relative" title="Steaming Bowl (U)">
          <svg
            viewBox="0 0 36 36"
            className={`${fontSizes.bowlW} text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]`}
          >
            {/* Steam curves */}
            <path
              d="M 12 2 C 10 6 14 9 12 13"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M 18 0 C 16 5 20 8 18 13"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M 24 2 C 22 6 26 9 24 13"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Rim */}
            <path d="M 4 16 L 32 16 C 33 16 34 17 34 18 C 34 19 33 20 32 20 L 4 20 C 3 20 2 19 2 18 C 2 17 3 16 4 16 Z" />
            {/* Semi-circular Bowl body */}
            <path d="M 5 20 C 5 29 11 35 18 35 C 25 35 31 29 31 20 Z" />
          </svg>
        </span>

        {/* EL */}
        <span className="font-brand">EL</span>
      </div>

      {/* Subtitle: PREMIUM CLOUD KITCHEN */}
      {showSubtitle && (
        <span
          className={`font-sans uppercase font-bold text-slate-200 text-center ${fontSizes.sub} -mt-0.5 tracking-[0.24em]`}
        >
          PREMIUM CLOUD KITCHEN
        </span>
      )}
    </div>
  );
};
