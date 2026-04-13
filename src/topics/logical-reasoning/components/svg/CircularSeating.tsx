import React from 'react'

const CircularSeating: React.FC<{ className?: string }> = ({ className }) => {
  const cx = 160
  const cy = 140
  const r = 95
  const seats = 8

  const seatPositions = Array.from({ length: seats }, (_, i) => {
    const angle = (i * 360) / seats - 90 // start from top
    const rad = (angle * Math.PI) / 180
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
      label: String(i + 1),
    }
  })

  return (
    <svg viewBox="0 0 320 290" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Title */}
      <text x="160" y="18" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="13">
        Circular Seating (Facing Center)
      </text>

      {/* Main circle (table) */}
      <circle cx={cx} cy={cy} r={r - 15} fill="#d1fae5" fillOpacity="0.3" stroke="#059669" strokeWidth="1" strokeDasharray="5,5" />

      {/* Seats */}
      {seatPositions.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r="16" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
          <text x={s.x} y={s.y + 5} textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="13">
            {s.label}
          </text>
        </g>
      ))}

      {/* Clockwise arrow (right side) */}
      <path
        d="M 230,55 A 85,85 0 0,1 260,140"
        fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#seatArrowCW)"
      />
      <text x="275" y="95" fill="#f59e0b" fontSize="10" fontWeight="bold">CW</text>

      {/* Anticlockwise arrow (left side) */}
      <path
        d="M 90,55 A 85,85 0 0,0 60,140"
        fill="none" stroke="#059669" strokeWidth="2" markerEnd="url(#seatArrowCCW)"
      />
      <text x="22" y="95" fill="#059669" fontSize="10" fontWeight="bold">ACW</text>

      {/* Center label */}
      <text x={cx} y={cy + 4} textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">
        Facing
      </text>
      <text x={cx} y={cy + 16} textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">
        Center
      </text>

      {/* Key info */}
      <text x="160" y="260" textAnchor="middle" fill="#059669" fontSize="10">
        Facing center: Left = Clockwise, Right = Anti-CW
      </text>
      <text x="160" y="275" textAnchor="middle" fill="#f59e0b" fontSize="10">
        Facing outward: Left = Anti-CW, Right = Clockwise
      </text>

      {/* Arrow markers */}
      <defs>
        <marker id="seatArrowCW" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0,0 8,3 0,6" fill="#f59e0b" />
        </marker>
        <marker id="seatArrowCCW" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0,0 8,3 0,6" fill="#059669" />
        </marker>
      </defs>
    </svg>
  )
}

export default CircularSeating
