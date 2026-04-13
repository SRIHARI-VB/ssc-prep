import React from 'react'

const HeightDistance: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 220 160" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Ground line */}
    <line x1="10" y1="140" x2="210" y2="140" stroke="#475569" strokeWidth="1.5" />
    {/* Tower */}
    <rect x="170" y="30" width="20" height="110" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" rx="1" />
    {/* Tower top */}
    <polygon points="165,30 195,30 180,18" fill="#2563eb" stroke="#2563eb" strokeWidth="1" />
    {/* Person (stick figure) */}
    <circle cx="40" cy="118" r="5" fill="none" stroke="#475569" strokeWidth="1.5" />
    <line x1="40" y1="123" x2="40" y2="138" stroke="#475569" strokeWidth="1.5" />
    <line x1="40" y1="128" x2="33" y2="133" stroke="#475569" strokeWidth="1.2" />
    <line x1="40" y1="128" x2="47" y2="133" stroke="#475569" strokeWidth="1.2" />
    <line x1="40" y1="138" x2="34" y2="145" stroke="#475569" strokeWidth="1.2" />
    <line x1="40" y1="138" x2="46" y2="145" stroke="#475569" strokeWidth="1.2" />
    {/* Line of sight */}
    <line x1="42" y1="118" x2="175" y2="30" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6,3" />
    {/* Horizontal eye-level line */}
    <line x1="42" y1="118" x2="170" y2="118" stroke="#475569" strokeWidth="1" strokeDasharray="4,3" />
    {/* Angle of elevation arc */}
    <path d="M 72,118 A 30,30 0 0,0 62,105" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="74" y="112" fontSize="11" fontWeight="bold" fill="#f59e0b">θ</text>
    {/* Height dimension */}
    <line x1="200" y1="30" x2="200" y2="140" stroke="#2563eb" strokeWidth="1" />
    <line x1="196" y1="30" x2="204" y2="30" stroke="#2563eb" strokeWidth="1" />
    <line x1="196" y1="140" x2="204" y2="140" stroke="#2563eb" strokeWidth="1" />
    <text x="207" y="88" fontSize="11" fontWeight="bold" fill="#2563eb">h</text>
    {/* Distance dimension */}
    <line x1="40" y1="150" x2="170" y2="150" stroke="#475569" strokeWidth="1" />
    <line x1="40" y1="145" x2="40" y2="155" stroke="#475569" strokeWidth="1" />
    <line x1="170" y1="145" x2="170" y2="155" stroke="#475569" strokeWidth="1" />
    <text x="105" y="158" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">d</text>
    {/* Formula */}
    <text x="90" y="14" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">
      tan θ = h / d
    </text>
  </svg>
)

export default HeightDistance
