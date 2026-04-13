import React from 'react'

/** Dot positions for a standard dice face within a cell */
const dotLayout: Record<number, [number, number][]> = {
  1: [[0, 0]],
  2: [[-1, -1], [1, 1]],
  3: [[-1, -1], [0, 0], [1, 1]],
  4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
  6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
}

const DiceFace: React.FC<{ cx: number; cy: number; size: number; value: number; highlight?: boolean }> = ({
  cx, cy, size, value, highlight,
}) => {
  const half = size / 2
  const dotR = size * 0.08
  const spacing = size * 0.25
  const dots = dotLayout[value] || []

  return (
    <g>
      <rect
        x={cx - half} y={cy - half} width={size} height={size}
        rx="4" fill={highlight ? '#d1fae5' : 'white'}
        stroke="#059669" strokeWidth="1.5"
      />
      {dots.map(([dx, dy], i) => (
        <circle
          key={i}
          cx={cx + dx * spacing}
          cy={cy + dy * spacing}
          r={dotR}
          fill="#475569"
        />
      ))}
    </g>
  )
}

const DiceNet: React.FC<{ className?: string }> = ({ className }) => {
  const s = 52 // cell size
  // Cross-shaped net: column of 4 (faces 2,1,5,6) with 3,4 on sides of face 1
  // Layout (grid positions):
  // Row 0:         [1,0] = face 2
  // Row 1: [0,1] = face 3, [1,1] = face 1, [2,1] = face 4
  // Row 2:         [1,2] = face 5
  // Row 3:         [1,3] = face 6

  const ox = 90 // origin x
  const oy = 20  // origin y

  const faces: { gx: number; gy: number; value: number; highlight?: boolean }[] = [
    { gx: 1, gy: 0, value: 2 },
    { gx: 0, gy: 1, value: 3 },
    { gx: 1, gy: 1, value: 1, highlight: true },
    { gx: 2, gy: 1, value: 4 },
    { gx: 1, gy: 2, value: 5 },
    { gx: 1, gy: 3, value: 6 },
  ]

  return (
    <svg viewBox="0 0 300 310" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="150" y="16" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="13">
        Dice Net (Unfolded)
      </text>

      {faces.map((f, i) => (
        <DiceFace
          key={i}
          cx={ox + f.gx * s + s / 2}
          cy={oy + f.gy * s + s / 2}
          size={s}
          value={f.value}
          highlight={f.highlight}
        />
      ))}

      {/* Opposite-face annotations */}
      {/* 1 opposite 6 */}
      <line x1={ox + s + s / 2 + s / 2 + 8} y1={oy + s + s / 2} x2={ox + s + s / 2 + s / 2 + 8} y2={oy + 3 * s + s / 2} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" />
      <text x={ox + s + s / 2 + s / 2 + 16} y={oy + 2 * s + s / 2} fill="#f59e0b" fontSize="9" fontWeight="bold">1↔6</text>

      {/* 2 opposite 5 */}
      <line x1={ox + 2 * s + 8} y1={oy + s / 2} x2={ox + 2 * s + 8} y2={oy + 2 * s + s / 2} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" />
      <text x={ox + 2 * s + 16} y={oy + s + s / 4} fill="#f59e0b" fontSize="9" fontWeight="bold">2↔5</text>

      {/* 3 opposite 4 */}
      <line x1={ox + s / 2} y1={oy + 2 * s + 4} x2={ox + 2 * s + s / 2} y2={oy + 2 * s + 4} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" />
      <text x={ox + s + s / 2} y={oy + 2 * s + 18} fill="#f59e0b" fontSize="9" fontWeight="bold">3↔4</text>

      {/* Rule annotation */}
      <rect x="40" y="248" width="220" height="28" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="150" y="266" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">
        Opposite faces always sum to 7
      </text>

      {/* Pairs at bottom */}
      <text x="150" y="296" textAnchor="middle" fill="#475569" fontSize="10">
        (1,6) &nbsp; (2,5) &nbsp; (3,4)
      </text>
    </svg>
  )
}

export default DiceNet
