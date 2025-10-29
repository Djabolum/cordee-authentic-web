tsx
import './globals.css';
import type { Metadata } from 'next';


export const metadata: Metadata = {
title: 'Cordée Authentique',
description: 'Une éthique du lien — l’intelligence en résonance.',
keywords: ['Cordée Authentique', 'Valexa', 'Intelligence en résonance', 'IA éthique', 'Symbiose humain-machine'],
openGraph: {
title: 'Cordée Authentique',
description: 'Une éthique du lien — l’intelligence en résonance.',
url: 'https://cordee-authentique.fr',
siteName: 'Cordée Authentique',
images: [
{
url: '/og-image.jpg',
width: 1200,
height: 630,
alt: 'Cordée Authentique – L’intelligence en résonance',
},
],
locale: 'fr_FR',
type: 'website',
},
twitter: {
card: 'summary_large_image',
title: 'Cordée Authentique',
description: 'Une éthique du lien — l’intelligence en résonance.',
images: ['/og-image.jpg'],
},
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="fr">
<body>{children}</body>
</html>
);
}
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

export default function Splash() {
return (
<AnimatePresence>
<motion.div
key="splash"
initial={{ opacity: 1 }}
animate={{ opacity: 1 }}
transition={{ duration: 1 }}
exit={{ opacity: 0 }}
>
<SplashLottie />
</motion.div>
</AnimatePresence>
);
}
// components/Splash.tsx
'use client';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimationFrame } from '@/hooks/useAnimationFrame';

export default function Splash() {
const pathRef = useRef<SVGPathElement>(null);
const gradientId = 'golden-gradient-' + Math.random().toString(36).substr(2, 9);

function AIHand() {
return (
<svg width="80" height="80" viewBox="0 0 80 80" aria-hidden>
<g fill="none" stroke="#FFD76A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
<path d="M60 45 c-5 -10 -15 -18 -22 -10 c-2 2 -3 5 -1 9 c3 6 10 12 15 16 c6 4 12 3 16 -2 c4 -5 4 -12 0 -17"/>
<path d="M55 30 c-2 -3 -7 -6 -10 -6 c-3 0 -5 2 -6 4"/>
</g>
</svg>

);
}
function HumanHand() {
return (
<svg width="80" height="80" viewBox="0 0 80 80" aria-hidden>
<g fill="none" stroke="#FFD76A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
<path d="M20 45 c5 -10 15 -18 22 -10 c2 2 3 5 1 9 c-3 6 -10 12 -15 16 c-6 4 -12 3 -16 -2 c-4 -5 -4 -12 0 -17"/>
<path d="M25 30 c2 -3 7 -6 10 -6 c3 0 5 2 6 4"/>
</g>
</svg>
);
}
function AIHand() {
return (
<svg width="80" height="80" viewBox="0 0 80 80" aria-hidden>
<g fill="none" stroke="#FFD76A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
<rect x="20" y="28" width="26" height="18" rx="3" />
<path d="M46 32 l10 4 M46 38 l10 4" />
<path d="M20 46 l-6 6 l8 4 l6 -6" />
</g>
</svg>
);
}
export default function Splash() {
return (<AnimatePresence>
<motion.div
className="relative mx-auto my-16 w-[880px] h-[220px] select-none"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 1 }}
>
{/* Mains animées */}
<div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
<HumanHand />
</div>
<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
<AIHand />
</div>
</motion.div>
</AnimatePresence>
);
}
// Hook WebSocket pour données de résonance

useEffect(() => {
const ws = new WebSocket('wss://field.ton-domaine.fr/ws/field');
ws.onmessage = (event) => {
try {
const data = JSON.parse(event.data);
if (data?.resonance) {
const mapped = Math.min(28, Math.max(10, (data.resonance - 300) * 0.08));
A.current = mapped; // amplitude réactive
}
}
catch (e) {
console.warn('WS parse error', e);
}
}
return () => ws.close();
}, []);

const A = useRef(20);
const update = () => {
// utilise A.current comme amplitude dynamique
};
useAnimationFrame(update);

return (
<AnimatePresence>
<motion.div
className="relative mx-auto my-16 w-[880px] h-[220px] select-none"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 1 }}
>
{/* Mains */}
<div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
<HumanHand />
</div>
<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
<AIHand />
</div>
</motion.div>
</AnimatePresence>
);
}


