import React from 'react'

import { LayoutTemplate } from '../../components/layout'
import Gallery from '../../components/gallery'
import { CategoriesProps as Props, Category, SubCategory } from './types'

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
  const categories: Category[] = data.categories

  if (
    categories.length > 0 &&
    categories.every(
      (category: Category) =>
        'sub_categories' in category &&
        category.sub_categories.every((subCategory: SubCategory) =>
          ['image', 'title', 'height', 'width', 'offset_x', 'offset_y'].every(
            (field: string) => field in subCategory
          )
        )
    )
  ) {
    return (
      <div>
        <div style={{ margin: '1em' }}>
          <h1 style={{ textDecoration: 'underline' }}>Main Page</h1>
          <GalleryTemplate
            images={categories.map((category: Category) => ({
              source: getAsset(category.image),
              width: parseInt(category.width),
              height: parseInt(category.height),
              offset_x: category.offset_x,
              offset_y: category.offset_y,
              link: `/gallery/${String(category.title).toLowerCase()}`,
              title: category.title,
            }))}
          />
        </div>
        {categories.map((category: Category) => {
          const subCategories = category.sub_categories

          return (
            <div style={{ margin: '1em' }}>
              <h1 style={{ textDecoration: 'underline' }}>{category.title}</h1>
              <GalleryTemplate
                images={subCategories.map((subCategory: SubCategory) => ({
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
          )
        })}
      </div>
    )
  } else {
    return <div>Fill In the sub categories...</div>
  }
}

export default CategoriesPreview
