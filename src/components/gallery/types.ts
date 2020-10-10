import { FluidObject } from 'gatsby-image'

export interface Image {
  source: FluidObject | string
  width: number
  height: number
  offset_x: number
  offset_y: number
  link: string
  title: string
}
