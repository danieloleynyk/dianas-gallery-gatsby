import React, { useState } from 'react'
import { navigate } from 'gatsby'
import styles from './contact_form.module.css'

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

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
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.name,
        name: name,
        email: email,
        message: message,
      }),
    })
      .then(() => navigate(form.action))
      .catch((error) => alert(error))
  }

  return (
    <div className={styles.root}>
      <h1 style={{ fontSize: '1.5em', width: '80%' }}>
        Do you want to work with me?
      </h1>
      <div>
        <form
          name="contact"
          method="post"
          action="/contact/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <p>
            <label>
              Name: <br />
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Email: <br />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </label>
          </p>
          <p>
            <button type="submit" className={styles.submit_button}>
              Submit
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
