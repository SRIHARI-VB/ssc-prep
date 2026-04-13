import React from 'react'

const DirectionCompass: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Background circle */}
    <circle cx="150" cy="150" r="130" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
    <circle cx="150" cy="150" r="110" fill="white" stroke="#059669" strokeWidth="1.5" />

    {/* Compass lines — cardinal */}
    <line x1="150" y1="40" x2="150" y2="260" stroke="#475569" strokeWidth="1" strokeDasharray="4,4" />
    <line x1="40" y1="150" x2="260" y2="150" stroke="#475569" strokeWidth="1" strokeDasharray="4,4" />
    {/* Compass lines — intercardinal */}
    <line x1="72" y1="72" x2="228" y2="228" stroke="#475569" strokeWidth="0.8" strokeDasharray="3,5" />
    <line x1="228" y1="72" x2="72" y2="228" stroke="#475569" strokeWidth="0.8" strokeDasharray="3,5" />

    {/* North pointer (triangle) */}
    <polygon points="150,30 142,60 158,60" fill="#059669" />
    <polygon points="150,270 142,240 158,240" fill="#475569" />

    {/* Cardinal labels */}
    <text x="150" y="22" textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="16">N</text>
    <text x="150" y="290" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="16">S</text>
    <text x="278" y="155" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="16">E</text>
    <text x="22" y="155" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="16">W</text>

    {/* Intercardinal labels */}
    <text x="235" y="68" textAnchor="middle" fill="#475569" fontSize="12">NE</text>
    <text x="65" y="68" textAnchor="middle" fill="#475569" fontSize="12">NW</text>
    <text x="235" y="242" textAnchor="middle" fill="#475569" fontSize="12">SE</text>
    <text x="65" y="242" textAnchor="middle" fill="#475569" fontSize="12">SW</text>

    {/* Center dot */}
    <circle cx="150" cy="150" r="4" fill="#059669" />

    {/* Right turn arrow (clockwise) — top-right arc */}
    <path
      d="M 170,90 A 70,70 0 0,1 210,150"
      fill="none" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrowCW)"
    />
    <text x="215" y="115" fill="#f59e0b" fontSize="10" fontWeight="bold">Right = CW</text>

    {/* Left turn arrow (anticlockwise) — top-left arc */}
    <path
      d="M 130,90 A 70,70 0 0,0 90,150"
      fill="none" stroke="#059669" strokeWidth="2.5" markerEnd="url(#arrowCCW)"
    />
    <text x="30" y="115" fill="#059669" fontSize="10" fontWeight="bold">Left = ACW</text>

    {/* Arrow markers */}
    <defs>
      <marker id="arrowCW" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <polygon points="0,0 8,3 0,6" fill="#f59e0b" />
      </marker>
      <marker id="arrowCCW" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <polygon points="0,0 8,3 0,6" fill="#059669" />
      </marker>
    </defs>
  </svg>
)

export default DirectionCompass
