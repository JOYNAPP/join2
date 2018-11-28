import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  SingleEvent,
  Login,
  Signup,
  UserHome,
  MyEvents,
  SignupNew,
  AllEvents,
  Inbox
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    console.log('isLoggedIn', isLoggedIn)

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signup/new" component={SignupNew} />

        <Route exact path="/events" component={AllEvents} />

        <Route exact path="/events/:eventId" component={SingleEvent} />
        <Route path="/myEvents" component={MyEvents} />

        <Route path="/inbox" component={Inbox} />


        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
   // isLoggedIn: !!state.user.id
    isLoggedIn: !!state.user.id,

  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
   }
}


export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
