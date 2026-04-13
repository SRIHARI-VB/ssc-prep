import React from 'react'

const QuadrilateralSet: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 220 170" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Row 1: Rectangle and Square */}
    {/* Rectangle */}
    <rect x="10" y="10" width="70" height="45" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="1" />
    <text x="45" y="62" textAnchor="middle" fontSize="8" fill="#2563eb">l</text>
    <text x="3" y="35" fontSize="8" fill="#2563eb">b</text>
    <text x="45" y="75" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#475569">l x b</text>

    {/* Square */}
    <rect x="120" y="10" width="45" height="45" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="1" />
    <text x="142" y="62" textAnchor="middle" fontSize="8" fill="#2563eb">a</text>
    <text x="113" y="35" fontSize="8" fill="#2563eb">a</text>
    <text x="142" y="75" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#475569">a²</text>

    {/* Row 2: Parallelogram and Trapezium */}
    {/* Parallelogram */}
    <polygon points="25,90 95,90 80,130 10,130" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
    <text x="52" y="138" textAnchor="middle" fontSize="8" fill="#2563eb">b</text>
    {/* Height line */}
    <line x1="60" y1="90" x2="60" y2="130" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,2" />
    <text x="64" y="114" fontSize="7" fill="#f59e0b">h</text>
    <text x="52" y="148" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#475569">b x h</text>

    {/* Trapezium */}
    <polygon points="140,90 185,90 200,130 120,130" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
    <text x="162" y="87" textAnchor="middle" fontSize="7" fill="#2563eb">a</text>
    <text x="160" y="140" textAnchor="middle" fontSize="7" fill="#2563eb">b</text>
    {/* Height */}
    <line x1="160" y1="90" x2="160" y2="130" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,2" />
    <text x="164" y="114" fontSize="7" fill="#f59e0b">h</text>
    <text x="160" y="150" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#475569">½(a+b)h</text>

    {/* Title */}
    <text x="110" y="168" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#475569">
      Quadrilateral Areas
    </text>
  </svg>
)

export default QuadrilateralSet
