import React, { useEffect, useRef, useState } from 'react';

/** Portrait that dissolves into live ASCII on hover, or on tap where there is
 *  no hover to give. */
interface Props {
  src: string;
  alt: string;
  hoverLabel: string;
  tapLabel: string;
}

const CHARS = '@%#*+=-:. ';
const W = 90;
const H = 90;

const AsciiPortrait: React.FC<Props> = ({ src, alt, hoverLabel, tapLabel }) => {
  const [ascii, setAscii] = useState('');
  const [hovered, setHovered] = useState(false);
  const [canHover, setCanHover] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Touch devices get a tap toggle and a label that tells the truth.
  useEffect(() => {
    const mq = matchMedia('(hover: hover)');
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!canvas || !ctx) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      canvas.width = W;
      canvas.height = H;
      ctx.drawImage(img, 0, 0, W, H);
      const data = ctx.getImageData(0, 0, W, H).data;
      let out = '';
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const i = (y * W + x) * 4;
          const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
          out += CHARS[Math.floor((gray / 255) * (CHARS.length - 1))];
        }
        out += '\n';
      }
      setAscii(out);
    };
  }, [src]);

  const label = canHover ? hoverLabel : tapLabel;
  const showAscii = hovered && Boolean(ascii);

  const hoverProps = canHover
    ? { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) }
    : {};

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={showAscii}
      className="relative w-full cursor-crosshair group aspect-square overflow-hidden border border-current/30 block"
      onClick={() => setHovered((v) => !v)}
      {...hoverProps}
    >
      <canvas ref={canvasRef} className="hidden" />
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${showAscii ? 'opacity-0' : 'opacity-100'}`}
      />
      <pre
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center overflow-hidden bg-night text-paper font-mono text-[5px] leading-[1] transition-opacity duration-500 pointer-events-none ${showAscii ? 'opacity-100' : 'opacity-0'}`}
      >
        {ascii}
      </pre>
      <span
        aria-hidden="true"
        className="absolute bottom-2 right-2 font-mono text-[9px] tracking-[0.15em] bg-ink text-paper px-2 py-1 opacity-70"
      >
        {label}
      </span>
    </button>
  );
};

export default AsciiPortrait;
