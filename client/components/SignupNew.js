import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {signupNew} from '../store'
import history from '../history'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="name">
            <small>Name</small>
          </label>
          <input name="name" type="text" />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <div>
            <label htmlFor="cardholder-name">
              <small>Cardholder Name</small>
            </label>
            <input name="cardHolderName" type="text" />
          </div>
          <div>
            <label htmlFor="credit-card-number">
              <small>Credit or Debit Card No.</small>
            </label>
            <input name="creditCardNumber" type="text" />
          </div>
          <div>
            <label htmlFor="expiration-date">
              <small>Card Expiration Date</small>
            </label>
            <input name="expirationDate" type="text" />
          </div>
          <div>
            <label htmlFor="cvc">
              <small>CVC</small>
            </label>
            <input name="cvc" type="text" />
          </div>
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapSignupNew = state => {
  return {
    name: 'signupNew',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name //formName is signupNew
      const name = evt.target.name.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      const cardHolderName = evt.target.cardHolderName.value
      const creditCardNumber = evt.target.creditCardNumber.value
      const expirationDate = evt.target.expirationDate.value
      const cvc = evt.target.cvc.value
      dispatch(
        signupNew(
          name,
          email,
          password,
          cardHolderName,
          creditCardNumber,
          expirationDate,
          cvc
        )
      ) //on submit sign up, go to additional info sign up page
    }
  }
}

export const SignupNew = connect(mapSignupNew, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
