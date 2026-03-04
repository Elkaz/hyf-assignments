import React from 'react';

export const Planet = ({ 
  color = '#000000', 
}) => {
  return (
    <svg 
      width="25px" 
      height="25px" 
      viewBox="0 0 512 512" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>ionicons-v5-p</title>
      <path 
        d="M413.48,284.46c58.87,47.24,91.61,89,80.31,108.55-17.85,30.85-138.78-5.48-270.1-81.15S.37,149.84,18.21,119c11.16-19.28,62.58-12.32,131.64,14.09" 
        style={{ fill: 'none', stroke: color, strokeMiterlimit: 10, strokeWidth: 32 }}
      />
      <circle 
        cx="256" 
        cy="256" 
        r="160" 
        style={{ fill: 'none', stroke: color, strokeMiterlimit: 10, strokeWidth: 32 }}
      />
    </svg>
  );
};

