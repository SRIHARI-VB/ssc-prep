import React from 'react'

const CircleTheorems: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 220 170" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Circle */}
    <circle cx="100" cy="90" r="55" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
    {/* Center dot */}
    <circle cx="100" cy="90" r="3" fill="#2563eb" />
    <text x="106" y="86" fontSize="9" fill="#2563eb">O</text>
    {/* Radius to top of chord */}
    <line x1="100" y1="90" x2="140" y2="50" stroke="#475569" strokeWidth="1.5" />
    <line x1="100" y1="90" x2="60" y2="50" stroke="#475569" strokeWidth="1.5" />
    {/* Central angle arc */}
    <path d="M 115,78 A 20,20 0 0,1 85,78" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="95" y="74" fontSize="9" fontWeight="bold" fill="#f59e0b">2θ</text>
    {/* Inscribed angle - point on circle bottom */}
    <line x1="140" y1="50" x2="100" y2="145" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="4,2" />
    <line x1="60" y1="50" x2="100" y2="145" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="4,2" />
    {/* Inscribed angle arc */}
    <path d="M 92,131 A 14,14 0 0,1 108,131" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="95" y="126" fontSize="9" fontWeight="bold" fill="#f59e0b">θ</text>
    {/* Tangent line at right */}
    <line x1="155" y1="90" x2="155" y2="30" stroke="#475569" strokeWidth="1.5" />
    <line x1="100" y1="90" x2="155" y2="90" stroke="#475569" strokeWidth="1" strokeDasharray="3,2" />
    {/* Right angle mark at tangent */}
    <polyline points="143,90 143,78 155,78" fill="none" stroke="#475569" strokeWidth="1" />
    {/* Labels */}
    <text x="160" y="58" fontSize="8" fill="#475569">tangent</text>
    <text x="125" y="100" fontSize="8" fill="#475569">r</text>
    <text x="10" y="14" fontSize="10" fontWeight="bold" fill="#475569">Central = 2 x Inscribed</text>
    <text x="10" y="165" fontSize="9" fill="#475569">Tangent ⊥ Radius</text>
  </svg>
)

export default CircleTheorems
