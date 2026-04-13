import React from 'react'

const SphereHemisphere: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 230 150" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* === Sphere === */}
    <circle cx="65" cy="70" r="45" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
    {/* Equator ellipse */}
    <ellipse cx="65" cy="70" rx="45" ry="12" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="4,3" />
    {/* Vertical meridian */}
    <ellipse cx="65" cy="70" rx="12" ry="45" fill="none" stroke="#475569" strokeWidth="0.8" strokeDasharray="3,3" />
    {/* Radius */}
    <line x1="65" y1="70" x2="110" y2="70" stroke="#f59e0b" strokeWidth="1.5" />
    <circle cx="65" cy="70" r="2" fill="#f59e0b" />
    <text x="88" y="65" fontSize="10" fontWeight="bold" fill="#f59e0b">r</text>
    {/* Sphere label */}
    <text x="65" y="130" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#475569">Sphere</text>
    <text x="65" y="142" textAnchor="middle" fontSize="7" fill="#475569">V=⁴⁄₃πr³  SA=4πr²</text>

    {/* === Hemisphere === */}
    {/* Top dome */}
    <path d="M 125,85 A 45,45 0 0,1 215,85" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
    {/* Flat base */}
    <line x1="125" y1="85" x2="215" y2="85" stroke="#2563eb" strokeWidth="2" />
    {/* Base ellipse */}
    <ellipse cx="170" cy="85" rx="45" ry="10" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="4,3" />
    {/* Radius */}
    <line x1="170" y1="85" x2="215" y2="85" stroke="#f59e0b" strokeWidth="1.5" />
    <circle cx="170" cy="85" r="2" fill="#f59e0b" />
    <text x="193" y="80" fontSize="10" fontWeight="bold" fill="#f59e0b">r</text>
    {/* Hemisphere label */}
    <text x="170" y="112" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#475569">Hemisphere</text>
    <text x="170" y="124" textAnchor="middle" fontSize="7" fill="#475569">V=⅔πr³  TSA=3πr²</text>
  </svg>
)

export default SphereHemisphere
