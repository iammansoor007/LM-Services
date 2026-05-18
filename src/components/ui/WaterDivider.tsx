import React from 'react';

interface WaterDividerProps {
  color?: string;
  className?: string;
}

const WaterDivider: React.FC<WaterDividerProps> = ({ 
  color = "hsl(var(--background))", 
  className = "" 
}) => {
  return (
    <div className={`relative w-full overflow-hidden leading-none ${className}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-[60px] md:h-[100px]"
        fill={color}
      >
        <path
          d="M0,0 C150,110 350,0 500,100 C650,200 850,50 1000,100 C1150,150 1200,50 1200,100 L1200,120 L0,120 Z"
          opacity="0.3"
        />
        <path
          d="M0,0 C200,100 400,0 600,100 C800,200 1000,50 1200,100 L1200,120 L0,120 Z"
          opacity="0.5"
        />
        <path
          d="M0,0 C300,50 600,150 900,50 C1050,0 1200,100 1200,100 L1200,120 L0,120 Z"
        />
      </svg>
      
      {/* Dynamic Water Droplets */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/20 rounded-full blur-[2px] animate-pulse"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WaterDivider;
