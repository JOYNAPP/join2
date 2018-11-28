import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

//Other components:
import Navbar from './navbar'
import AllEvents from './all-events'
import MyEvents from './MyEvents'


/**
 * COMPONENT
 */
export const UserHome = props => {
  const {name} = props
  return (
    <div>
      {/* <h3>Welcome to JOYN, {name}!</h3> */}
      <MyEvents />
      <AllEvents name={name}/>

    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    name: state.user.name
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
