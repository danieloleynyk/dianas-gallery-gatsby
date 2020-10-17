import React from 'react'
import styles from './contact_form.module.css'

const ContactForm = () => {
  return (
    <div className={styles.root}>
      <h1 style={{ fontSize: '1.5em', width: '80%' }}>
        Lorem ipsum Lorem ipsoum ipsum Lorem ipsoum ipsum Lorem ipsoum ipsum
        Lorem ipsoum ipsum Lorem ipsoumLorem ipsoum ipsum Lorem ipsoum ipsum
        Lorem ipsoumLorem ipsoum ipsum Lorem ipsoum ipsum Lorem ipsoumLorem
        ipsoum ipsum Lorem ipsoum ipsum Lorem ipsoum
      </h1>
      <div>
        <form name="contact" method="POST" data-netlify="true">
          <p>
            <label>
              Name: <br />
              <input type="text" name="name" />
            </label>
          </p>
          <p>
            <label>
              Email: <br />
              <input type="email" name="email" />
            </label>
          </p>
          <p>
            <label>
              Message: <br />
              <textarea name="message" rows={5}></textarea>
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
