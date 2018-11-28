import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import FriendList from './FriendList'
import {fetchAllUsers, loadContracts, me, fetchEvent} from '../store'
import axios from 'axios'

class SingleEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: {}

    }
  }

  async componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchAllUsers()
    this.props.loadContracts(this.props.user.id)
    const eventId = this.props.match.params.eventId
    this.props.fetchEvent(eventId)
    const res = await axios.get(
      `https://www.eventbriteapi.com/v3/events/${eventId}/?token=AF36NVFKHSLG27TQBBWF`
    )
    const event = res.data
    console.log('event', event)
    this.setState({event: event})
  }
  render() {
    const users = this.props.users || []
    const event = this.state.event || {}
    const user = this.props.user
    console.log('event state', this.state.event.name)
    return (
      // {
      // if user is already INVITED to event loading, show 'YOURE INVITED' view
      // if use if already GOING to event loading, show 'YAY YOURE GOING' view
      // }
      <div>
        <div className="grid-child">
          <div className="user-orders">
            <h2 className="single-event-title">{this.state.event.name && this.state.event.name.text}</h2>
            <p className="date">
              {this.state.event.start &&
                new Date(this.state.event.start.local).toDateString()}
            </p>
            <div className="single-event-container">
            {event.logo ? (
              <img className="single-event" src={event.logo.url} />
            ) : (
              <img className="single-event" src="https://allmods.net/wp-content/uploads/2018/08/no-image-available.png" />
            )}
            <p>
              {this.state.event.description &&
                this.state.event.description.text}
            </p>
            </div>
            <div>
              <h2 className="order-details" id="left-float">
                Who Do You Want To Go With?
              </h2>
            </div>
            {users.length ? (
              <FriendList friends={users} user={user} event={this.state.event}/>
            ) : (
              <div>There are no users right now!</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    users: state.user.allUsers,
    contracts: state.contract.userContracts
    //   event: state.event.singleEvent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllUsers: function() {
      dispatch(fetchAllUsers())
    },
    loadContracts: function(userId) {
      dispatch(loadContracts(userId))
    },
    loadInitialData: function() {
      dispatch(me())
    },
    fetchEvent: function(eventId) {
      dispatch(fetchEvent(eventId))
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleEvent)
)
