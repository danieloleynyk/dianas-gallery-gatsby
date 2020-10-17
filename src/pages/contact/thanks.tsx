import React, { CSSProperties } from 'react'
import Layout from '../../components/layout'

const ThanksPage = () => {
  const rootDiv: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <Layout>
      <div style={rootDiv}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: 'translateY(-50%)',
          }}
        >
          <h1 style={{ color: 'white', fontSize: '4rem', margin: 0 }}>
            Thank You For Your Submission
          </h1>
          <h2
            style={{ color: 'white', fontSize: '1.5rem', margin: 0 }}
          >{`See you soon :)`}</h2>
        </div>
      </div>
    </Layout>
  )
}

export default ThanksPage
