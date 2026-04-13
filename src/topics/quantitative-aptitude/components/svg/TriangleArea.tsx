import React from 'react'

const TriangleArea: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 160" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Shaded triangle */}
    <polygon
      points="30,135 170,135 100,30"
      fill="#dbeafe"
      stroke="#2563eb"
      strokeWidth="2"
    />
    {/* Height dashed line */}
    <line x1="100" y1="30" x2="100" y2="135" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,3" />
    {/* Right angle at base */}
    <polyline points="90,135 90,125 100,125" fill="none" stroke="#475569" strokeWidth="1" />
    {/* Base dimension line */}
    <line x1="30" y1="145" x2="170" y2="145" stroke="#475569" strokeWidth="1" />
    <line x1="30" y1="140" x2="30" y2="150" stroke="#475569" strokeWidth="1" />
    <line x1="170" y1="140" x2="170" y2="150" stroke="#475569" strokeWidth="1" />
    <text x="100" y="155" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563eb">b</text>
    {/* Height label */}
    <text x="106" y="86" fontSize="11" fontWeight="bold" fill="#f59e0b">h</text>
    {/* Formula */}
    <text x="100" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">
      Area = ½ × b × h
    </text>
  </svg>
)

export default TriangleArea
