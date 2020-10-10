import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import Layout, { LayoutTemplate } from '../components/layout'
import Gallery from '../components/gallery'

export interface SubCategoryType {
  image: string
  offset_x: number
  offset_y: number
  height: string
  width: string
  title: string
}

interface Props {
  subCategories: SubCategoryType[]
}

export const MainGalleryTemplate = ({ subCategories }: Props) => {
  return (
    <LayoutTemplate>
      <Gallery
        style={{
          width: 'calc(6 * 155px)',
          gridTemplateColumns: 'repeat(6, 150px)',
          gridAutoRows: '150px 180px',
          padding: 0,
        }}
        images={subCategories.map((subCategory: SubCategoryType) => ({
          source: subCategory.image,
          width: parseInt(subCategory.width),
          height: parseInt(subCategory.height),
          offset_x: subCategory.offset_x,
          offset_y: subCategory.offset_y,
          link: `${String(subCategory.title).toLowerCase()}`,
          title: subCategory.title,
        }))}
      />
    </LayoutTemplate>
  )
}

const MainGallery = ({ data }: any) => {
  const categories =
    data.category.edges[0].node.childMarkdownRemark.frontmatter.sub_categories
  const mainCategoryTitle =
    data.category.edges[0].node.childMarkdownRemark.frontmatter.title

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>DianaLater - {mainCategoryTitle}</title>
      </Helmet>
      <Gallery
        images={categories.map((category: any) => ({
          source: category.image.childImageSharp.fluid as FluidObject,
          width: category.width,
          height: category.height,
          offset_x: category.offset_x,
          offset_y: category.offset_y,
          link: `/gallery/${String(mainCategoryTitle).toLowerCase()}/${String(
            category.title
          ).toLowerCase()}`,
          title: category.title,
        }))}
      />
    </Layout>
  )
}

export default MainGallery

export const query = graphql`
  query($category: String!) {
    category: allFile(
      filter: {
        sourceInstanceName: { eq: "content" }
        childMarkdownRemark: { frontmatter: { title: { eq: $category } } }
      }
    ) {
      edges {
        node {
          id
          childMarkdownRemark {
            frontmatter {
              title
              sub_categories {
                offset_x
                offset_y
                height
                width
                title
                image {
                  childImageSharp {
                    fluid(quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
