"use client";

import React, { useEffect, useState, useRef } from 'react';
import Lottie from 'lottie-react';

type Props = {
  resonance?: number;
  onDone?: () => void;
  /** Optionally pass raw animation JSON; otherwise use `src` to fetch JSON */
  animationData?: any;
  src?: string;
  loop?: boolean;
};

export default function SplashLottie({ resonance = 432, onDone, animationData, src, loop = false }: Props) {
  const [data, setData] = useState<any | null>(animationData ?? null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    let abort = false;
    if (!data && src) {
      fetch(src)
        .then((r) => r.json())
        .then((json) => {
          if (!abort && mounted.current) setData(json);
        })
        .catch(() => {
          /* ignore fetch error; fallback handled below */
        });
    }
    const t = window.setTimeout(() => onDone && onDone(), 3600);
    return () => {
      abort = true;
      mounted.current = false;
      clearTimeout(t);
    };
  }, [src, data, onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070f]">
      {data ? (
        <div style={{ width: 420, maxWidth: '90%' }} aria-hidden>
          <Lottie animationData={data} loop={loop} />
        </div>
      ) : (
        // Minimal fallback while animation is loading or missing
        <div className="text-white text-center">
          <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto mb-4">
            <circle cx="60" cy="60" r="40" stroke="#FFD76A" strokeWidth="6" fill="none" strokeOpacity="0.25" />
            <circle cx="60" cy="60" r="26" stroke="#FFD76A" strokeWidth="4" fill="none" strokeOpacity="0.9" />
          </svg>
          <div>Chargement…</div>
        </div>
      )}
    </div>
  );
}

