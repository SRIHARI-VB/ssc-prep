import React from 'react'

const CoordinatePlane: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 170" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Grid lines (faint) */}
    {[40, 60, 80, 100, 120, 140, 160].map(x => (
      <line key={`gv${x}`} x1={x} y1="15" x2={x} y2="145" stroke="#e2e8f0" strokeWidth="0.5" />
    ))}
    {[25, 45, 65, 85, 105, 125, 145].map(y => (
      <line key={`gh${y}`} x1="20" y1={y} x2="180" y2={y} stroke="#e2e8f0" strokeWidth="0.5" />
    ))}
    {/* X axis */}
    <line x1="20" y1="85" x2="185" y2="85" stroke="#475569" strokeWidth="1.5" />
    <polygon points="185,85 178,82 178,88" fill="#475569" />
    <text x="190" y="88" fontSize="9" fontWeight="bold" fill="#475569">X</text>
    {/* Y axis */}
    <line x1="100" y1="150" x2="100" y2="10" stroke="#475569" strokeWidth="1.5" />
    <polygon points="100,10 97,17 103,17" fill="#475569" />
    <text x="104" y="12" fontSize="9" fontWeight="bold" fill="#475569">Y</text>
    {/* Origin label */}
    <text x="90" y="96" fontSize="8" fill="#475569">O</text>
    {/* Point A */}
    <circle cx="60" cy="45" r="4" fill="#2563eb" />
    <text x="42" y="42" fontSize="9" fontWeight="bold" fill="#2563eb">A(x₁,y₁)</text>
    {/* Point B */}
    <circle cx="160" cy="125" r="4" fill="#2563eb" />
    <text x="128" y="138" fontSize="9" fontWeight="bold" fill="#2563eb">B(x₂,y₂)</text>
    {/* Distance line */}
    <line x1="60" y1="45" x2="160" y2="125" stroke="#f59e0b" strokeWidth="2" />
    {/* Right triangle for distance visualization */}
    <line x1="60" y1="45" x2="160" y2="45" stroke="#475569" strokeWidth="1" strokeDasharray="4,3" />
    <line x1="160" y1="45" x2="160" y2="125" stroke="#475569" strokeWidth="1" strokeDasharray="4,3" />
    {/* Delta labels */}
    <text x="108" y="40" textAnchor="middle" fontSize="8" fill="#475569">x₂-x₁</text>
    <text x="168" y="88" fontSize="8" fill="#475569">y₂-y₁</text>
    {/* Formula */}
    <text x="100" y="164" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#475569">
      d = √[(x₂-x₁)² + (y₂-y₁)²]
    </text>
  </svg>
)

export default CoordinatePlane
