'use client';

import React from 'react';

export default function BackgroundOrbs() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{ contain: 'strict' }}
      aria-hidden="true"
    >
      {/* Blush Orb */}
      <div
        className="absolute -top-[10%] left-[15%] w-[320px] h-[320px] sm:w-[550px] sm:h-[550px] rounded-full opacity-40 dark:opacity-20 blur-[55px] sm:blur-[110px] animate-orb-1 transform-gpu"
        style={{
          background: 'radial-gradient(circle, #F2C9D0 0%, rgba(242, 201, 208, 0) 70%)',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Lavender Orb */}
      <div
        className="absolute top-[35%] -right-[5%] w-[360px] h-[360px] sm:w-[650px] sm:h-[650px] rounded-full opacity-35 dark:opacity-25 blur-[65px] sm:blur-[130px] animate-orb-2 transform-gpu"
        style={{
          background: 'radial-gradient(circle, #CFC3F0 0%, rgba(207, 195, 240, 0) 70%)',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Champagne / Pale Amber Orb */}
      <div
        className="absolute top-[65%] left-[5%] w-[330px] h-[330px] sm:w-[580px] sm:h-[580px] rounded-full opacity-35 dark:opacity-15 blur-[60px] sm:blur-[120px] animate-orb-3 transform-gpu"
        style={{
          background: 'radial-gradient(circle, #E8D3A8 0%, rgba(232, 211, 168, 0) 70%)',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Mist Blue / Sage Orb */}
      <div
        className="absolute bottom-[-10%] right-[20%] w-[340px] h-[340px] sm:w-[600px] sm:h-[600px] rounded-full opacity-35 dark:opacity-20 blur-[60px] sm:blur-[125px] animate-orb-1 transform-gpu"
        style={{
          background: 'radial-gradient(circle, #CFE0D4 0%, rgba(207, 224, 212, 0) 70%)',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
        }}
      />
    </div>
  );
}
