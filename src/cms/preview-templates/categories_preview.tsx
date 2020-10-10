import React from 'react'

import { LayoutTemplate } from '../../components/layout'
import Gallery from '../../components/gallery'
import { Image } from '../../components/gallery/types'

export interface ImageTemplate {
  image: string
  offset_x: number
  offset_y: number
  height: string
  width: string
  title: string
}

interface Props {
  images: Image[]
}

const GalleryTemplate = ({ images }: Props) => {
  return (
    <LayoutTemplate>
      <Gallery
        style={{
          width: 'calc(6 * 155px)',
          gridTemplateColumns: 'repeat(6, 150px)',
          gridAutoRows: '150px 180px',
          padding: 0,
        }}
        images={images}
      />
    </LayoutTemplate>
  )
}

const CategoriesPreview = ({ entry, getAsset }: any) => {
  const data = entry.getIn(['data']).toJS()
  const subCategories: ImageTemplate[] = data.sub_categories

  if (
    subCategories.length > 0 &&
    subCategories.every((subCategory: ImageTemplate) =>
      ['image', 'title', 'height', 'width', 'offset_x', 'offset_y'].every(
        (field: string) => field in subCategory
      )
    )
  ) {
    return (
      <div>
        <div style={{ margin: '1em' }}>
          <GalleryTemplate
            images={subCategories.map((subCategory: ImageTemplate) => ({
              source: getAsset(subCategory.image),
              width: parseInt(subCategory.width),
              height: parseInt(subCategory.height),
              offset_x: subCategory.offset_x,
              offset_y: subCategory.offset_y,
              link: `/gallery/${String(subCategory.title).toLowerCase()}`,
              title: subCategory.title,
            }))}
          />
        </div>
        {/* <div style={{ margin: '1em' }}>
          <GalleryTemplate
            subCategories={subCategories.map(
              (subCategory: SubCategoryType) => ({
                ...subCategory,
                image: getAsset(subCategory.image),
              })
            )}
          />
        </div> */}
      </div>
    )
  } else {
    return <div>Fill In the sub categories :);</div>
  }
}

export default CategoriesPreview
