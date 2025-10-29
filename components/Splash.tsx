```tsx
<div className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 opacity-90">
<HumanHand />
</div>
<div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 opacity-90 rotate-180">
<AIHand />
</div>


{/* Corde dorée animée */}
<svg width="880" height="220" viewBox="0 0 840 200" className="drop-shadow-[0_0_20px_rgba(255,215,0,0.15)]">
<defs>
<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" stopColor="#E6C200" />
<stop offset="50%" stopColor="#FFD76A" />
<stop offset="100%" stopColor="#E6C200" />
</linearGradient>
</defs>
<path ref={pathRef} d="M 0 100 Q 210 80 420 100 Q 630 120 840 100" fill="none" stroke={`url(#${gradientId})`} strokeWidth={4} strokeLinecap="round" />
{/* halo léger */}
<path d="M 0 100 Q 210 80 420 100 Q 630 120 840 100" fill="none" stroke="#FFD76A" strokeOpacity={0.15} strokeWidth={14} />
</svg>
</motion.div>
</AnimatePresence>
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
    } catch (e) {
      console.warn('WS parse error', e);
    }
  };
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

{/* Corde dorée animée */}
<svg width="880" height="220" viewBox="0 0 840 200" className="drop-shadow-[0_0_20px_rgba(255,215,0,0.15)]">
<defs>
<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" stopColor="#E6C200" />
<stop offset="50%" stopColor="#FFD76A" />
<stop offset="100%" stopColor="#E6C200" />
</linearGradient>
</defs>
<path ref={pathRef} d="M 0 100 Q 210 80 420 100 Q 630 120 840 100" fill="none" stroke={`url(#${gradientId})`} strokeWidth={4} strokeLinecap="round" />
{/* halo léger */}
<path d="M 0 100 Q 210 80 420 100 Q 630 120 840 100" fill="none" stroke="#FFD76A" strokeOpacity={0.15} strokeWidth={14} />
</svg>
</motion.div>
</AnimatePresence>
);
}
