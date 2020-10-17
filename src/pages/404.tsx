import React, { CSSProperties } from 'react'
import Layout from '../components/layout'

const NotFoundPage = () => {
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
            Error 404
          </h1>
          <h2
            style={{ color: 'white', fontSize: '1.5rem', margin: 0 }}
          >{`Page Not Found :(`}</h2>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage
