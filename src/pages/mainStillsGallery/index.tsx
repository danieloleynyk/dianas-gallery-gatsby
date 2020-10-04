import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../../components/layout'
import styles from './mainGallery.module.css'
import clsx from 'clsx'

const MainGallery = ({ data }: any) => {
  const categories = data.categories.edges

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
        {categories.map((categoryFetched: any) => {
          const category = categoryFetched.node.childMarkdownRemark.frontmatter
          return (
            <div
              key={categoryFetched.node.id}
              className={clsx(
                styles.gallery_container,
                availableHeights[category.height],
                availableWidths[category.width]
              )}
            >
              <div className={styles.gallery_item}>
                <div className={styles.image}>
                  <Img
                    fluid={category.img.childImageSharp.fluid}
                    className={styles.image}
                    imgStyle={{
                      objectFit: 'cover',
                      objectPosition: `${category.offset_x}% ${category.offset_y}%`,
                    }}
                  />
                </div>
                <div className={styles.text}>{category.title}</div>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default MainGallery

export const query = graphql`
  query {
    categories: allFile(
      filter: {
        sourceInstanceName: { eq: "sub_categories" }
        extension: { eq: "md" }
      }
    ) {
      edges {
        node {
          id
          childMarkdownRemark {
            frontmatter {
              offset_x
              offset_y
              height
              width
              title
              img {
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
`
