import React, { useState, useEffect } from 'react';

const asciiFrames = [
`
 ██╗   ██╗███╗   ██╗ █████╗ ██╗
 ██║   ██║████╗  ██║██╔══██╗██║
 ██║   ██║██╔██╗ ██║███████║██║
 ██║   ██║██║╚██╗██║██╔══██║██║
 ╚██████╔╝██║ ╚████║██║  ██║██║
  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝
`,
`
 ▒█╗   ██╗▒█▒╗   ██╗ ▒███▒╗ ██╗
 ██║   █▒║██▒█╗  ██║██╔══▒█╗██║
 █▒║   ██║██╔▒█╗ ██║██▒███▒║██║
 ██║   ▒█║██║╚▒█╗██║██╔══██║█▒║
 ╚▒█████╔╝██║ ╚▒███║██║  ▒█║██║
  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝
`,
`
 ██╗   ██╗███╗   ██╗ █████╗ ██╗
 ██║   ██║████╗  ██║██╔══██╗██║
 ██║   ██║██╔██╗ ██║███████║██║
 ██║   ██║██║╚██╗██║██╔══██║██║
 ╚██████╔╝██║ ╚████║██║  ██║██║
  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝
`
];

const AnimatedTitle: React.FC = () => {
  const [frame, setFrame] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
        setFrame((f) => (f + 1) % asciiFrames.length);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <pre className={`ascii-container text-[min(3.5vw,22px)] leading-[1.1] mb-8 transition-all duration-75 ${isGlitching ? 'text-white translate-x-1' : 'text-tech-silver'}`}>
      {asciiFrames[isGlitching ? 1 : 0]}
    </pre>
  );
};

export default AnimatedTitle;