import React, { useState, useEffect } from 'react';
import GlitchText from './GlitchText';

interface GimoPreloaderProps {
  onComplete?: () => void;
}

export const GimoPreloader: React.FC<GimoPreloaderProps> = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Show preloader for 2 seconds then fade out smoothly
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        onComplete?.();
      }, 400);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0c0e12] text-white transition-opacity duration-500 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Clean Floating Logo without border or background box */}
      <div className="flex items-center gap-4 group">
        
        {/* Exact Gimo Header Scanline Glitch Text */}
        <GlitchText
          speed={0.7}
          enableShadows={true}
          enableOnHover={false}
          className="text-5xl sm:text-6xl md:text-7xl"
        >
          Gimo
        </GlitchText>

        {/* Floating Tri-Color Stripes with Staggered Pulse Animation */}
        <div className="gimo-stripe-container">
          <div className="gimo-stripe gimo-stripe-red h-10 sm:h-12 w-3 animate-pulse shadow-[0_0_12px_rgba(240,100,93,0.6)]"></div>
          <div className="gimo-stripe gimo-stripe-green h-10 sm:h-12 w-3 animate-pulse delay-100 shadow-[0_0_12px_rgba(46,204,113,0.6)]"></div>
          <div className="gimo-stripe gimo-stripe-cyan h-10 sm:h-12 w-3 animate-pulse delay-200 shadow-[0_0_12px_rgba(0,176,255,0.6)]"></div>
        </div>

      </div>
    </div>
  );
};
