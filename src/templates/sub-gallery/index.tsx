import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import SEO from '../../components/seo'
import Layout from '../../components/layout'
import styles from './subGallery.module.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

import ReactPlayer from 'react-player/youtube'

const ChosenGallery = ({ data, location }: any) => {
  const { pathname, href } = location
  const mainCategoryName = String(pathname).split('/').slice(-2)[0]
  const subCategoryName = String(pathname).split('/').slice(-1)[0]

  const category = data.category.edges[0].node.childMarkdownRemark.frontmatter.categories.find(
    (category: any) => String(category.name).toLowerCase() === mainCategoryName
  )

  const subCategory =
    category !== undefined
      ? category.sub_categories.find(
          (subCategory: any) =>
            String(subCategory.name).toLowerCase() === subCategoryName &&
            'gallery' in subCategory &&
            subCategory.gallery !== null &&
            'files' in subCategory.gallery &&
            subCategory.gallery.files !== null
        )
      : undefined

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
      <SEO
        title={`DianaLater - ${
          String(category.name).charAt(0).toUpperCase() +
          String(category.name).slice(1)
        } - ${
          String(subCategory.name).charAt(0).toUpperCase() +
          String(subCategory.name).slice(1)
        }`}
        description={`A ${subCategory.name} gallery by Diana Later`}
        url={href}
      />

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
                  <div
                    className={styles.video_player}
                    style={{ height: '60vh', width: '100%' }}
                  >
                    <ReactPlayer
                      controls
                      url={asset.video}
                      height="80%"
                      width="80%"
                    />
                  </div>
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
  query {
    category: allFile(filter: { sourceInstanceName: { eq: "galleries" } }) {
      edges {
        node {
          id
          childMarkdownRemark {
            frontmatter {
              categories {
                title
                name
                sub_categories {
                  title
                  name
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
                      video
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
