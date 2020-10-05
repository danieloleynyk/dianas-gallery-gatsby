import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../../components/layout'
import styles from './mainGallery.module.css'
import clsx from 'clsx'

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
