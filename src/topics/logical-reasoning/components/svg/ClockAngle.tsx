import React from 'react'

const ClockAngle: React.FC<{ className?: string }> = ({ className }) => {
  const cx = 150
  const cy = 140
  const r = 100

  // Clock numbers positions
  const numbers = Array.from({ length: 12 }, (_, i) => {
    const num = i + 1
    const angle = (num * 30 - 90) * (Math.PI / 180)
    return {
      x: cx + (r - 16) * Math.cos(angle),
      y: cy + (r - 16) * Math.sin(angle) + 4,
      label: String(num),
    }
  })

  // Tick marks
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const angle = (i * 6 - 90) * (Math.PI / 180)
    const isMajor = i % 5 === 0
    const outerR = r - 2
    const innerR = isMajor ? r - 10 : r - 6
    return {
      x1: cx + outerR * Math.cos(angle),
      y1: cy + outerR * Math.sin(angle),
      x2: cx + innerR * Math.cos(angle),
      y2: cy + innerR * Math.sin(angle),
      isMajor,
    }
  })

  // At 4:30:
  // Hour hand angle: 30*4 + 0.5*30 = 135 degrees from 12
  // Minute hand angle: 6*30 = 180 degrees from 12
  const hourAngleDeg = 135 - 90 // from right (CSS-like), so subtract 90 for SVG
  const minuteAngleDeg = 180 - 90

  const hourAngleRad = (hourAngleDeg * Math.PI) / 180
  const minuteAngleRad = (minuteAngleDeg * Math.PI) / 180

  const hourHandLen = 55
  const minuteHandLen = 75

  const hourX = cx + hourHandLen * Math.cos(hourAngleRad)
  const hourY = cy + hourHandLen * Math.sin(hourAngleRad)
  const minuteX = cx + minuteHandLen * Math.cos(minuteAngleRad)
  const minuteY = cy + minuteHandLen * Math.sin(minuteAngleRad)

  // Angle arc between hands (from hour to minute going clockwise)
  // Hour at 135deg from 12 = 45deg SVG, Minute at 180deg from 12 = 90deg SVG
  // Arc from 45 to 90 degrees (SVG coordinates)

  return (
    <svg viewBox="0 0 300 290" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="150" y="16" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="13">
        Clock at 4:30 — Angle Calculation
      </text>

      {/* Clock face */}
      <circle cx={cx} cy={cy} r={r} fill="white" stroke="#059669" strokeWidth="2.5" />

      {/* Tick marks */}
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke={t.isMajor ? '#475569' : '#94a3b8'}
          strokeWidth={t.isMajor ? 2 : 0.8}
        />
      ))}

      {/* Numbers */}
      {numbers.map((n, i) => (
        <text key={i} x={n.x} y={n.y} textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="12">
          {n.label}
        </text>
      ))}

      {/* Angle arc between the two hands */}
      {/* From hour (45deg SVG) to minute (90deg SVG) */}
      <path
        d={`M ${cx + 30 * Math.cos(hourAngleRad)} ${cy + 30 * Math.sin(hourAngleRad)} A 30 30 0 0 1 ${cx + 30 * Math.cos(minuteAngleRad)} ${cy + 30 * Math.sin(minuteAngleRad)}`}
        fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1.5"
      />
      <text
        x={cx + 38 * Math.cos(((hourAngleRad + minuteAngleRad) / 2))}
        y={cy + 38 * Math.sin(((hourAngleRad + minuteAngleRad) / 2)) + 4}
        textAnchor="middle" fill="#f59e0b" fontWeight="bold" fontSize="11"
      >
        45°
      </text>

      {/* Hour hand (shorter, thicker) */}
      <line x1={cx} y1={cy} x2={hourX} y2={hourY} stroke="#059669" strokeWidth="4" strokeLinecap="round" />
      {/* Minute hand (longer, thinner) */}
      <line x1={cx} y1={cy} x2={minuteX} y2={minuteY} stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />

      {/* Center dot */}
      <circle cx={cx} cy={cy} r="4" fill="#059669" />

      {/* Hand labels */}
      <text x={hourX + 10} y={hourY + 12} fill="#059669" fontSize="9" fontWeight="bold">H</text>
      <text x={minuteX + 6} y={minuteY + 4} fill="#475569" fontSize="9" fontWeight="bold">M</text>

      {/* Formula box */}
      <rect x="30" y="252" width="240" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="150" y="272" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">
        Angle = |30H - 5.5M| = |30(4) - 5.5(30)| = 45°
      </text>
    </svg>
  )
}

export default ClockAngle
