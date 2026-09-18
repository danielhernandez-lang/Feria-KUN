import React from 'react';
import cunLogoUrl from '../assets/Logo_CUN.svg';

interface CunLogoProps {
  className?: string;
  variant?: 'full' | 'icon';
}

export const CunLogo: React.FC<CunLogoProps> = ({ className = 'h-10 w-auto' }) => {
  return (
    <img
      src={cunLogoUrl}
      alt="CUN - Corporación Unificada Nacional de Educación Superior"
      className={`object-contain select-none ${className}`}
      loading="eager"
      decoding="async"
    />
  );
};
