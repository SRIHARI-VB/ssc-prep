import React from 'react'

const BPTTriangle: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 170" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Main triangle ABC */}
    <polygon
      points="100,15 20,155 180,155"
      fill="#dbeafe"
      stroke="#2563eb"
      strokeWidth="2"
    />
    {/* Parallel line DE */}
    <line x1="52" y1="85" x2="148" y2="85" stroke="#f59e0b" strokeWidth="2" />
    {/* Parallel arrows */}
    <text x="155" y="83" fontSize="8" fill="#f59e0b">∥</text>
    <text x="155" y="153" fontSize="8" fill="#f59e0b">∥</text>
    {/* Vertex labels */}
    <text x="96" y="11" fontSize="11" fontWeight="bold" fill="#2563eb">A</text>
    <text x="8" y="162" fontSize="11" fontWeight="bold" fill="#2563eb">B</text>
    <text x="180" y="162" fontSize="11" fontWeight="bold" fill="#2563eb">C</text>
    {/* DE labels */}
    <text x="40" y="82" fontSize="11" fontWeight="bold" fill="#f59e0b">D</text>
    <text x="150" y="82" fontSize="11" fontWeight="bold" fill="#f59e0b">E</text>
    {/* Segment labels */}
    <text x="62" y="50" fontSize="9" fill="#475569">AD</text>
    <text x="26" y="125" fontSize="9" fill="#475569">DB</text>
    <text x="135" y="50" fontSize="9" fill="#475569">AE</text>
    <text x="168" y="125" fontSize="9" fill="#475569">EC</text>
    {/* Formula */}
    <text x="100" y="168" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">
      AD/DB = AE/EC (BPT)
    </text>
    {/* DE parallel BC label */}
    <text x="100" y="98" textAnchor="middle" fontSize="9" fill="#f59e0b">
      DE ∥ BC
    </text>
  </svg>
)

export default BPTTriangle
