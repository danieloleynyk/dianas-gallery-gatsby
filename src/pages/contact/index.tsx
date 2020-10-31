import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import ContactForm, { ContactFormProps } from '../../components/contactForm'

const ContactPage = ({ data }: any) => {
  const contactForm: ContactFormProps = {
    ...data.output.edges[0].node.childMarkdownRemark.frontmatter,
  }

  return (
    <Layout>
      <SEO title="DianaLater - Contact" />

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
