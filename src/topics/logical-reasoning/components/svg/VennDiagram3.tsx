import React from 'react'

const VennDiagram3: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 340 300" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Circle A */}
    <circle cx="140" cy="110" r="80" fill="#d1fae5" fillOpacity="0.45" stroke="#059669" strokeWidth="2" />
    {/* Circle B */}
    <circle cx="210" cy="110" r="80" fill="#fef3c7" fillOpacity="0.45" stroke="#f59e0b" strokeWidth="2" />
    {/* Circle C */}
    <circle cx="175" cy="175" r="80" fill="#dbeafe" fillOpacity="0.45" stroke="#475569" strokeWidth="2" />

    {/* Circle labels */}
    <text x="80" y="70" textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="16">A</text>
    <text x="268" y="70" textAnchor="middle" fill="#f59e0b" fontWeight="bold" fontSize="16">B</text>
    <text x="175" y="268" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="16">C</text>

    {/* Zone labels */}
    {/* Only A */}
    <text x="100" y="95" textAnchor="middle" fill="#059669" fontSize="9">only A</text>
    {/* Only B */}
    <text x="250" y="95" textAnchor="middle" fill="#f59e0b" fontSize="9">only B</text>
    {/* Only C */}
    <text x="175" y="235" textAnchor="middle" fill="#475569" fontSize="9">only C</text>

    {/* A ∩ B only */}
    <text x="175" y="80" textAnchor="middle" fill="#475569" fontSize="9">A∩B</text>
    {/* A ∩ C only */}
    <text x="130" y="170" textAnchor="middle" fill="#475569" fontSize="9">A∩C</text>
    {/* B ∩ C only */}
    <text x="220" y="170" textAnchor="middle" fill="#475569" fontSize="9">B∩C</text>

    {/* A ∩ B ∩ C (center) */}
    <text x="175" y="137" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="bold">A∩B∩C</text>

    {/* Legend */}
    <text x="170" y="292" textAnchor="middle" fill="#475569" fontSize="10">7 distinct regions in a 3-circle Venn diagram</text>
  </svg>
)

export default VennDiagram3
