import React from 'react'

const RightTriangle: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 160" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Triangle */}
    <polygon
      points="30,140 170,140 170,30"
      fill="#dbeafe"
      stroke="#2563eb"
      strokeWidth="2"
    />
    {/* Right-angle square mark at bottom-right */}
    <polyline
      points="155,140 155,125 170,125"
      fill="none"
      stroke="#475569"
      strokeWidth="1.5"
    />
    {/* Side labels */}
    {/* Base - B */}
    <text x="100" y="156" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2563eb">
      B = 4
    </text>
    {/* Perpendicular - P */}
    <text x="183" y="88" textAnchor="start" fontSize="12" fontWeight="bold" fill="#2563eb">
      P = 3
    </text>
    {/* Hypotenuse - H */}
    <text x="85" y="78" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2563eb"
      transform="rotate(-38, 85, 78)">
      H = 5
    </text>
    {/* Pythagorean formula */}
    <text x="100" y="14" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">
      H² = P² + B²
    </text>
    {/* Triplet note */}
    <text x="100" y="28" textAnchor="middle" fontSize="9" fill="#f59e0b">
      Triplet: (3, 4, 5)
    </text>
  </svg>
)

export default RightTriangle
