import React, { useState } from 'react'
import { navigate } from 'gatsby'
import styles from './contact_form.module.css'

import { IconContext } from 'react-icons'
import { VscLoading } from 'react-icons/vsc'

export interface ContactFormProps {
  languege: string
  formTitle: string
  formDescription: string
  nameField: {
    name: string
    placeholder: string
  }
  phoneField: {
    name: string
    placeholder: string
  }
  emailField: {
    name: string
    placeholder: string
  }
  messageField: {
    name: string
    placeholder: string
  }
  submitButton: {
    name: string
  }
}

const ContactForm = (contactForm: ContactFormProps) => {
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
    <div
      className={styles.root}
      dir={contactForm.languege === 'he' ? 'rtl' : 'ltr'}
    >
      <h1 className={styles.main_title} style={{ fontSize: '1.5em' }}>
        {contactForm.formTitle}
      </h1>

      <p style={{ textAlign: 'center' }}>{contactForm.formDescription}</p>
      <div>
        <form
          name="contact"
          method="POST"
          action="/contact/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <input type="hidden" name="form-name" value="contact" />

          <p>
            <label>
              {contactForm.nameField.name}: <br />
              <input
                type="text"
                name="name"
                placeholder={contactForm.nameField.placeholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </p>
          <p>
            <label>
              {contactForm.phoneField.name}: <br />
              <input
                type="tel"
                name="phone"
                placeholder={contactForm.nameField.placeholder}
                required
              />
            </label>
          </p>
          <p>
            <label>
              {contactForm.emailField.name}: <br />
              <input
                type="email"
                name="email"
                placeholder={contactForm.emailField.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </p>
          <p>
            <label>
              {contactForm.messageField.name}: <br />
              <textarea
                name="message"
                rows={5}
                cols={5}
                value={message}
                placeholder={contactForm.messageField.name}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </label>
          </p>
          <p className={styles.button_paragraph}>
            <button
              type="submit"
              className={styles.submit_button}
              disabled={isLoading}
            >
              {isLoading ? (
                <IconContext.Provider value={{ color: 'white' }}>
                  <div className={styles.icon}>
                    <VscLoading />
                  </div>
                </IconContext.Provider>
              ) : (
                contactForm.submitButton.name
              )}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
