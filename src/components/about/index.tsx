import React from 'react'
import styles from './about.module.css'

export interface AboutProps {
  languege: String
  title: String
  content: String[]
}

const About = ({ languege, title, content }: AboutProps) => {
  return (
    <div className={styles.root} dir={languege === 'he' ? 'rtl' : 'ltr'}>
      <h1 className={styles.main_title}>{title}</h1>
      <div className={styles.content}>
        {content.map((paragraph: any) => (
          <p>{paragraph.paragraph}</p>
        ))}
      </div>
    </div>
  )
}

export default About
