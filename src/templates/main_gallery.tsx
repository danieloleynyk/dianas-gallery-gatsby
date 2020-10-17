import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import Layout from '../components/layout'
import Gallery from '../components/gallery'

const MainGallery = ({ data, location }: any) => {
  const { pathname } = location

  const categories =
    data.output.edges[0].node.childMarkdownRemark.frontmatter.categories

  const urlParams = String(pathname).split('/')
  const mainCategoryTitle = String(urlParams.pop()) || String(urlParams.pop())

  const category = categories.find(
    (category: any) =>
      String(category.title).toLowerCase() === mainCategoryTitle.toLowerCase()
  )

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          DianaLater -{' '}
          {mainCategoryTitle.charAt(0).toUpperCase() +
            mainCategoryTitle.slice(1)}
        </title>
      </Helmet>
      <Gallery
        images={category.sub_categories.map((sub_category: any) => ({
          source: sub_category.image.childImageSharp.fluid as FluidObject,
          width: sub_category.width,
          height: sub_category.height,
          offset_x: sub_category.offset_x,
          offset_y: sub_category.offset_y,
          link: `/gallery/${String(mainCategoryTitle).toLowerCase()}/${String(
            sub_category.title
          ).toLowerCase()}`,
          title: sub_category.title,
        }))}
      />
    </Layout>
  )
}

export default MainGallery

export const query = graphql`
  query {
    output: allFile(filter: { sourceInstanceName: { eq: "content" } }) {
      edges {
        node {
          id
          childMarkdownRemark {
            frontmatter {
              categories {
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
  }
`
