import React from 'react'
import DirectionCompass from './DirectionCompass'
import VennDiagram2 from './VennDiagram2'
import VennDiagram3 from './VennDiagram3'
import BloodRelationTree from './BloodRelationTree'
import CircularSeating from './CircularSeating'
import DiceNet from './DiceNet'
import DicePerspective from './DicePerspective'
import MirrorWaterImage from './MirrorWaterImage'
import ClockAngle from './ClockAngle'
import CountingFigures from './CountingFigures'

export {
  DirectionCompass,
  VennDiagram2,
  VennDiagram3,
  BloodRelationTree,
  CircularSeating,
  DiceNet,
  DicePerspective,
  MirrorWaterImage,
  ClockAngle,
  CountingFigures,
}

export const SVG_MAP: Record<string, React.FC<{ className?: string }>> = {
  'direction-compass': DirectionCompass,
  'venn-2': VennDiagram2,
  'venn-3': VennDiagram3,
  'blood-relation-tree': BloodRelationTree,
  'circular-seating': CircularSeating,
  'dice-net': DiceNet,
  'dice-3d': DicePerspective,
  'mirror-water': MirrorWaterImage,
  'clock-angle': ClockAngle,
  'counting-figures': CountingFigures,
}
