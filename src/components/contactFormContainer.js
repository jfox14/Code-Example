import React from 'react'
import PropTypes from 'prop-types'
import api from '../services/api'

function withContactFormStateAndHandlers (ComponentToWrap) {
  class ContactFormContainer extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        email: {text:null, status:null},
        name: {text:null, status:null},
        reason: {text:null, status:null},
        additionalInformation: {text:null, status:null},
        reasons: [],
        showSuccessMessage: false
      }

      // all callbacks need to be bound
      this.handleSubmit = this.handleSubmit.bind(this)
      this.onEmailChange = this.onEmailChange.bind(this)
      this.onNameChange = this.onNameChange.bind(this)
      this.onReasonChange = this.onReasonChange.bind(this)
      this.onAdditionalInformationChange = this.onAdditionalInformationChange.bind(this)
      this.retrieveReasons = this.retrieveReasons.bind(this)
      this.submitNewMessage = this.submitNewMessage.bind(this)
    }


    componentWillMount () {
      this.retrieveReasons()
    }


    handleSubmit = (e) => {
      e.preventDefault();
      this.submitNewMessage();
    }


    submitNewMessage () {
      let newMessageEmail = this.state.email.text
      let newMessageName = this.state.name.text
      let newMessageReason = this.state.reason.value
      let newMessageAdditionalInformation = this.state.additionalInformation.text

      api.createNewMessage({email: newMessageEmail, name: newMessageName, reason: newMessageReason, additionalInformation: newMessageAdditionalInformation })
      .then((response) => {
        if (!response.error) {
          this.setState({
            email: {text:null, status:null},
            name: {text:null,status:null},
            reason: {text:null, status:null},
            additionalInformation: {text:null, status:null},
            showSuccessMessage: true
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    }

    retrieveReasons () {
        api.readMessageReasons().then((response) => {
          if (!response.error) {
            this.setState({
              reasons: response,
            })
          }
        }).catch((error) => {
          console.log(error)
        })
    }

    onEmailChange  = (e)  =>{
      var re = /\S+@\S+\.\S+/;
      var isMatch = re.test(e.target.value);
      var status = isMatch ? 'success' : 'error'

      this.setState(
        {
          email: {
            ...this.state.email,
            status: status,
            text: e.target.value
          }
        }
      )
    }

    onNameChange  = (e)  =>{
      var re = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/
      var isMatch = re.test(e.target.value);
      var status = isMatch ? 'success' : 'error'

      this.setState({
        name:{
          ...this.state.name,
          status: status,
          text: e.target.value
        }
      }
    )
  }

  onReasonChange  = (e)  =>{
    var re = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/
    var isMatch = re.test(e);
    var status = isMatch ? 'success' : 'error'

    this.setState({
      reason:{
        ...this.state.reason,
        status: status,
        value: e
      }
    }
  )
}

onAdditionalInformationChange  = (e)  =>{
  var re = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/
  var isMatch = re.test(e.target.value);
  var status = isMatch ? 'success' : 'error'

  this.setState({
    additionalInformation:{
      ...this.state.additionalInformation,
      status: status,
      text: e.target.value
    }
  }
)
}



render () {

  const email = {
    onChange : this.onEmailChange,
    status: this.state.email.status,
    text: this.state.email.text,
    message: this.state.email.status === 'error' ? 'Please provide your e-mail.' : null
  }

  const name = {
    onChange : this.onNameChange,
    status: this.state.name.status,
    text: this.state.name.text,
    message: this.state.name.status === 'error' ? 'Please provide your name.' : null
  }

  const reason = {
    onChange : this.onReasonChange,
    status: this.state.reason.status,
    value: this.state.reason.value,
    message: this.state.reason.status === 'error' ? 'Please provide a reason for your message.' : null
  }

  const additionalInformation = {
    onChange : this.onAdditionalInformationChange,
    status: this.state.additionalInformation.status,
    text: this.state.additionalInformation.text,
    message: this.state.additionalInformation.status === 'error' ? 'Please provide some additonal information.' : null
  }

  const reasons = this.state.reasons
  const noErrors = email.status === 'success' && name.status === 'success' && reason.status === 'success' && additionalInformation.status === 'success'
  const showSuccessMessage = this.state.showSuccessMessage

  return (
    <ComponentToWrap
      handleSubmit={this.handleSubmit}
      email = {email}
      name = {name}
      reason = {reason}
      additionalInformation = {additionalInformation}
      formReadyToSubmit = {noErrors}
      reasons = {reasons}
      showSuccessMessage = {showSuccessMessage}
    />
  )
}
}

return ContactFormContainer
}

export default withContactFormStateAndHandlers
