import React from 'react'

const BloodRelationTree: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Title */}
    <text x="160" y="20" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="13">Family Tree Template</text>

    {/* ── Generation 1: Grandfather & Grandmother ── */}
    {/* Grandfather (square = male) */}
    <rect x="80" y="35" width="36" height="36" rx="2" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
    <text x="98" y="58" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold">GF</text>

    {/* Marriage line */}
    <line x1="116" y1="53" x2="164" y2="53" stroke="#475569" strokeWidth="2" />
    <text x="140" y="48" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="bold">=</text>

    {/* Grandmother (circle = female) */}
    <circle cx="182" cy="53" r="18" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
    <text x="182" y="58" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">GM</text>

    {/* Vertical line down to generation 2 */}
    <line x1="140" y1="71" x2="140" y2="100" stroke="#475569" strokeWidth="2" />

    {/* Horizontal line spanning children */}
    <line x1="80" y1="100" x2="220" y2="100" stroke="#475569" strokeWidth="1.5" />

    {/* ── Generation 2: Father, Mother, Uncle ── */}
    {/* Father (square) */}
    <line x1="80" y1="100" x2="80" y2="115" stroke="#475569" strokeWidth="1.5" />
    <rect x="62" y="115" width="36" height="36" rx="2" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
    <text x="80" y="138" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="bold">Father</text>

    {/* Marriage line */}
    <line x1="98" y1="133" x2="132" y2="133" stroke="#475569" strokeWidth="2" />
    <text x="115" y="128" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="bold">=</text>

    {/* Mother (circle) */}
    <circle cx="150" cy="133" r="18" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
    <text x="150" y="137" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Mother</text>

    {/* Uncle (square) */}
    <line x1="220" y1="100" x2="220" y2="115" stroke="#475569" strokeWidth="1.5" />
    <rect x="202" y="115" width="36" height="36" rx="2" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
    <text x="220" y="138" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="bold">Uncle</text>

    {/* Vertical line down to generation 3 */}
    <line x1="115" y1="151" x2="115" y2="180" stroke="#475569" strokeWidth="2" />

    {/* Horizontal line spanning children */}
    <line x1="70" y1="180" x2="180" y2="180" stroke="#475569" strokeWidth="1.5" />

    {/* ── Generation 3: Son, Daughter ── */}
    {/* Son (square) */}
    <line x1="80" y1="180" x2="80" y2="195" stroke="#475569" strokeWidth="1.5" />
    <rect x="62" y="195" width="36" height="36" rx="2" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
    <text x="80" y="218" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="bold">Son</text>

    {/* Daughter (circle) */}
    <line x1="160" y1="180" x2="160" y2="195" stroke="#475569" strokeWidth="1.5" />
    <circle cx="160" cy="213" r="18" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
    <text x="160" y="217" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="bold">Daughter</text>

    {/* ── Legend ── */}
    <rect x="20" y="250" width="14" height="14" rx="1" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
    <text x="40" y="262" fill="#475569" fontSize="10">= Male</text>

    <circle cx="107" cy="257" r="7" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="120" y="262" fill="#475569" fontSize="10">= Female</text>

    <line x1="185" y1="257" x2="210" y2="257" stroke="#475569" strokeWidth="2" />
    <text x="203" y="253" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">=</text>
    <text x="220" y="262" fill="#475569" fontSize="10">= Marriage</text>

    <line x1="280" y1="250" x2="280" y2="264" stroke="#475569" strokeWidth="2" />
    <text x="293" y="262" fill="#475569" fontSize="10">= Child</text>
  </svg>
)

export default BloodRelationTree
