import React from 'react'
import RightTriangle from './RightTriangle'
import TriangleAngleSum from './TriangleAngleSum'
import CircleTheorems from './CircleTheorems'
import BPTTriangle from './BPTTriangle'
import TangentFromPoint from './TangentFromPoint'
import InCircumRadius from './InCircumRadius'
import SimilarTriangles from './SimilarTriangles'
import MedianAltitude from './MedianAltitude'
import TriangleArea from './TriangleArea'
import CircleSector from './CircleSector'
import QuadrilateralSet from './QuadrilateralSet'
import CubeWireframe from './CubeWireframe'
import CuboidWireframe from './CuboidWireframe'
import CylinderShape from './CylinderShape'
import ConeShape from './ConeShape'
import SphereHemisphere from './SphereHemisphere'
import HeightDistance from './HeightDistance'
import AlligationDiagram from './AlligationDiagram'
import CoordinatePlane from './CoordinatePlane'

export const SVG_MAP: Record<string, React.FC<{ className?: string }>> = {
  'right-triangle': RightTriangle,
  'angle-sum': TriangleAngleSum,
  'circle-theorems': CircleTheorems,
  'bpt': BPTTriangle,
  'tangent': TangentFromPoint,
  'in-circum-radius': InCircumRadius,
  'similar-triangles': SimilarTriangles,
  'median-altitude': MedianAltitude,
  'triangle-area': TriangleArea,
  'circle-sector': CircleSector,
  'quadrilateral-set': QuadrilateralSet,
  'cube-wireframe': CubeWireframe,
  'cuboid-wireframe': CuboidWireframe,
  'cylinder': CylinderShape,
  'cone-sphere': ConeShape,
  'sphere-hemisphere': SphereHemisphere,
  'height-distance': HeightDistance,
  'alligation-diagram': AlligationDiagram,
  'coordinate-plane': CoordinatePlane,
}

export {
  RightTriangle,
  TriangleAngleSum,
  CircleTheorems,
  BPTTriangle,
  TangentFromPoint,
  InCircumRadius,
  SimilarTriangles,
  MedianAltitude,
  TriangleArea,
  CircleSector,
  QuadrilateralSet,
  CubeWireframe,
  CuboidWireframe,
  CylinderShape,
  ConeShape,
  SphereHemisphere,
  HeightDistance,
  AlligationDiagram,
  CoordinatePlane,
}
