import React from 'react'

const CuboidWireframe: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 220 170" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Back face */}
    <polygon
      points="55,15 185,15 185,85 55,85"
      fill="#dbeafe"
      stroke="#2563eb"
      strokeWidth="1"
      opacity="0.5"
    />
    {/* Front face */}
    <polygon
      points="20,50 150,50 150,120 20,120"
      fill="#dbeafe"
      stroke="#2563eb"
      strokeWidth="2"
    />
    {/* Connecting edges (visible) */}
    <line x1="20" y1="50" x2="55" y2="15" stroke="#2563eb" strokeWidth="1.5" />
    <line x1="150" y1="50" x2="185" y2="15" stroke="#2563eb" strokeWidth="1.5" />
    <line x1="150" y1="120" x2="185" y2="85" stroke="#2563eb" strokeWidth="1.5" />
    {/* Hidden edges (dashed) */}
    <line x1="20" y1="120" x2="55" y2="85" stroke="#475569" strokeWidth="1" strokeDasharray="4,3" />
    <line x1="55" y1="85" x2="185" y2="85" stroke="#475569" strokeWidth="1" strokeDasharray="4,3" />
    <line x1="55" y1="85" x2="55" y2="15" stroke="#475569" strokeWidth="1" strokeDasharray="4,3" />
    {/* Dimension labels */}
    {/* l - length (bottom front edge) */}
    <text x="82" y="134" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563eb">l</text>
    {/* h - height (left front edge) */}
    <text x="10" y="88" fontSize="11" fontWeight="bold" fill="#2563eb">h</text>
    {/* b - breadth (top right edge going back) */}
    <text x="172" y="28" fontSize="11" fontWeight="bold" fill="#2563eb">b</text>
    {/* Space diagonal */}
    <line x1="20" y1="120" x2="185" y2="15" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6,3" />
    <text x="108" y="60" fontSize="8" fontWeight="bold" fill="#f59e0b">√(l²+b²+h²)</text>
    {/* Formula */}
    <text x="110" y="155" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#475569">
      V=lbh  TSA=2(lb+bh+hl)
    </text>
  </svg>
)

export default CuboidWireframe
