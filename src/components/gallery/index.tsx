import React, { CSSProperties } from 'react'
import Img, { FluidObject } from 'gatsby-image'
import { Link } from 'gatsby'
import clsx from 'clsx'

import styles from './gallery.module.css'
import { Image } from './types'

interface Props {
  images: Image[]
  style?: CSSProperties
}

const Gallery = ({ images, style }: Props) => {
  const availableWidths: { [id: number]: any } = {
    1: styles.w1,
    2: styles.w2,
    3: styles.w3,
    4: styles.w4,
    5: styles.w5,
    6: styles.w6,
  }

  const availableHeights: { [id: number]: any } = {
    1: styles.h1,
    2: styles.h2,
    3: styles.h3,
    4: styles.h4,
    5: styles.h5,
    6: styles.h6,
  }

  return (
    <div className={styles.gallery} style={style}>
      {images.map((image: Image, index: number) => {
        return (
          <div
            key={index}
            className={clsx(
              styles.gallery_container,
              availableHeights[image.height],
              availableWidths[image.width]
            )}
          >
            <Link to={image.link} aria-label={image.title}>
              <div className={styles.gallery_item}>
                <div className={styles.image}>
                  {'srcSet' in (image.source as any) ? (
                    <Img
                      fluid={image.source as FluidObject}
                      className={styles.image}
                      imgStyle={{
                        objectFit: 'cover',
                        objectPosition: `${image.offset_x}% ${image.offset_y}%`,
                      }}
                    />
                  ) : (
                    <img
                      src={image.source as string}
                      style={{
                        objectFit: 'cover',
                        objectPosition: `${image.offset_x}% ${image.offset_y}%`,
                        height: '100%',
                        width: '100%',
                      }}
                    />
                  )}
                </div>
                <div className={styles.text}>{image.title}</div>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Gallery
