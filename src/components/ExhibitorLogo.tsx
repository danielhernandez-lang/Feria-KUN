import React, { useState, useEffect, useMemo } from 'react';
import { Exhibitor } from '../types';
import { EXHIBITOR_DEFAULT_LOGOS } from '../data/exhibitorLogos';

interface ExhibitorLogoProps {
  exhibitor: Partial<Exhibitor> & {
    name?: string;
    standNumber: string;
    categoryColor?: string;
    badgeBg?: string;
    logoUrl?: string;
  };
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showStandNumber?: boolean;
}

const SIZE_MAP = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-11 h-11 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
  '2xl': 'w-24 h-24 text-2xl',
};

/**
 * Resolves logo URLs supporting:
 * - Embedded high-fidelity base64 data URLs (instant, zero network latency)
 * - Local static paths (/logos/...)
 * - Direct filenames
 * - Google Drive links (prefers official embedded logo, falls back to direct lh3 URL)
 * - Default stand mapping fallback
 */
export function resolveLogoUrl(url?: string, standNumber?: string): string | undefined {
  const normStand = (standNumber || '').trim().padStart(2, '0');
  const defaultMapped = normStand
    ? EXHIBITOR_DEFAULT_LOGOS[normStand] || EXHIBITOR_DEFAULT_LOGOS[standNumber?.replace(/^0+/, '') || '']
    : undefined;

  if (!url || !url.trim()) {
    return defaultMapped;
  }

  const trimmed = url.trim();

  // If it's already a Data URL
  if (trimmed.startsWith('data:image/')) {
    return trimmed;
  }

  // If it is a Google Drive link, prefer our high-fidelity embedded logo if available
  const driveMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/id=([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    if (defaultMapped) {
      return defaultMapped;
    }
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
  }

  // If it's a bare filename or relative path
  if (/^([a-zA-Z0-9_\-\.\s]+)\.(jpg|jpeg|png|svg|webp)$/i.test(trimmed) && !trimmed.startsWith('/')) {
    if (defaultMapped) return defaultMapped;
    return `/logos/${trimmed}`;
  }

  return trimmed || defaultMapped;
}

export const ExhibitorLogo: React.FC<ExhibitorLogoProps> = ({
  exhibitor,
  size = 'md',
  className = '',
  showStandNumber = false,
}) => {
  const normStand = (exhibitor.standNumber || '').trim().padStart(2, '0');
  const defaultMapped = EXHIBITOR_DEFAULT_LOGOS[normStand] || EXHIBITOR_DEFAULT_LOGOS[exhibitor.standNumber?.replace(/^0+/, '') || ''];

  const effectiveLogoUrl = useMemo(() => {
    return resolveLogoUrl(exhibitor.logoUrl, exhibitor.standNumber);
  }, [exhibitor.logoUrl, exhibitor.standNumber]);

  const [currentSrc, setCurrentSrc] = useState<string | undefined>(effectiveLogoUrl);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(effectiveLogoUrl);
    setHasError(false);
  }, [effectiveLogoUrl]);

  const handleImageError = () => {
    if (currentSrc !== defaultMapped && defaultMapped) {
      setCurrentSrc(defaultMapped);
    } else {
      setHasError(true);
    }
  };

  // Generate 2-letter initials from company name or stand number
  const name = exhibitor.name || '';
  const initials =
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || '')
      .join('') || exhibitor.standNumber;

  const sizeClasses = SIZE_MAP[size] || SIZE_MAP.md;
  const categoryColor = exhibitor.categoryColor || '#3b82f6';

  return (
    <div className={`relative shrink-0 ${className}`}>
      <div
        className={`${sizeClasses} rounded-2xl flex items-center justify-center font-extrabold shadow-sm border border-slate-200/90 overflow-hidden bg-white transition-transform`}
        style={{
          boxShadow: '0 2px 8px -2px rgba(0,0,0,0.08)',
        }}
      >
        {currentSrc && !hasError ? (
          <img
            src={currentSrc}
            alt={name ? `Logo de ${name}` : `Stand ${exhibitor.standNumber}`}
            className="w-full h-full object-contain p-1"
            onError={handleImageError}
            loading="eager"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center font-black tracking-tight text-white select-none"
            style={{
              background: `linear-gradient(135deg, ${categoryColor} 0%, #1e293b 100%)`,
            }}
          >
            <span>{initials}</span>
          </div>
        )}
      </div>

      {showStandNumber && (
        <span
          className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-md text-[10px] font-black shadow-xs border border-white text-white"
          style={{ backgroundColor: categoryColor }}
        >
          {exhibitor.standNumber}
        </span>
      )}
    </div>
  );
};
