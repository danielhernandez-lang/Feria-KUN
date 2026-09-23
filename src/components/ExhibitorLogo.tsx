import React, { useState, useEffect, useMemo } from 'react';
import { Exhibitor } from '../types';
import { EXHIBITOR_DEFAULT_LOGOS, EXHIBITOR_NAME_LOGOS } from '../data/exhibitorLogos';

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
 * - Direct static files from /logos/... and /Logo_CUN.svg
 * - Automatic mapping from standNumber or exhibitor name
 * - User uploaded base64 data URLs
 * - Graceful replacement of Google Drive links with the local logo file
 */
export function resolveLogoUrl(url?: string, standNumber?: string, name?: string): string | undefined {
  const normStand = (standNumber || '').trim().padStart(2, '0');
  const bareStand = (standNumber || '').trim().replace(/^0+/, '');
  const normName = (name || '').trim().toLowerCase();

  const defaultMapped =
    (normStand ? EXHIBITOR_DEFAULT_LOGOS[normStand] : undefined) ||
    (bareStand ? EXHIBITOR_DEFAULT_LOGOS[bareStand] : undefined) ||
    (normName ? EXHIBITOR_NAME_LOGOS[normName] : undefined);

  if (!url || !url.trim()) {
    return defaultMapped;
  }

  const trimmed = url.trim();

  // If it's a data URL uploaded by admin
  if (trimmed.startsWith('data:image/')) {
    return trimmed;
  }

  // If it is a Google Drive link, always use our reliable local logo file
  const isDrive = trimmed.includes('drive.google.com') || trimmed.includes('googleusercontent.com');
  if (isDrive) {
    return defaultMapped || trimmed;
  }

  // If it's a bare filename without path
  if (/^([a-zA-Z0-9_\-\.\s]+)\.(jpg|jpeg|png|svg|webp)$/i.test(trimmed) && !trimmed.startsWith('/')) {
    return `/logos/${trimmed}`;
  }

  // If it's already an absolute or relative path
  if (trimmed.startsWith('/') || trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  return defaultMapped || trimmed;
}

export const ExhibitorLogo: React.FC<ExhibitorLogoProps> = ({
  exhibitor,
  size = 'md',
  className = '',
  showStandNumber = false,
}) => {
  const normStand = (exhibitor.standNumber || '').trim().padStart(2, '0');
  const bareStand = (exhibitor.standNumber || '').trim().replace(/^0+/, '');
  const normName = (exhibitor.name || '').trim().toLowerCase();
  const defaultMapped =
    (normStand ? EXHIBITOR_DEFAULT_LOGOS[normStand] : undefined) ||
    (bareStand ? EXHIBITOR_DEFAULT_LOGOS[bareStand] : undefined) ||
    (normName ? EXHIBITOR_NAME_LOGOS[normName] : undefined);

  const effectiveLogoUrl = useMemo(() => {
    return resolveLogoUrl(exhibitor.logoUrl, exhibitor.standNumber, exhibitor.name);
  }, [exhibitor.logoUrl, exhibitor.standNumber, exhibitor.name]);

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
          className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md text-[9px] font-black text-white shadow-xs border border-white/60 leading-none"
          style={{ backgroundColor: categoryColor }}
        >
          {exhibitor.standNumber}
        </span>
      )}
    </div>
  );
};
