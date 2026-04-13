import React from 'react'

const CylinderShape: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 170" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <rect x="55" y="35" width="90" height="90" fill="#dbeafe" stroke="none" />
    {/* Left edge */}
    <line x1="55" y1="35" x2="55" y2="125" stroke="#2563eb" strokeWidth="2" />
    {/* Right edge */}
    <line x1="145" y1="35" x2="145" y2="125" stroke="#2563eb" strokeWidth="2" />
    {/* Top ellipse */}
    <ellipse cx="100" cy="35" rx="45" ry="14" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
    {/* Bottom ellipse front half */}
    <path d="M 55,125 A 45,14 0 0,0 145,125" fill="none" stroke="#2563eb" strokeWidth="2" />
    {/* Bottom ellipse back half (dashed) */}
    <path d="M 55,125 A 45,14 0 0,1 145,125" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="4,3" />
    {/* Radius line on top */}
    <line x1="100" y1="35" x2="145" y2="35" stroke="#f59e0b" strokeWidth="1.5" />
    <circle cx="100" cy="35" r="2" fill="#f59e0b" />
    <text x="120" y="30" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f59e0b">r</text>
    {/* Height dimension */}
    <line x1="155" y1="35" x2="155" y2="125" stroke="#475569" strokeWidth="1" />
    <line x1="150" y1="35" x2="160" y2="35" stroke="#475569" strokeWidth="1" />
    <line x1="150" y1="125" x2="160" y2="125" stroke="#475569" strokeWidth="1" />
    <text x="163" y="84" fontSize="10" fontWeight="bold" fill="#2563eb">h</text>
    {/* Formulas */}
    <text x="100" y="155" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#475569">
      V=πr²h  CSA=2πrh  TSA=2πr(r+h)
    </text>
  </svg>
)

export default CylinderShape
