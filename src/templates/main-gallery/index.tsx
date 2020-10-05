import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import Layout, { LayoutTemplate } from '../../components/layout'
import styles from './mainGallery.module.css'
import clsx from 'clsx'

export interface SubCategoryType {
  image: any
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
  const availableWidths: { [id: number]: any } = {
    1: styles.w1,
    2: styles.w2,
    3: styles.w3,
    4: styles.w4,
    5: styles.w5,
    6: styles.w6,
  }

  const availableHeights: { [id: number]: any } = {
    1: styles.h1,
    2: styles.h2,
    3: styles.h3,
    4: styles.h4,
    5: styles.h5,
    6: styles.h6,
  }

  return (
    <LayoutTemplate>
      <div
        className={styles.gallery}
        style={{
          width: 'calc(6 * 155px)',
          gridTemplateColumns: 'repeat(6, 150px)',
          gridAutoRows: '150px 180px',
          padding: 0,
        }}
      >
        {subCategories.map((category: SubCategoryType, index: number) => {
          return (
            <div
              key={index}
              className={clsx(
                styles.gallery_container,
                availableHeights[parseInt(category.height)],
                availableWidths[parseInt(category.width)]
              )}
            >
              <div className={styles.gallery_item}>
                <div className={styles.image}>
                  <img
                    src={category.image}
                    style={{
                      objectFit: 'cover',
                      objectPosition: `${category.offset_x}% ${category.offset_y}%`,
                      height: '100%',
                      width: '100%',
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </LayoutTemplate>
  )
}

const MainGallery = ({ data }: any) => {
  const categories =
    data.category.edges[0].node.childMarkdownRemark.frontmatter.sub_categories
  const mainCategoryTitle =
    data.category.edges[0].node.childMarkdownRemark.frontmatter.title

  const availableWidths: { [id: number]: any } = {
    1: styles.w1,
    2: styles.w2,
    3: styles.w3,
  }

  const availableHeights: { [id: number]: any } = {
    1: styles.h1,
    2: styles.h2,
    3: styles.h3,
  }

  return (
    <Layout>
      <div className={styles.gallery}>
        {categories.map((category: any, index: number) => {
          return (
            <div
              key={index}
              className={clsx(
                styles.gallery_container,
                availableHeights[category.height],
                availableWidths[category.width]
              )}
            >
              <Link
                to={`/${String(mainCategoryTitle).toLowerCase()}/${String(
                  category.title
                ).toLowerCase()}`}
              >
                <div className={styles.gallery_item}>
                  <div className={styles.image}>
                    <Img
                      fluid={category.image.childImageSharp.fluid}
                      className={styles.image}
                      imgStyle={{
                        objectFit: 'cover',
                        objectPosition: `${category.offset_x}% ${category.offset_y}%`,
                      }}
                    />
                  </div>
                  <div className={styles.text}>{category.title}</div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
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
