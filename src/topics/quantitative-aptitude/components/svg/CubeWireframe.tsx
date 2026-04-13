import React from 'react'

const CubeWireframe: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 170" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Back face */}
    <polygon
      points="60,20 150,20 150,110 60,110"
      fill="#dbeafe"
      stroke="#2563eb"
      strokeWidth="1"
      opacity="0.5"
    />
    {/* Front face */}
    <polygon
      points="30,50 120,50 120,140 30,140"
      fill="#dbeafe"
      stroke="#2563eb"
      strokeWidth="2"
    />
    {/* Connecting edges (visible) */}
    <line x1="30" y1="50" x2="60" y2="20" stroke="#2563eb" strokeWidth="1.5" />
    <line x1="120" y1="50" x2="150" y2="20" stroke="#2563eb" strokeWidth="1.5" />
    <line x1="120" y1="140" x2="150" y2="110" stroke="#2563eb" strokeWidth="1.5" />
    {/* Hidden edges (dashed) */}
    <line x1="30" y1="140" x2="60" y2="110" stroke="#475569" strokeWidth="1" strokeDasharray="4,3" />
    <line x1="60" y1="110" x2="150" y2="110" stroke="#475569" strokeWidth="1" strokeDasharray="4,3" />
    <line x1="60" y1="110" x2="60" y2="20" stroke="#475569" strokeWidth="1" strokeDasharray="4,3" />
    {/* Space diagonal (dashed, highlighted) */}
    <line x1="30" y1="140" x2="150" y2="20" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6,3" />
    {/* Side label */}
    <text x="70" y="155" fontSize="11" fontWeight="bold" fill="#2563eb">a</text>
    {/* Diagonal label */}
    <text x="95" y="72" fontSize="9" fontWeight="bold" fill="#f59e0b">a√3</text>
    {/* Formulas */}
    <text x="100" y="168" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#475569">
      V=a³  TSA=6a²
    </text>
  </svg>
)

export default CubeWireframe
