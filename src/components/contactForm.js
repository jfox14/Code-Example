import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ContactFormContainer from './contactFormContainer'
import { Form, Input, Select, Button, Alert } from 'antd';

function ContactForm (props) {

  const FormItem = Form.Item;
  const Option = Select.Option;

  return (
    <Form className='form' onSubmit={props.handleSubmit}>
      <h2 className='form-title'>Request a consultation</h2>
      <p className='form-instructions'>Complete the form and Darwin's managment team will be in touch in 6-12 weeks.</p>
      <FormItem hasFeedback validateStatus={props.name.status}
        help={props.name.message}>
        <Input placeholder="Your name" id="name" value={props.name.text} onChange={props.name.onChange}/>
      </FormItem>
      <FormItem hasFeedback validateStatus={props.email.status}
        help={props.email.message}>
        <Input placeholder="Your e-mail" id="email" value={props.email.text} onChange={props.email.onChange} />
      </FormItem>
      <FormItem hasFeedback validateStatus={props.reason.status}
        help={props.reason.message}>
        <Select
          value={!props.reason.value ? 'Please select a message reason' : props.reason.value}
          onChange={props.reason.onChange}>
          { props.reasons.map(reason =>
            <Select.Option
              displayValue={reason.text}
              key={reason.value}>{reason.text}
            </Select.Option>)}
          </Select>
        </FormItem>
        <FormItem hasFeedback validateStatus={props.additionalInformation.status}
          help={props.additionalInformation.message}>
          <Input.TextArea rows={4} placeholder="Additional Information" id="additionalInformation"
            value={props.additionalInformation.text} onChange={props.additionalInformation.onChange} />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit"  disabled={!props.formReadyToSubmit}
            className="send-button" size="large">Send</Button>
        </FormItem>
        { props.showSuccessMessage ?
      <Alert message="Your message has been sent." type="success" showIcon visible={false} closable /> : null }
      </Form>
    )
  }

  ContactForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  }

  export { ContactForm }
  export default ContactFormContainer(ContactForm)
