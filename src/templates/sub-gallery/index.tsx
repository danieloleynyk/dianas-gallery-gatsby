import React, { ReactChild, ReactNode } from 'react'
import { graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import Layout from '../../components/layout'
import styles from './subGallery.module.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

const ChosenGallery = ({ data, location }: any) => {
  const { pathname } = location
  const subCategoryTitle = String(pathname).split('/').slice(-1)[0]

  const images = data.category.edges[0].node.childMarkdownRemark.frontmatter.sub_categories
    .filter(
      (subCategory: any) =>
        String(subCategory.title).toLowerCase() === subCategoryTitle
    )[0]
    .gallery.files.map((file: any) => file.file)

  const customRenderThumbs = (children: any) =>
    children.map((item: { key: number }) => {
      return (
        <div
          style={{
            height: '7vh',
          }}
        >
          <Img
            fluid={images[item.key].childImageSharp.fluid}
            loading="lazy"
            style={{ height: '100%' }}
            imgStyle={{
              height: '100%',
              objectFit: 'cover',
              objectPosition: '100% 20%',
            }}
            alt=""
          />
        </div>
      )
    })

  return (
    <Layout>
      <div className={styles.root}>
        <Carousel
          className={styles.carousel}
          showStatus={false}
          renderThumbs={customRenderThumbs}
          infiniteLoop
        >
          {images.map((image: any, index: number) => {
            return (
              <div
                className={styles.image}
                key={index}
                style={{
                  height: '100%',
                  width: '100%',
                }}
              >
                <Img
                  fluid={image.childImageSharp.fluid}
                  loading="lazy"
                  className={styles.image}
                  imgStyle={{
                    objectFit: 'contain',
                  }}
                />
              </div>
            )
          })}
        </Carousel>
      </div>
    </Layout>
  )
}

export default ChosenGallery

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
              sub_categories {
                title
                gallery {
                  files {
                    file {
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
    }
  }
`
