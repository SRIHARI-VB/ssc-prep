import React from 'react'

const DicePerspective: React.FC<{ className?: string }> = ({ className }) => {
  // Isometric 3D dice showing faces 1 (top), 2 (front), 3 (right)
  // Using isometric projection with manual polygon points

  return (
    <svg viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="150" y="18" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="13">
        3D Dice — 3 Visible Faces
      </text>

      {/* Top face (face showing 1) */}
      <polygon
        points="150,50 220,85 150,120 80,85"
        fill="#d1fae5" stroke="#059669" strokeWidth="2"
      />
      {/* Single dot on top */}
      <circle cx="150" cy="85" r="5" fill="#475569" />

      {/* Front-left face (face showing 2) */}
      <polygon
        points="80,85 150,120 150,200 80,165"
        fill="#ecfdf5" stroke="#059669" strokeWidth="2"
      />
      {/* Two dots on front-left */}
      <circle cx="105" cy="118" r="4" fill="#475569" />
      <circle cx="125" cy="158" r="4" fill="#475569" />

      {/* Front-right face (face showing 3) */}
      <polygon
        points="150,120 220,85 220,165 150,200"
        fill="white" stroke="#059669" strokeWidth="2"
      />
      {/* Three dots on front-right (diagonal) */}
      <circle cx="175" cy="118" r="4" fill="#475569" />
      <circle cx="185" cy="142" r="4" fill="#475569" />
      <circle cx="195" cy="166" r="4" fill="#475569" />

      {/* Face labels */}
      <text x="150" y="108" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="bold">Top: 1</text>
      <text x="98" y="178" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="bold">Left: 2</text>
      <text x="202" y="178" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="bold">Right: 3</text>

      {/* Hidden faces annotation */}
      <rect x="45" y="215" width="210" height="50" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="150" y="232" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">Hidden faces:</text>
      <text x="150" y="248" textAnchor="middle" fill="#475569" fontSize="10">
        Bottom=6, Back-right=5, Back-left=4
      </text>
      <text x="150" y="260" textAnchor="middle" fill="#f59e0b" fontSize="9">
        (Opposite of 1=6, 2=5, 3=4)
      </text>
    </svg>
  )
}

export default DicePerspective
