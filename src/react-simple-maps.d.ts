declare module 'react-simple-maps' {
  import { ComponentType, CSSProperties, ReactNode } from 'react'

  interface ProjectionConfig {
    scale?: number
    center?: [number, number]
    rotate?: [number, number, number]
    parallels?: [number, number]
  }

  interface ComposableMapProps {
    projection?: string
    projectionConfig?: ProjectionConfig
    width?: number
    height?: number
    style?: CSSProperties
    children?: ReactNode
  }

  interface GeographiesChildrenArgs {
    geographies: Geography[]
  }

  interface Geography {
    rsmKey: string
    properties: Record<string, unknown>
    type: string
    geometry: unknown
  }

  interface GeographiesProps {
    geography: string | object
    children: (args: GeographiesChildrenArgs) => ReactNode
  }

  interface GeographyStyle {
    fill?: string
    stroke?: string
    strokeWidth?: number
    outline?: string
    cursor?: string
  }

  interface GeographyProps {
    geography: Geography
    key?: string
    fill?: string
    stroke?: string
    strokeWidth?: number
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    onClick?: () => void
    style?: {
      default?: GeographyStyle
      hover?: GeographyStyle
      pressed?: GeographyStyle
    }
  }

  export const ComposableMap: ComponentType<ComposableMapProps>
  export const Geographies: ComponentType<GeographiesProps>
  export const Geography: ComponentType<GeographyProps>
}
