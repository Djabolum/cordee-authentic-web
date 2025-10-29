// components/SplashLottie.tsx
'use client';
import Lottie from 'lottie-react';
import animationData from '@/public/splash.json';

export default function SplashLottie({ onDone }: { onDone?: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070f]"
      onClick={onDone}
    >
      <Lottie
        animationData={animationData}
        loop={false}
        autoplay
        onComplete={onDone}
        className="w-[600px] sm:w-[800px]"
      />
    </div>
  );
}
