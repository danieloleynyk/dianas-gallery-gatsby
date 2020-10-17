import React from 'react'
import { navigate } from 'gatsby'

import styles from '../footer/footer.module.css'

const Footer = () => {
  return (
    <div className={styles.root}>
      <div className={styles.links}>
        <h1 onClick={() => navigate('/')}>Home</h1>
        <h1 onClick={() => navigate('/about')}>About</h1>
        <h1 onClick={() => navigate('/contact')}>Contact</h1>
      </div>
    </div>
  )
}

export default Footer
