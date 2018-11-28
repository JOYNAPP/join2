import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import history from '../history'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div id="Navbar">
    <nav>
      {isLoggedIn ? (
        <div >
          <Link to="/events"><img src="./logo.png" className="left"/></Link>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">{user.name || user.email}'s Events</Link>
          <Link to="/events">All Events</Link>
          <Link to="/inbox">Inbox</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/events"><img src="./logo.png" className="left"/></Link>


          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>

  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
