import React from 'react';

const PaletteIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-4 4H7z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M17 17h.01M7 12a5 5 0 1110 0 5 5 0 01-10 0z" />
    </svg>
  );
};

export default PaletteIcon;
