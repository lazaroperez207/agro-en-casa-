import React from 'react';

const TagIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 15h2v2H7z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h2a2 2 0 012 2v2M15 15h2v2h-2zM3 15h2v2H3zM3 7h2v2H3z" />
    </svg>
  );
};

export default TagIcon;
