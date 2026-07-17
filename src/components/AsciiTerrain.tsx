import React, { useEffect, useRef } from 'react';

/**
 * Signature element: procedural ASCII mountain range on <canvas>.
 *  - 3 parallax ridge layers (value noise), slow drift
 *  - cursor acts like an equalizer: ridges rise under the mouse
 *  - light theme: ASCII sun · dark theme: ASCII moon + twinkling stars
 * Follows the html.dark class live. Pauses offscreen; static frame under
 * reduced motion.
 */

// Cell size drives cost: every cell below a ridge is one fillText per frame.
// Phones get a coarser grid — fewer draws, and the ASCII stays legible at the
// smaller canvas rather than turning to mush.
const DESKTOP_CELL = { w: 10, h: 15, font: '13px "JetBrains Mono", monospace' };
const MOBILE_CELL = { w: 14, h: 20, font: '17px "JetBrains Mono", monospace' };
const MOBILE_BP = 768;
const MOBILE_FPS = 30;
const DENSITY = ' .:-=+*#%@';

function makeNoise(seed: number) {
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  const grad = Array.from({ length: 256 }, rand);
  return (x: number) => {
    const xi = Math.floor(x);
    const i0 = ((xi % 256) + 256) % 256;
    const i1 = (i0 + 1) % 256;
    const t = x - xi;
    const f = t * t * (3 - 2 * t);
    return grad[i0] * (1 - f) + grad[i1] * f;
  };
}

const LAYERS = [
  { noise: makeNoise(1337), freq: 0.045, amp: 0.22, base: 0.52, speed: 0.09 },
  { noise: makeNoise(4242), freq: 0.07, amp: 0.26, base: 0.66, speed: 0.16 },
  { noise: makeNoise(9001), freq: 0.1, amp: 0.3, base: 0.82, speed: 0.26 },
];

const PALETTES = {
  light: {
    layers: ['rgba(20,20,18,0.20)', 'rgba(20,20,18,0.42)', 'rgba(20,20,18,0.78)'],
    orb: '#D63E00',
    pine: '#2F4A3B',
    star: '',
  },
  dark: {
    layers: ['rgba(232,230,225,0.16)', 'rgba(232,230,225,0.34)', 'rgba(232,230,225,0.62)'],
    orb: '#C9CFE8',
    pine: '#6FA57F',
    star: 'rgba(232,230,225,0.7)',
  },
};

// star field in grid fractions
const STARS = Array.from({ length: 70 }, (_, i) => ({
  x: ((i * 37) % 100) / 100,
  y: (((i * 53) % 60) / 100) * 0.75,
  phase: (i * 2.4) % Math.PI,
  ch: i % 5 === 0 ? '+' : '.',
}));

