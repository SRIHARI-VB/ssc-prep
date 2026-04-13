import React from 'react'

const InCircumRadius: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 220 170" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Circumscribed circle (R) */}
    <circle cx="110" cy="82" r="62" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5,3" />
    {/* Triangle */}
    <polygon
      points="110,20 42,128 178,128"
      fill="#dbeafe"
      stroke="#2563eb"
      strokeWidth="2"
    />
    {/* Inscribed circle (r) */}
    <circle cx="110" cy="100" r="28" fill="none" stroke="#f59e0b" strokeWidth="2" />
    {/* Circumcenter O */}
    <circle cx="110" cy="82" r="2.5" fill="#2563eb" />
    {/* Incenter I */}
    <circle cx="110" cy="100" r="2.5" fill="#f59e0b" />
    {/* R radius line */}
    <line x1="110" y1="82" x2="110" y2="20" stroke="#2563eb" strokeWidth="1" strokeDasharray="3,2" />
    <text x="114" y="52" fontSize="9" fontWeight="bold" fill="#2563eb">R</text>
    {/* r radius line */}
    <line x1="110" y1="100" x2="110" y2="128" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,2" />
    <text x="114" y="118" fontSize="9" fontWeight="bold" fill="#f59e0b">r</text>
    {/* Center labels */}
    <text x="100" y="78" fontSize="8" fill="#2563eb">O</text>
    <text x="100" y="98" fontSize="8" fill="#f59e0b">I</text>
    {/* Formulas */}
    <text x="110" y="155" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#475569">
      r = Area/s
    </text>
    <text x="110" y="167" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#475569">
      R = abc/(4 x Area)
    </text>
  </svg>
)

export default InCircumRadius
