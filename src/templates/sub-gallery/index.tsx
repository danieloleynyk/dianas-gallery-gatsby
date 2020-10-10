import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../../components/layout'
import styles from './subGallery.module.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

import ReactPlayer from 'react-player/lazy'

const ChosenGallery = ({ data, location }: any) => {
  const { pathname } = location
  const mainCategoryTitle =
    data.category.edges[0].node.childMarkdownRemark.frontmatter.title
  const subCategoryTitle = String(pathname).split('/').slice(-1)[0]

  const subCategory = data.category.edges[0].node.childMarkdownRemark.frontmatter.sub_categories.find(
    (subCategory: any) =>
      String(subCategory.title).toLowerCase() === subCategoryTitle &&
      'gallery' in subCategory &&
      subCategory.gallery !== null &&
      'files' in subCategory.gallery &&
      subCategory.gallery.files !== null
  )

  const assets = subCategory !== undefined ? [...subCategory.gallery.files] : []

  const customRenderThumbs = (children: any) =>
    children.map((item: { key: number }) => {
      return (
        <div
          style={{
            height: '7vh',
          }}
          key={item.key}
        >
          <Img
            fluid={assets[item.key].file.childImageSharp.fluid}
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          DianaLater - {mainCategoryTitle} -
          {' ' +
            subCategoryTitle.charAt(0).toUpperCase() +
            subCategoryTitle.slice(1)}
        </title>
      </Helmet>
      <div className={styles.root}>
        <Carousel
          className={styles.carousel}
          showStatus={false}
          renderThumbs={customRenderThumbs}
          infiniteLoop
        >
          {assets.map((asset: any, index: number) => {
            return (
              <div
                className={styles.image}
                key={index}
                style={{
                  height: '100%',
                  width: '100%',
                }}
              >
                {asset.video === null ? (
                  <Img
                    fluid={asset.file.childImageSharp.fluid}
                    loading="lazy"
                    className={styles.image}
                    imgStyle={{
                      objectFit: 'contain',
                    }}
                  />
                ) : (
                  asset.video.extension == 'mp4' && (
                    <div
                      className={styles.video_player}
                      style={{ height: '60vh', width: '100%' }}
                    >
                      <ReactPlayer
                        controls
                        url={`/assets/${asset.video.relativePath}`}
                        height="80%"
                        width="80%"
                      />
                    </div>
                  )
                )}
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
              title
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
                      relativePath
                    }
                    video {
                      publicURL
                      relativePath
                      extension
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
