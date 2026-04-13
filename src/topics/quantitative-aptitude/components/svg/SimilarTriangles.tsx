import React from 'react'

const SimilarTriangles: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 220 150" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Larger triangle */}
    <polygon
      points="15,130 105,130 60,30"
      fill="#dbeafe"
      stroke="#2563eb"
      strokeWidth="2"
    />
    {/* Smaller triangle */}
    <polygon
      points="135,130 195,130 165,70"
      fill="#dbeafe"
      stroke="#2563eb"
      strokeWidth="2"
    />
    {/* Tilde symbol between triangles */}
    <text x="115" y="105" fontSize="18" fontWeight="bold" fill="#f59e0b">~</text>
    {/* Labels for large triangle */}
    <text x="56" y="24" fontSize="9" fontWeight="bold" fill="#2563eb">A</text>
    <text x="5" y="140" fontSize="9" fontWeight="bold" fill="#2563eb">B</text>
    <text x="107" y="140" fontSize="9" fontWeight="bold" fill="#2563eb">C</text>
    {/* Side labels large */}
    <text x="30" y="76" fontSize="8" fill="#475569" transform="rotate(-66, 30, 76)">c</text>
    <text x="88" y="76" fontSize="8" fill="#475569" transform="rotate(66, 88, 76)">b</text>
    <text x="58" y="143" fontSize="8" fill="#475569">a</text>
    {/* Labels for small triangle */}
    <text x="161" y="64" fontSize="9" fontWeight="bold" fill="#2563eb">D</text>
    <text x="126" y="140" fontSize="9" fontWeight="bold" fill="#2563eb">E</text>
    <text x="197" y="140" fontSize="9" fontWeight="bold" fill="#2563eb">F</text>
    {/* Side labels small */}
    <text x="145" y="98" fontSize="8" fill="#475569" transform="rotate(-64, 145, 98)">f</text>
    <text x="184" y="98" fontSize="8" fill="#475569" transform="rotate(64, 184, 98)">e</text>
    <text x="163" y="143" fontSize="8" fill="#475569">d</text>
    {/* Ratio arrows */}
    <text x="110" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">
      a/d = b/e = c/f
    </text>
    {/* Area ratio */}
    <text x="110" y="28" textAnchor="middle" fontSize="9" fill="#f59e0b">
      Area ratio = (side ratio)²
    </text>
  </svg>
)

export default SimilarTriangles
