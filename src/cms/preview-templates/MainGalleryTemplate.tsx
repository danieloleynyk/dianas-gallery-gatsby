import React from 'react'
import {
  MainGalleryTemplate,
  SubCategoryType,
} from '../../templates/main-gallery'

const MainGalleryPreview = ({ entry, getAsset }: any) => {
  const data = entry.getIn(['data']).toJS()
  const subCategories: SubCategoryType[] = data.sub_categories

  if (
    subCategories.length > 0 &&
    subCategories.every((subCategory: SubCategoryType) =>
      ['image', 'title', 'height', 'width', 'offset_x', 'offset_y'].every(
        (field: string) => field in subCategory
      )
    )
  ) {
    return (
      <MainGalleryTemplate
        subCategories={subCategories.map((subCategory: SubCategoryType) => ({
          ...subCategory,
          image: getAsset(subCategory.image),
        }))}
      />
    )
  } else {
    return <div>Fill In the sub categories :)</div>
  }
}

export default MainGalleryPreview
