import React from 'react'

const CircleSector: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 170" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Full circle outline */}
    <circle cx="100" cy="90" r="60" fill="none" stroke="#2563eb" strokeWidth="1.5" />
    {/* Sector highlight (0 to ~60 degrees) */}
    <path
      d="M 100,90 L 160,90 A 60,60 0 0,0 130,38 Z"
      fill="#dbeafe"
      stroke="#2563eb"
      strokeWidth="2"
    />
    {/* Arc highlight */}
    <path
      d="M 160,90 A 60,60 0 0,0 130,38"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="3"
    />
    {/* Center dot */}
    <circle cx="100" cy="90" r="2.5" fill="#2563eb" />
    <text x="90" y="88" fontSize="9" fontWeight="bold" fill="#2563eb">O</text>
    {/* Angle arc */}
    <path
      d="M 118,90 A 18,18 0 0,0 109,72"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="1.5"
    />
    <text x="116" y="78" fontSize="10" fontWeight="bold" fill="#f59e0b">θ</text>
    {/* Radius labels */}
    <text x="132" y="100" fontSize="10" fontWeight="bold" fill="#2563eb">r</text>
    {/* Arc label */}
    <text x="152" y="56" fontSize="9" fontWeight="bold" fill="#f59e0b">arc</text>
    {/* Formulas */}
    <text x="100" y="165" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#475569">
      Sector = (θ/360)πr²   Arc = (θ/360)2πr
    </text>
  </svg>
)

export default CircleSector
