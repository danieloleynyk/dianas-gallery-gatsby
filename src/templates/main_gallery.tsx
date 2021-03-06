import React from 'react'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import Layout from '../components/layout'
import Gallery from '../components/gallery'
import SEO from '../components/seo'

const MainGallery = ({ data, location }: any) => {
  const { pathname, href } = location

  const categories =
    data.output.edges[0].node.childMarkdownRemark.frontmatter.categories

  const urlParams = String(pathname).split('/')
  const mainCategoryName = String(urlParams.pop()) || String(urlParams.pop())

  const category = categories.find(
    (category: any) =>
      String(category.name).toLowerCase() === mainCategoryName.toLowerCase()
  )

  return (
    <Layout>
      <SEO
        title={`DianaLater - ${
          String(category.name).charAt(0).toUpperCase() +
          String(category.name).slice(1)
        }`}
        description={`A ${category.name} gallery by Diana Later`}
        url={href}
      />

      <Gallery
        images={category.sub_categories.map((sub_category: any) => ({
          source: sub_category.image.childImageSharp.fluid as FluidObject,
          width: sub_category.width,
          height: sub_category.height,
          offset_x: sub_category.offset_x,
          offset_y: sub_category.offset_y,
          link: `/gallery/${String(category.name).toLowerCase()}/${String(
            sub_category.name
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
    output: allFile(filter: { sourceInstanceName: { eq: "galleries" } }) {
      edges {
        node {
          id
          childMarkdownRemark {
            frontmatter {
              categories {
                title
                name
                sub_categories {
                  offset_x
                  offset_y
                  height
                  width
                  title
                  name
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
