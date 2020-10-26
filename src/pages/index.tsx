import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Gallery from '../components/gallery'

const MainGallery = ({ data }: any) => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>DianaLater</title>
      </Helmet>

      <Gallery
        images={data.output.edges[0].node.childMarkdownRemark.frontmatter.categories.map(
          (category: any) => {
            return {
              source: category.image.childImageSharp.fluid,
              width: parseInt(category.width),
              height: parseInt(category.height),
              offset_x: category.offset_x,
              offset_y: category.offset_y,
              link: `/gallery/${String(category.name).toLowerCase()}`,
              title: category.title,
            }
          }
        )}
      />
    </Layout>
  )
}

export default MainGallery

export const query = graphql`
  query {
    output: allFile(
      filter: {
        sourceInstanceName: { eq: "galleries" }
        extension: { eq: "md" }
      }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              categories {
                offset_y
                offset_x
                width
                height
                title
                name
                image {
                  childImageSharp {
                    fluid(quality: 75) {
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
