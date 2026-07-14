import React, { useEffect, useRef, useState } from 'react';

/**
 * Hidden easter egg: konami code → pixel cake rain + one secret toast.
 * Nothing here shows on the surface until someone types the code.
 */
interface Props {
  konamiMessage: string;
}

interface Cake {
  id: number;
  x: number;
  delay: number;
  dur: number;
}

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

const PixelCake: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 14 14" style={{ imageRendering: 'pixelated' }} aria-hidden="true">
    <rect x="1" y="4" width="12" height="3" fill="#F4F1EA" />
    <rect x="3" y="4" width="1" height="1" fill="#FF4D9D" />
    <rect x="7" y="5" width="1" height="1" fill="#FF4D9D" />
    <rect x="10" y="4" width="1" height="1" fill="#FF4D9D" />
    <rect x="1" y="7" width="12" height="4" fill="#C68642" />
    <rect x="1" y="9" width="12" height="1" fill="#8B5A2B" />
  </svg>
);

const GameSystems: React.FC<Props> = ({ konamiMessage }) => {
  const [toast, setToast] = useState(false);
  const [cakes, setCakes] = useState<Cake[]>([]);
  const nextId = useRef(1);

  useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      pos = e.code === KONAMI[pos] ? pos + 1 : e.code === KONAMI[0] ? 1 : 0;
      if (pos === KONAMI.length) {
        pos = 0;
        setToast(true);
        setTimeout(() => setToast(false), 5000);
        setCakes(
          Array.from({ length: 36 }, () => ({
            id: nextId.current++,
            x: Math.random() * 96,
            delay: Math.random() * 1.2,
            dur: 2.2 + Math.random() * 2,
          }))
        );
        setTimeout(() => setCakes([]), 6500);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div aria-live="polite" className="fixed top-16 right-4 z-[80] max-w-[300px]">
        {toast && (
          <div className="toast-in bg-night text-paper border-2 border-[#FF5A1F] p-4 shadow-2xl">
            <span className="font-pixel text-[9px] leading-relaxed block">🏆 {konamiMessage}</span>
          </div>
        )}
      </div>

      {cakes.length > 0 && (
        <div className="fixed inset-0 z-[70] pointer-events-none overflow-hidden" aria-hidden="true">
          {cakes.map((c) => (
            <div
              key={c.id}
              className="cake-fall absolute -top-8"
              style={{ left: `${c.x}%`, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}
            >
              <PixelCake />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default GameSystems;
