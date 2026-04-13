import React from 'react'

const MirrorWaterImage: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Title */}
    <text x="180" y="18" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="13">
      Mirror Image vs Water Image
    </text>

    {/* ── Section 1: Original ── */}
    <text x="60" y="42" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">Original</text>
    <rect x="25" y="48" width="70" height="80" rx="4" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
    {/* Letter R — original */}
    <text x="60" y="105" textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="48">R</text>

    {/* ── Mirror line (vertical) ── */}
    <line x1="125" y1="45" x2="125" y2="135" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" />
    <text x="125" y="145" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Mirror</text>

    {/* ── Section 2: Mirror Image ── */}
    <text x="190" y="42" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">Mirror Image</text>
    <rect x="155" y="48" width="70" height="80" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
    {/* Letter R — mirror (horizontally flipped) */}
    <g transform="translate(190,105) scale(-1,1)">
      <text x="0" y="0" textAnchor="middle" fill="#f59e0b" fontWeight="bold" fontSize="48">R</text>
    </g>
    <text x="190" y="148" textAnchor="middle" fill="#475569" fontSize="9">Left ↔ Right flip</text>

    {/* ── Arrow between original and mirror ── */}
    <path d="M 98,88 L 108,88" stroke="#475569" strokeWidth="1" markerEnd="url(#mwArrow)" />
    <path d="M 152,88 L 142,88" stroke="#475569" strokeWidth="1" markerEnd="url(#mwArrow)" />

    {/* ── Section 3: Additional letters (top right) ── */}
    <rect x="250" y="35" width="95" height="110" rx="4" fill="white" stroke="#475569" strokeWidth="1" />
    <text x="297" y="52" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">Quick Reference</text>
    <text x="265" y="70" fill="#475569" fontSize="9">Mirror:</text>
    <text x="265" y="84" fill="#475569" fontSize="9">b ↔ d</text>
    <text x="265" y="98" fill="#475569" fontSize="9">p ↔ q</text>
    <text x="265" y="116" fill="#475569" fontSize="9">Water:</text>
    <text x="265" y="130" fill="#475569" fontSize="9">b ↔ p</text>
    <text x="315" y="84" fill="#475569" fontSize="9">E ↔ Ǝ</text>
    <text x="315" y="130" fill="#475569" fontSize="9">d ↔ q</text>

    {/* ══════ Water Image Section (bottom) ══════ */}

    {/* Water line (horizontal) */}
    <line x1="15" y1="180" x2="235" y2="180" stroke="#059669" strokeWidth="2" strokeDasharray="6,3" />
    <text x="125" y="176" textAnchor="middle" fill="#059669" fontSize="9" fontWeight="bold">Water surface</text>

    {/* Original above water */}
    <text x="60" y="168" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">Original</text>
    <rect x="100" y="150" width="50" height="26" rx="3" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
    <text x="125" y="171" textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="20">R</text>

    {/* Water image below */}
    <text x="60" y="210" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">Water Image</text>
    <rect x="100" y="186" width="50" height="26" rx="3" fill="#dbeafe" stroke="#475569" strokeWidth="1" />
    {/* Letter R — water image (vertically flipped) */}
    <g transform="translate(125,199) scale(1,-1)">
      <text x="0" y="0" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="20">R</text>
    </g>
    <text x="125" y="228" textAnchor="middle" fill="#475569" fontSize="9">Up ↔ Down flip</text>

    {/* ── Symmetric letters ── */}
    <rect x="15" y="240" width="330" height="50" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
    <text x="180" y="257" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">
      Mirror-symmetric letters: A H I M O T U V W X Y
    </text>
    <text x="180" y="273" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">
      Water-symmetric letters: B C D E H I K O X
    </text>

    {/* Clock mirror note */}
    <text x="180" y="295" textAnchor="middle" fill="#f59e0b" fontSize="10">
      Clock mirror: subtract from 11:60 (if min &gt; 0) or 12:00
    </text>

    <defs>
      <marker id="mwArrow" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
        <polygon points="0,0 6,2 0,4" fill="#475569" />
      </marker>
    </defs>
  </svg>
)

export default MirrorWaterImage
