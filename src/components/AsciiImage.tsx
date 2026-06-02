import React, { useRef, useEffect, useState } from 'react';

interface AsciiImageProps {
  src: string;
  width?: number;
  height?: number;
}

const AsciiImage: React.FC<AsciiImageProps> = ({ src, width = 100, height = 100 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ascii, setAscii] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);

  const chars = '@%#*+=-:. ';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      const imageData = ctx.getImageData(0, 0, width, height).data;
      let asciiStr = '';

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          const idx = (i * width + j) * 4;
          const r = imageData[idx];
          const g = imageData[idx + 1];
          const b = imageData[idx + 2];
          const gray = (r + g + b) / 3;
          const charIdx = Math.floor((gray / 255) * (chars.length - 1));
          asciiStr += chars[charIdx];
        }
        asciiStr += '\n';
      }
      setAscii(asciiStr);
    };
  }, [src, width, height]);

  return (
    <div 
      className="relative cursor-crosshair group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Original Image */}
      <img 
        src={src} 
        alt="Unai Guerra"
        className={`w-full aspect-square object-cover transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
      />
      
      {/* ASCII Version */}
      <pre 
        className={`absolute inset-0 bg-tech-black text-tech-silver ascii-container text-[4px] leading-[1] overflow-hidden transition-opacity duration-500 pointer-events-none flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{ letterSpacing: '0' }}
      >
        {ascii}
      </pre>

      <div className="absolute inset-0 border border-tech-gray group-hover:border-tech-silver transition-colors pointer-events-none"></div>
    </div>
  );
};

export default AsciiImage;