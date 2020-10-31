import React from 'react'

import { LayoutTemplate } from '../../components/layout'
import About, { AboutProps } from '../../components/about'

const AboutPreview = ({ entry }: any) => {
  const about: AboutProps = entry.getIn(['data']).toJS()
  console.log(about)

  if (
    'title' in about &&
    about.title !== '' &&
    'content' in about &&
    about.content.length > 0 &&
    about.content.every((paragraph: any) => paragraph.paragraph !== '')
  ) {
    return (
      <LayoutTemplate>
        <About {...about} />
      </LayoutTemplate>
    )
  } else {
    return <div>Fill In the non optional fields...</div>
  }
}

export default AboutPreview
