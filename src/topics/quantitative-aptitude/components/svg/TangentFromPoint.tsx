import React from 'react'

const TangentFromPoint: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 220 160" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Circle */}
    <circle cx="110" cy="80" r="45" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
    {/* Center O */}
    <circle cx="110" cy="80" r="2.5" fill="#2563eb" />
    <text x="114" y="76" fontSize="9" fontWeight="bold" fill="#2563eb">O</text>
    {/* External point P */}
    <circle cx="195" cy="80" r="3" fill="#f59e0b" />
    <text x="199" y="78" fontSize="10" fontWeight="bold" fill="#f59e0b">P</text>
    {/* Tangent line PA (upper tangent) */}
    <line x1="195" y1="80" x2="139" y2="42" stroke="#475569" strokeWidth="1.5" />
    {/* Tangent line PB (lower tangent) */}
    <line x1="195" y1="80" x2="139" y2="118" stroke="#475569" strokeWidth="1.5" />
    {/* Tangent points */}
    <circle cx="139" cy="42" r="2.5" fill="#2563eb" />
    <text x="130" y="37" fontSize="9" fontWeight="bold" fill="#2563eb">A</text>
    <circle cx="139" cy="118" r="2.5" fill="#2563eb" />
    <text x="130" y="130" fontSize="9" fontWeight="bold" fill="#2563eb">B</text>
    {/* Radius OA */}
    <line x1="110" y1="80" x2="139" y2="42" stroke="#2563eb" strokeWidth="1" strokeDasharray="4,2" />
    {/* Radius OB */}
    <line x1="110" y1="80" x2="139" y2="118" stroke="#2563eb" strokeWidth="1" strokeDasharray="4,2" />
    {/* Right angle marks */}
    <rect x="131" y="42" width="6" height="6" fill="none" stroke="#475569" strokeWidth="1" transform="rotate(-55, 134, 45)" />
    <rect x="131" y="112" width="6" height="6" fill="none" stroke="#475569" strokeWidth="1" transform="rotate(55, 134, 115)" />
    {/* Equal length marks on PA */}
    <line x1="166" y1="58" x2="168" y2="62" stroke="#475569" strokeWidth="1.5" />
    <line x1="164" y1="57" x2="166" y2="61" stroke="#475569" strokeWidth="1.5" />
    {/* Equal length marks on PB */}
    <line x1="166" y1="102" x2="168" y2="98" stroke="#475569" strokeWidth="1.5" />
    <line x1="164" y1="103" x2="166" y2="99" stroke="#475569" strokeWidth="1.5" />
    {/* Labels */}
    <text x="5" y="14" fontSize="10" fontWeight="bold" fill="#475569">PA = PB</text>
    <text x="5" y="28" fontSize="9" fill="#475569">Radius ⊥ Tangent</text>
    <text x="120" y="78" fontSize="8" fill="#2563eb">r</text>
  </svg>
)

export default TangentFromPoint
