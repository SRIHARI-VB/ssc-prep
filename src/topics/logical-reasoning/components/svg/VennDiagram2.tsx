import React from 'react'

const VennDiagram2: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Circle A */}
    <circle cx="130" cy="120" r="80" fill="#d1fae5" fillOpacity="0.6" stroke="#059669" strokeWidth="2" />
    {/* Circle B */}
    <circle cx="230" cy="120" r="80" fill="#fef3c7" fillOpacity="0.6" stroke="#f59e0b" strokeWidth="2" />

    {/* Labels for circles */}
    <text x="90" y="80" textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="18">A</text>
    <text x="270" y="80" textAnchor="middle" fill="#f59e0b" fontWeight="bold" fontSize="18">B</text>

    {/* Zone labels */}
    <text x="95" y="125" textAnchor="middle" fill="#475569" fontSize="12">Only A</text>
    <text x="180" y="115" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">A ∩ B</text>
    <text x="180" y="130" textAnchor="middle" fill="#475569" fontSize="10">(Both)</text>
    <text x="265" y="125" textAnchor="middle" fill="#475569" fontSize="12">Only B</text>

    {/* Relationship annotations below */}
    <line x1="20" y1="210" x2="340" y2="210" stroke="#475569" strokeWidth="0.5" />

    {/* All A are B — A inside B */}
    <circle cx="60" cy="238" r="12" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
    <circle cx="60" cy="238" r="20" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="90" y="243" fill="#475569" fontSize="10">All A are B</text>

    {/* Some A are B — overlap */}
    <circle cx="160" cy="238" r="14" fill="#d1fae5" fillOpacity="0.5" stroke="#059669" strokeWidth="1.5" />
    <circle cx="175" cy="238" r="14" fill="#fef3c7" fillOpacity="0.5" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="195" y="243" fill="#475569" fontSize="10">Some A are B</text>

    {/* No A are B — separate */}
    <circle cx="280" cy="238" r="12" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
    <circle cx="310" cy="238" r="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="295" y="258" fill="#475569" fontSize="10">No A are B</text>
  </svg>
)

export default VennDiagram2