const AsciiTerrain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isDark = document.documentElement.classList.contains('dark');

    let cell = DESKTOP_CELL;
    // The canvas is transparent and sits behind the centered hero text. On wide
    // screens the orb lives far right, clear of the narrow text column; on a
    // phone the text spans full width, so the orb would collide with it. Mountains
    // still read fine at any width, so mobile keeps the ridges and drops the sky.
    let showSky = true;
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let running = false;
    let mouseX = -1;
    let mouseGoal = -1;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mobile = window.innerWidth < MOBILE_BP;
      showSky = !mobile;
      cell = mobile ? MOBILE_CELL : DESKTOP_CELL;
      cols = Math.ceil(width / cell.w);
      rows = Math.ceil(height / cell.h);
      ctx.font = cell.font;
      ctx.textBaseline = 'top';
    };

    const draw = (time: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      const pal = isDark ? PALETTES.dark : PALETTES.light;
      ctx.clearRect(0, 0, width, height);

      mouseX = mouseX < 0 ? mouseGoal : mouseX + (mouseGoal - mouseX) * 0.08;

      const orbCx = cols * 0.78;
      const orbCy = rows * 0.22;
      const orbR = Math.min(cols, rows) * 0.09;

      // The orb occupies a known box — scanning the whole grid for it wasted
      // cols*rows hypot calls per frame.
      const aspect = cell.w / cell.h;
      const boxX0 = Math.max(Math.floor(orbCx - orbR / aspect - 1), 0);
      const boxX1 = Math.min(Math.ceil(orbCx + (orbR * 1.6) / aspect + 1), cols);
      const boxY0 = Math.max(Math.floor(orbCy - orbR - 1), 0);
      const boxY1 = Math.min(Math.ceil(orbCy + orbR + 1), rows);

      if (showSky && isDark) {
        // stars first, twinkling
        ctx.fillStyle = pal.star;
        for (const s of STARS) {
          const tw = 0.35 + 0.65 * Math.abs(Math.sin(time * 0.7 + s.phase));
          ctx.globalAlpha = tw;
          ctx.fillText(s.ch, Math.floor(s.x * cols) * cell.w, Math.floor(s.y * rows) * cell.h);
        }
        ctx.globalAlpha = 1;
        // crescent moon: inside the disc but outside an offset disc
        ctx.fillStyle = pal.orb;
        for (let y = boxY0; y < boxY1; y++) {
          for (let x = boxX0; x < boxX1; x++) {
            const d = Math.hypot((x - orbCx) * aspect, y - orbCy);
            const d2 = Math.hypot((x - orbCx - orbR * 0.55) * aspect, y - orbCy + orbR * 0.2);
            if (d < orbR && d2 > orbR * 0.82) {
              ctx.fillText(d2 > orbR * 1.15 ? '@' : '*', x * cell.w, y * cell.h);
            }
          }
        }
      } else if (showSky) {
        // sun
        ctx.fillStyle = pal.orb;
        for (let y = boxY0; y < boxY1; y++) {
          for (let x = boxX0; x < boxX1; x++) {
            const d = Math.hypot((x - orbCx) * aspect, y - orbCy);
            if (d < orbR) ctx.fillText(d < orbR * 0.55 ? '@' : '*', x * cell.w, y * cell.h);
          }
        }
      }

      // ridges, back to front
      LAYERS.forEach((layer, li) => {
        ctx.fillStyle = pal.layers[li];
        for (let x = 0; x < cols; x++) {
          let n = layer.noise(x * layer.freq + time * layer.speed);
          if (mouseGoal >= 0) {
            const dist = (x - mouseX) / 7;
            n += 0.55 * Math.exp(-dist * dist) * (0.6 + 0.4 * Math.sin(time * 6 + x));
          }
          const ridgeY = Math.floor((layer.base - n * layer.amp) * rows);
          for (let y = Math.max(ridgeY, 0); y < rows; y++) {
            const depth = (y - ridgeY) / Math.max(rows - ridgeY, 1);
            const ch = DENSITY[Math.min(Math.floor(depth * 5) + 3, DENSITY.length - 1)];
            ctx.fillText(y === ridgeY ? '^' : ch, x * cell.w, y * cell.h);
          }
          if (li === 2 && ridgeY > 1 && x % 7 === 3) {
            ctx.fillStyle = pal.pine;
            ctx.fillText('Y', x * cell.w, (ridgeY - 1) * cell.h);
            ctx.fillStyle = pal.layers[li];
          }
        }
      });
    };

    let last = 0;

    const loop = (t: number) => {
      // Uncapped rAF on a phone burns battery for motion nobody can resolve at
      // this cell size. Desktop keeps the full frame rate.
      const minDelta = window.innerWidth < MOBILE_BP ? 1000 / MOBILE_FPS : 0;
      if (t - last >= minDelta) {
        last = t;
        draw(t / 1000);
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    start();

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseGoal = (e.clientX - r.left) / cell.w;
    };
    const onLeave = () => {
      mouseGoal = -1;
      mouseX = -1;
    };

    // While offscreen the loop is stopped, so nothing repaints on its own —
    // theme and size changes have to redraw the static frame themselves.
    const repaintIfStill = () => {
      if (!running) draw(0);
    };

    // follow theme toggles live
    const mo = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark');
      repaintIfStill();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      repaintIfStill();
    });
    ro.observe(canvas);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    return () => {
      stop();
      mo.disconnect();
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" aria-hidden="true" />;
};

export default AsciiTerrain;
