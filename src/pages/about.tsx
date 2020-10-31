import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import About, { AboutProps } from '../components/about'
import SEO from '../components/seo'

const AboutPage = ({ data }: any) => {
  const aboutProps: AboutProps = {
    ...data.output.edges[0].node.childMarkdownRemark.frontmatter,
  }

  return (
    <Layout>
      <SEO title="DianaLater - About" />
      <About {...aboutProps} />
    </Layout>
  )
}

export default AboutPage

export const query = graphql`
  query {
    output: allFile(filter: { sourceInstanceName: { eq: "about" } }) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              languege
              content {
                paragraph
              }
            }
          }
        }
      }
    }
  }
`
