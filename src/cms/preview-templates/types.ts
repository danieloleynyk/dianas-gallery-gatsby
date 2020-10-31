import { Image } from '../../components/gallery/types'

export interface ImageTemplate {
  image: string
  offset_x: number
  offset_y: number
  height: string
  width: string
  title: string
}

export interface SubCategory {
  image: string
  offset_x: number
  offset_y: number
  height: string
  width: string
  title: string
}

export interface Category {
  image: string
  offset_x: number
  offset_y: number
  height: string
  width: string
  title: string
  sub_categories: SubCategory[]
}

export interface CategoriesProps {
  images: Image[]
}
