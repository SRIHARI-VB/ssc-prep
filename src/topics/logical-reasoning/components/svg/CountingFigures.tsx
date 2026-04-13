import React from 'react'

const CountingFigures: React.FC<{ className?: string }> = ({ className }) => {
  // Triangle with internal lines from vertices creating smaller triangles
  // Main triangle vertices
  const A = { x: 150, y: 30 }  // top
  const B = { x: 40, y: 210 }  // bottom-left
  const C = { x: 260, y: 210 } // bottom-right

  // Midpoints of sides
  const D = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 } // mid AB
  const E = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 } // mid AC
  const F = { x: (B.x + C.x) / 2, y: (B.y + C.y) / 2 } // mid BC

  const pt = (p: { x: number; y: number }) => `${p.x},${p.y}`

  return (
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="150" y="18" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="13">
        Counting Triangles
      </text>

      {/* Main triangle */}
      <polygon
        points={`${pt(A)} ${pt(B)} ${pt(C)}`}
        fill="#d1fae5" fillOpacity="0.3" stroke="#059669" strokeWidth="2"
      />

      {/* Medians / internal lines (connecting midpoints) */}
      <line x1={D.x} y1={D.y} x2={C.x} y2={C.y} stroke="#059669" strokeWidth="1.5" />
      <line x1={E.x} y1={E.y} x2={B.x} y2={B.y} stroke="#059669" strokeWidth="1.5" />
      <line x1={F.x} y1={F.y} x2={A.x} y2={A.y} stroke="#059669" strokeWidth="1.5" />

      {/* Midpoint line (connecting midpoints of sides) */}
      <line x1={D.x} y1={D.y} x2={E.x} y2={E.y} stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" />
      <line x1={D.x} y1={D.y} x2={F.x} y2={F.y} stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" />
      <line x1={E.x} y1={E.y} x2={F.x} y2={F.y} stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" />

      {/* Vertex labels */}
      <text x={A.x} y={A.y - 6} textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="12">A</text>
      <text x={B.x - 10} y={B.y + 6} textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="12">B</text>
      <text x={C.x + 10} y={C.y + 6} textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="12">C</text>

      {/* Midpoint labels */}
      <text x={D.x - 10} y={D.y} textAnchor="middle" fill="#f59e0b" fontSize="10">D</text>
      <text x={E.x + 10} y={E.y} textAnchor="middle" fill="#f59e0b" fontSize="10">E</text>
      <text x={F.x} y={F.y + 14} textAnchor="middle" fill="#f59e0b" fontSize="10">F</text>

      {/* Count annotation */}
      <rect x="20" y="228" width="260" height="62" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="150" y="245" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">
        Counting (with medians + midpoint triangle):
      </text>
      <text x="150" y="260" textAnchor="middle" fill="#475569" fontSize="10">
        Small triangles: 6 | Medium (2 small): 6
      </text>
      <text x="150" y="275" textAnchor="middle" fill="#475569" fontSize="10">
        Large (3+ small): 3 | Whole: 1 | Total = 16
      </text>
    </svg>
  )
}

export default CountingFigures
