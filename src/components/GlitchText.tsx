import React from 'react';

interface GlitchTextProps {
  children: React.ReactNode;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  speed = 0.8,
  enableShadows = true,
  enableOnHover = false,
  className = '',
}) => {
  const inlineStyle = {
    '--glitch-speed': `${speed}s`,
  } as React.CSSProperties;

  return (
    <div
      style={inlineStyle}
      className={`relative inline-block select-none ${
        enableOnHover ? 'group cursor-pointer' : ''
      } ${className}`}
    >
      {/* Base Text with Gimo Header Scanline Styling */}
      <span className="relative z-10 block gimo-scanline-text font-extrabold tracking-tighter">
        {children}
      </span>

      {/* Glitch Overlay 1 (Red Shift) */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 z-0 text-[#f0645d] pointer-events-none opacity-70 font-extrabold tracking-tighter ${
          enableOnHover
            ? 'hidden group-hover:block animate-glitch-1'
            : 'animate-glitch-1'
        } ${enableShadows ? 'drop-shadow-[2px_0_0_rgba(240,100,93,0.8)]' : ''}`}
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}
      >
        {children}
      </span>

      {/* Glitch Overlay 2 (Cyan Shift) */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 z-0 text-[#00B0FF] pointer-events-none opacity-70 font-extrabold tracking-tighter ${
          enableOnHover
            ? 'hidden group-hover:block animate-glitch-2'
            : 'animate-glitch-2'
        } ${enableShadows ? 'drop-shadow-[-2px_0_0_rgba(0,176,255,0.8)]' : ''}`}
        style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}
      >
        {children}
      </span>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes glitch-anim-1 {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        @keyframes glitch-anim-2 {
          0% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
          100% { transform: translate(0); }
        }

        .animate-glitch-1 {
          animation: glitch-anim-1 var(--glitch-speed, 0.8s) infinite linear alternate-reverse;
        }

        .animate-glitch-2 {
          animation: glitch-anim-2 var(--glitch-speed, 0.8s) infinite linear alternate-reverse;
        }
      `}</style>
    </div>
  );
};

export default GlitchText;
