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
        images={data.categories.edges.map((categoryFetched: any) => {
          const category = categoryFetched.node.childMarkdownRemark.frontmatter

          return {
            source: category.image.childImageSharp.fluid,
            width: parseInt(category.width),
            height: parseInt(category.height),
            offset_x: category.offset_x,
            offset_y: category.offset_y,
            link: `/gallery/${String(category.title).toLowerCase()}`,
            title: category.title,
          }
        })}
      />
    </Layout>
  )
}

export default MainGallery

export const query = graphql`
  query {
    categories: allFile(
      filter: { sourceInstanceName: { eq: "content" }, extension: { eq: "md" } }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              offset_y
              offset_x
              width
              height
              title
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
`
