import React from 'react'

const MedianAltitude: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 220 160" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Triangle */}
    <polygon
      points="30,140 190,140 120,25"
      fill="#dbeafe"
      stroke="#2563eb"
      strokeWidth="2"
    />
    {/* Median (solid) from A to midpoint M of BC */}
    <line x1="120" y1="25" x2="110" y2="140" stroke="#f59e0b" strokeWidth="2" />
    {/* Midpoint M tick marks on BC */}
    <line x1="68" y1="136" x2="72" y2="144" stroke="#475569" strokeWidth="1.5" />
    <line x1="148" y1="136" x2="152" y2="144" stroke="#475569" strokeWidth="1.5" />
    {/* Altitude (dashed) from A perpendicular to BC */}
    <line x1="120" y1="25" x2="120" y2="140" stroke="#475569" strokeWidth="1.5" strokeDasharray="5,3" />
    {/* Right angle mark at foot of altitude */}
    <polyline points="110,140 110,130 120,130" fill="none" stroke="#475569" strokeWidth="1" />
    {/* Vertex labels */}
    <text x="116" y="18" fontSize="10" fontWeight="bold" fill="#2563eb">A</text>
    <text x="18" y="150" fontSize="10" fontWeight="bold" fill="#2563eb">B</text>
    <text x="192" y="150" fontSize="10" fontWeight="bold" fill="#2563eb">C</text>
    {/* Midpoint label */}
    <text x="104" y="153" fontSize="9" fontWeight="bold" fill="#f59e0b">M</text>
    {/* Foot of altitude label */}
    <text x="122" y="153" fontSize="9" fill="#475569">H</text>
    {/* Legend */}
    <line x1="5" y1="10" x2="20" y2="10" stroke="#f59e0b" strokeWidth="2" />
    <text x="24" y="13" fontSize="9" fill="#f59e0b">Median (BM=MC)</text>
    <line x1="5" y1="24" x2="20" y2="24" stroke="#475569" strokeWidth="1.5" strokeDasharray="5,3" />
    <text x="24" y="27" fontSize="9" fill="#475569">Altitude (AH ⊥ BC)</text>
  </svg>
)

export default MedianAltitude
