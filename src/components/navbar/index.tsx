import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './navbar.module.css'

import { IconContext } from 'react-icons'
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiPinterestFill,
  RiMenuLine,
  RiCloseLine,
} from 'react-icons/ri'

export type NavbarProps = {
  isMenuOpen: boolean
  setMenuOpen: () => void
}

const Navbar = (navbarProps: NavbarProps) => {
  return (
    <div className={styles.navbar}>
      <Link to="/">
        <div className={styles.logo}>
          <StaticQuery
            query={graphql`
              query {
                file(relativePath: { eq: "logo.png" }) {
                  childImageSharp {
                    fixed(height: 80) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
              }
            `}
            render={(data) => (
              <Img
                fixed={data.file.childImageSharp.fixed}
                alt="A corgi smiling happily"
              />
            )}
          />
        </div>
      </Link>
      <div className={styles.menubar}>
        <SocialMediaSet />
      </div>
      <IconContext.Provider value={{ color: 'white' }}>
        <div className={styles.menu_icon} onClick={navbarProps.setMenuOpen}>
          {navbarProps.isMenuOpen ? <RiCloseLine /> : <RiMenuLine />}
        </div>
      </IconContext.Provider>

      {navbarProps.isMenuOpen && (
        <div className={styles.mobile_menu}>
          <hr className={styles.hr} />
          <h2 className={styles.link}>Home</h2>
          <h2 className={styles.link}>About</h2>
          <h2 className={styles.link}>Contact</h2>
          <div className={styles.menubar}>
            <SocialMediaSet />
          </div>
          <hr className={styles.hr} style={{ marginTop: '1em' }} />
        </div>
      )}
    </div>
  )
}

const SocialMediaSet = () => (
  <>
    <IconContext.Provider value={{ color: 'white' }}>
      <div className={styles.icon}>
        <RiInstagramFill />
      </div>
    </IconContext.Provider>
    <IconContext.Provider value={{ color: 'white' }}>
      <div className={styles.icon}>
        <RiFacebookCircleFill />
      </div>
    </IconContext.Provider>
    <IconContext.Provider value={{ color: 'white' }}>
      <div className={styles.icon}>
        <RiPinterestFill />
      </div>
    </IconContext.Provider>
  </>
)

export default Navbar
