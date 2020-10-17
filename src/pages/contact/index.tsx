import React from 'react'
import Layout from '../../components/layout'
import ContactForm from '../../components/contactForm'
import Helmet from 'react-helmet'

const ContactPage = () => (
  <Layout>
    <Helmet>
      <meta charSet="utf-8" />
      <title>DianaLater - Contact</title>
    </Helmet>
    <ContactForm />
  </Layout>
)

export default ContactPage
