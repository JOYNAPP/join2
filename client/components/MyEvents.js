import React, {Component} from 'react'
import {withRouter, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {me} from '../store'
import {putContract, loadContracts} from '../store/contract'
import history from '../history'

class MyEvents extends Component {
  constructor(props) {
    super(props)
  }
  async componentDidMount() {
    this.props.actions.loadInitialData()
    this.props.actions.loadContracts(this.props.user.id)

  }



  render() {
    const confirmedEvents = this.props.userConfirmContracts(this.props.user.id)
    const inboxEvents = this.props.userContracts(this.props.user.id) || []
    if (inboxEvents.length === 0) {
      return (
        <div className="inboxError">
          <h1>Invitations</h1>
          <div className="error">
            Your inbox does not contain any invitations yet.
          </div>
        </div>
      )
    } else {
      return (
        <div className='inbox'>
          <h2> Inbox:</h2>
          {
            inboxEvents.map(event => {
            const responded = event.userContract.responded
            const response = event.userContract.response
            const friends = event.users.filter(friend => friend.id !== this.props.user.id).map((friend) => {
              return `${friend.name}`
            })

            if (!confirmedEvents.includes(event) && !responded) {


            return (
                <div key={event.id}>
                  <h3>Event Id: {event.id}</h3>
                  <h3>{event.name}</h3>
                  <h5>{event.date}</h5>
                  <h5>{event.ticketPrice}</h5>
                  <h5>Friends Also Invited: {friends.join(', ')}!</h5>


                 <button type="button" className="event-info" value={event.id}
                    onClick={() => history.push(`/events/${event.id}`)}>
                    Event Info
                  </button>
                  <hr />
                </div>
             )
            } else if (confirmedEvents.includes(event) && response) {
              return (
                <div key={event.id}>
                  <h3>You've responded {response ? 'Yes' : 'No'} to: {event.id}</h3>
                  <h3>{event.name}</h3>
                  <h5>{event.date}</h5>
                  <h5>{event.ticketPrice}</h5>
                  <h5>Friends Also Invited: {friends.join(', ')}!</h5>
                  <button type="button" className="event-info" value={event.id}
                    onClick={() => history.push(`/events/${event.id}`)}>
                    Event Info
                  </button>
                  <hr />
                </div>
              )

            }


           })
          }
        </div>
      )
    }
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    userContracts: state.contract.userContracts,
    userConfirmContracts: state.contract.userConfirmContracts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadInitialData: function() {
        dispatch(me())
      },
      loadContracts: function(userId) {
        dispatch(loadContracts(userId))
      },
      respondInvite: function(response) {
        dispatch(putContract(response))
      }
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyEvents))

