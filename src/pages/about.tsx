import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import About, { AboutProps } from '../components/about'

const AboutPage = ({ data }: any) => {
  const aboutProps: AboutProps = {
    ...data.output.edges[0].node.childMarkdownRemark.frontmatter,
  }

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>DianaLater - About</title>
      </Helmet>
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
