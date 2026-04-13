import React from 'react'

const TriangleAngleSum: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 160" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Triangle */}
    <polygon
      points="100,20 20,140 180,140"
      fill="#dbeafe"
      stroke="#2563eb"
      strokeWidth="2"
    />
    {/* Angle arc at bottom-left (alpha) */}
    <path
      d="M 36,140 A 18,18 0 0,1 24,126"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="1.5"
    />
    <text x="42" y="131" fontSize="11" fontWeight="bold" fill="#f59e0b">α</text>
    {/* Angle arc at bottom-right (beta) */}
    <path
      d="M 164,140 A 18,18 0 0,0 176,126"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="1.5"
    />
    <text x="155" y="131" fontSize="11" fontWeight="bold" fill="#f59e0b">β</text>
    {/* Angle arc at top (gamma) */}
    <path
      d="M 90,34 A 16,16 0 0,1 110,34"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="1.5"
    />
    <text x="96" y="46" fontSize="11" fontWeight="bold" fill="#f59e0b">γ</text>
    {/* Formula */}
    <text x="100" y="12" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">
      α + β + γ = 180°
    </text>
    {/* Side labels */}
    <text x="52" y="76" fontSize="10" fill="#2563eb" transform="rotate(-56, 52, 76)">a</text>
    <text x="148" y="76" fontSize="10" fill="#2563eb" transform="rotate(56, 148, 76)">b</text>
    <text x="100" y="153" textAnchor="middle" fontSize="10" fill="#2563eb">c</text>
  </svg>
)

export default TriangleAngleSum
