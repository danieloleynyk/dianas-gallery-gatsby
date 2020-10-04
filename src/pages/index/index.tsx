import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../../components/layout'
import styles from './index.module.css'
import clsx from 'clsx'

const MainGallery = ({ data }: any) => {
  return (
    <Layout>
      <div className={styles.gallery}>
        {data.categories.edges.map((categoryFetched: any) => {
          const category = categoryFetched.node.childMarkdownRemark.frontmatter
          return (
            <div
              className={clsx(styles.gallery_container)}
              key={categoryFetched.node.id}
            >
              <Link to={`/${String(category.title).toLowerCase()}`}>
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
  query {
    categories: allFile(
      filter: { sourceInstanceName: { eq: "main" }, extension: { eq: "md" } }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              offset_y
              offset_x
              img {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              title
            }
          }
        }
      }
    }
  }
`
