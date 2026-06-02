import React, { useState, useEffect } from 'react';

const TechScanner: React.FC = () => {
  const [frame, setFrame] = useState(0);
  const width = 40;
  const height = 15;

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const generateScanner = () => {
    let output = '';
    const scanLine = Math.floor((frame % height));

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (y === scanLine) {
          output += Math.random() > 0.5 ? '█' : '▒';
        } else if (Math.abs(y - scanLine) < 3) {
          output += Math.random() > 0.8 ? '░' : ' ';
        } else if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
          output += '+';
        } else {
          output += Math.random() > 0.98 ? '.' : ' ';
        }
      }
      output += '\n';
    }
    return output;
  };

  return (
    <div className="metallic-card p-4 bg-tech-black border-tech-steel/30 inline-block">
      <div className="text-tech-steel font-mono text-[10px] mb-2 flex justify-between">
        <span>[ SCANNING_SYSTEM_INTEGRITY ]</span>
        <span className="animate-pulse w-8 text-right">{frame}%</span>
      </div>
      <pre className="ascii-container text-tech-silver text-[8px] leading-none tracking-tighter">
        {generateScanner()}
      </pre>
      <div className="mt-2 h-1 bg-tech-gray overflow-hidden">
        <div 
          className="h-full bg-tech-silver transition-all duration-300" 
          style={{ width: `${frame}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TechScanner;