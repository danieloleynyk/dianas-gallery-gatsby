import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql, StaticQuery } from 'gatsby'

interface Props {
  title?: string
  description?: string
  url?: string
  image?: string
}

const SEO = ({ title, description, url, image }: Props) => {
  return (
    <StaticQuery
      query={query}
      render={(data: any) => {
        const metaTitle = title || data.site.siteMetadata.title
        const metaDescription =
          description || data.site.siteMetadata.description
        const metaUrl = url || data.site.siteMetadata.url
        const metaImage = image || data.site.siteMetadata.image

        return (
          <Helmet title={metaTitle}>
            <meta charSet="utf-8" />
            <meta name="description" content={metaDescription} />
            <meta name="image" content={metaImage} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
          </Helmet>
        )
      }}
    />
  )
}

export default SEO

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        author
        description
        image
        title
        url
      }
    }
  }
`
