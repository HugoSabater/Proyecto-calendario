
import React from 'react';

export const SparklesIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M19 3v4M17 5h4M12 21v-4M10 19h4M5 12H1M3 12h4m11 0h4m-4 0h-4M9 12l2-2 2 2m-4 4l2 2 2-2" />
    </svg>
);
