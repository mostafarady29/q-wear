'use client';

import React from 'react';
import Image from 'next/image';

interface QLogoProps {
  className?: string;
  size?: number;
  variant?: 'image' | 'svg' | 'both';
  withSubtitle?: boolean;
}

export default function QLogo({
  className = '',
  size = 36,
  variant = 'image',
  withSubtitle = false,
}: QLogoProps) {
  return (
    <div className={`inline-flex flex-col items-center group select-none ${className}`}>
      <div
        className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo-transparent.png"
          alt="Q Studio Wear Logo"
          width={size}
          height={size}
          className="w-full h-full object-contain filter brightness-110 drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]"
          priority
        />
      </div>

      {withSubtitle && (
        <span className="text-[9px] font-mono-spec tracking-[0.35em] text-zinc-400 uppercase mt-1">
          CLOTHING &amp; WEAR
        </span>
      )}
    </div>
  );
}
