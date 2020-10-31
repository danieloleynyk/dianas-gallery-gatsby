import React from 'react'

import { LayoutTemplate } from '../../components/layout'
import ContactForm, { ContactFormProps } from '../../components/contactForm'

const ContactPreview = ({ entry }: any) => {
  const contactForm: ContactFormProps = entry.getIn(['data']).toJS()

  if (
    'formTitle' in contactForm &&
    contactForm.formTitle !== '' &&
    'formDescription' in contactForm &&
    contactForm.formDescription !== '' &&
    'nameField' in contactForm &&
    'name' in contactForm.nameField &&
    contactForm.nameField.name !== '' &&
    'phoneField' in contactForm &&
    'name' in contactForm.phoneField &&
    contactForm.phoneField.name !== '' &&
    'emailField' in contactForm &&
    'name' in contactForm.emailField &&
    contactForm.emailField.name !== '' &&
    'messageField' in contactForm &&
    'name' in contactForm.messageField &&
    contactForm.messageField.name !== '' &&
    'submitButton' in contactForm &&
    'name' in contactForm.submitButton &&
    contactForm.submitButton.name !== ''
  ) {
    return (
      <LayoutTemplate>
        <ContactForm {...contactForm} />
      </LayoutTemplate>
    )
  } else {
    return <div>Fill In the non optional fields...</div>
  }
}

export default ContactPreview
