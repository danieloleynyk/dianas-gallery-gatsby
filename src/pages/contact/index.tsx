import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import ContactForm, { ContactFormProps } from '../../components/contactForm'
import Helmet from 'react-helmet'

const ContactPage = ({ data }: any) => {
  const contactForm: ContactFormProps = {
    ...data.output.edges[0].node.childMarkdownRemark.frontmatter,
  }

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>DianaLater - Contact</title>
      </Helmet>
      <ContactForm {...contactForm} />
    </Layout>
  )
}

export default ContactPage

export const query = graphql`
  query {
    output: allFile(filter: { sourceInstanceName: { eq: "contact" } }) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              languege
              formTitle
              formDescription
              nameField {
                name
                placeholder
              }
              phoneField {
                name
              }
              emailField {
                name
              }
              messageField {
                name
                placeholder
              }
              submitButton {
                name
              }
            }
          }
        }
      }
    }
  }
`
