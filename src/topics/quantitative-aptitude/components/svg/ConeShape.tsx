import React from 'react'

const ConeShape: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 170" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Cone body (triangle) */}
    <polygon
      points="100,20 50,130 150,130"
      fill="#dbeafe"
      stroke="#2563eb"
      strokeWidth="2"
    />
    {/* Base ellipse front */}
    <path d="M 50,130 A 50,15 0 0,0 150,130" fill="none" stroke="#2563eb" strokeWidth="2" />
    {/* Base ellipse back (dashed) */}
    <path d="M 50,130 A 50,15 0 0,1 150,130" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="4,3" />
    {/* Height (dashed) */}
    <line x1="100" y1="20" x2="100" y2="130" stroke="#475569" strokeWidth="1.5" strokeDasharray="5,3" />
    <text x="104" y="80" fontSize="10" fontWeight="bold" fill="#475569">h</text>
    {/* Radius */}
    <line x1="100" y1="130" x2="150" y2="130" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="125" y="143" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f59e0b">r</text>
    {/* Slant height */}
    <text x="138" y="72" fontSize="10" fontWeight="bold" fill="#2563eb"
      transform="rotate(66, 138, 72)">l</text>
    {/* Apex dot */}
    <circle cx="100" cy="20" r="2" fill="#2563eb" />
    {/* Formulas */}
    <text x="100" y="158" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#475569">
      V=⅓πr²h  CSA=πrl  l=√(r²+h²)
    </text>
  </svg>
)

export default ConeShape
