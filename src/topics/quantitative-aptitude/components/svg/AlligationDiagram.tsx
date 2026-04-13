import React from 'react'

const AlligationDiagram: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 220 160" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Title */}
    <text x="110" y="14" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">
      Alligation (Cross Method)
    </text>
    {/* Cheaper label (top left) */}
    <rect x="10" y="28" width="70" height="24" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
    <text x="45" y="44" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2563eb">Cheaper</text>
    <text x="45" y="60" textAnchor="middle" fontSize="9" fill="#2563eb">d₁</text>
    {/* Dearer label (bottom left) */}
    <rect x="10" y="100" width="70" height="24" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
    <text x="45" y="116" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2563eb">Dearer</text>
    <text x="45" y="132" textAnchor="middle" fontSize="9" fill="#2563eb">d₂</text>
    {/* Mean (center) */}
    <circle cx="115" cy="80" r="18" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
    <text x="115" y="77" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#f59e0b">Mean</text>
    <text x="115" y="89" textAnchor="middle" fontSize="9" fill="#f59e0b">m</text>
    {/* Cross lines */}
    <line x1="80" y1="46" x2="98" y2="72" stroke="#475569" strokeWidth="1.5" />
    <line x1="80" y1="112" x2="98" y2="88" stroke="#475569" strokeWidth="1.5" />
    {/* Result boxes (right) */}
    <rect x="145" y="28" width="70" height="24" rx="4" fill="#dbeafe" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="180" y="44" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#f59e0b">d₂ - m</text>
    <rect x="145" y="100" width="70" height="24" rx="4" fill="#dbeafe" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="180" y="116" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#f59e0b">m - d₁</text>
    {/* Lines from center to results */}
    <line x1="132" y1="72" x2="145" y2="46" stroke="#475569" strokeWidth="1.5" />
    <line x1="132" y1="88" x2="145" y2="112" stroke="#475569" strokeWidth="1.5" />
    {/* Ratio */}
    <text x="110" y="152" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">
      Ratio = (d₂ - m) : (m - d₁)
    </text>
  </svg>
)

export default AlligationDiagram
