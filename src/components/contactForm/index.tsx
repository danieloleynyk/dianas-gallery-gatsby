import React, { useState } from 'react'
import { navigate } from 'gatsby'
import styles from './contact_form.module.css'

import { IconContext } from 'react-icons'
import { VscLoading } from 'react-icons/vsc'

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setLoading] = useState(false)

  const encode = (data: { [key: string]: any }) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      )
      .join('&')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    setLoading(true)
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        name: name,
        email: email,
        message: message,
      }),
    })
      .then(() => navigate(form.action))
      .catch((error) => {
        setLoading(false)
        alert(error)
      })
  }

  return (
    <div className={styles.root}>
      <h1 style={{ fontSize: '1.5em', width: '80%' }}>
        Do you want to work with me?
      </h1>
      <div>
        <form
          name="contact"
          method="POST"
          action="/contact/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />

          <p>
            <label>
              Name: <br />
              <input
                type="text"
                name="name"
                placeholder="John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </p>
          <p>
            <label>
              Phone: <br />
              <input type="tel" name="phone" required />
            </label>
          </p>
          <p>
            <label>
              Email: <br />
              <input
                type="email"
                name="email"
                placeholder="john@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </p>
          <p>
            <label>
              Message: <br />
              <textarea
                name="message"
                rows={5}
                value={message}
                placeholder="An informative message that will help us work together"
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </label>
          </p>
          <p>
            <button type="submit" className={styles.submit_button}>
              {isLoading ? (
                <IconContext.Provider value={{ color: 'white' }}>
                  <div className={styles.icon}>
                    <VscLoading />
                  </div>
                </IconContext.Provider>
              ) : (
                'Submit'
              )}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
