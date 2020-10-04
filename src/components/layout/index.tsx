import React, { ReactNode, useState } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import styles from './layout.module.css'
import Navbar from '../navbar'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={(data) => (
        <div className={styles.root}>
          <Helmet title={data.site.siteMetadata.title}>
            <html lang="en" />
          </Helmet>
          <Navbar
            isMenuOpen={isMenuOpen}
            setMenuOpen={() => setMenuOpen(!isMenuOpen)}
          />
          <div className={styles.body}>{children}</div>
        </div>
      )}
    />
  )
}

export default Layout
