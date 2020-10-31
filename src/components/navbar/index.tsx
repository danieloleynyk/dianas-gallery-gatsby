import React from 'react'
import { StaticQuery, graphql, Link, navigate } from 'gatsby'
import Img from 'gatsby-image'

import styles from './navbar.module.css'

import { IconContext } from 'react-icons'
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiMenuLine,
  RiCloseLine,
  RiAccountCircleFill,
  RiMessage2Fill,
} from 'react-icons/ri'

export type NavbarProps = {
  isMenuOpen: boolean
  setMenuOpen: () => void
}

export const NavbarTemplate = (navbarProps: NavbarProps) => {
  return (
    <div className={styles.navbar}>
      <Link to="/">
        <div className={styles.logo}></div>
      </Link>

      <div className={styles.menubar}>
        <SocialMediaSet hints={true} />
        <IconContext.Provider value={{ color: 'white' }}>
          <div className={styles.menu_icon} onClick={navbarProps.setMenuOpen}>
            {navbarProps.isMenuOpen ? <RiCloseLine /> : <RiMenuLine />}
          </div>
        </IconContext.Provider>
      </div>

      {navbarProps.isMenuOpen && (
        <div className={styles.mobile_menu}>
          <hr className={styles.hr} />
          <h2 className={styles.link}>Home</h2>
          <h2 className={styles.link}>About</h2>
          <h2 className={styles.link}>Contact</h2>
          <div className={styles.menubar}>
            <SocialMediaSet hints={false} />
          </div>
          <hr className={styles.hr} style={{ marginTop: '1em' }} />
        </div>
      )}
    </div>
  )
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
                    fixed(height: 70) {
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
        <IconContext.Provider value={{ color: 'white' }}>
          <div className={styles.icon} data-name="About">
            <Link to="/about">
              <RiAccountCircleFill />
            </Link>
          </div>
        </IconContext.Provider>
        <IconContext.Provider value={{ color: 'white' }}>
          <div className={styles.icon} data-name="Contact">
            <Link to="/contact">
              <RiMessage2Fill />
            </Link>
          </div>
        </IconContext.Provider>
        <SocialMediaSet hints={true} />
        <IconContext.Provider value={{ color: 'white' }}>
          <div className={styles.menu_icon} onClick={navbarProps.setMenuOpen}>
            {navbarProps.isMenuOpen ? <RiCloseLine /> : <RiMenuLine />}
          </div>
        </IconContext.Provider>
      </div>

      {navbarProps.isMenuOpen && (
        <div className={styles.mobile_menu}>
          <hr className={styles.hr} />
          <h2 className={styles.link} onClick={() => navigate('/')}>
            Home
          </h2>
          <h2 className={styles.link} onClick={() => navigate('/about')}>
            About
          </h2>
          <h2 className={styles.link} onClick={() => navigate('/contact')}>
            Contact
          </h2>
          <div className={styles.menubar}>
            <SocialMediaSet hints={false} />
          </div>
          <hr className={styles.hr} style={{ marginTop: '1em' }} />
        </div>
      )}
    </div>
  )
}

interface SocialMediaSetProps {
  hints: Boolean
}

const SocialMediaSet = ({ hints }: SocialMediaSetProps) => (
  <>
    <IconContext.Provider value={{ color: 'white' }}>
      <div className={styles.icon} data-name={hints ? 'Instagram' : ''}>
        <a
          href="https://www.instagram.com/diana_photographer/"
          aria-label="Instagram"
          target="_blank"
          rel="noreferrer nofollow"
        >
          <RiInstagramFill />
        </a>
      </div>
    </IconContext.Provider>
    <IconContext.Provider value={{ color: 'white' }}>
      <div className={styles.icon} data-name={hints ? 'Facebook' : ''}>
        <a
          href="https://www.facebook.com/diana1later8artist/"
          aria-label="Facebook"
          target="_blank"
          rel="noreferrer nofollow"
        >
          <RiFacebookCircleFill />
        </a>
      </div>
    </IconContext.Provider>
  </>
)

export default Navbar
