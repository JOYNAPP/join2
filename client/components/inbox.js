import React, {Component} from 'react'
import {withRouter, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {me} from '../store'
import {putContract, loadContracts} from '../store/contract'
import history from '../history'
import {ToastContainer, toast, Zoom} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class Inbox extends Component {
  constructor(props) {
    super(props)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleDecline = this.handleDecline.bind(this)
  }
  async componentDidMount() {
    // make axios call to get all user's inviedToEvents ids (how to get user id?)
    // make axios(test)/API call to get the events represented by the ids
    // Set local state
    this.props.actions.loadInitialData()
    this.props.actions.loadContracts(this.props.user.id)
    console.log('user id', this.props.user)
    console.log('this state userContracts', this.props.userContracts)
  }

  notifyConf = () => toast(' 😊  You have confirmed!')
  notifyDecl = () => toast(' 🙁  You have declined.')

  handleConfirm(e) {
    console.log('I want to go!', e.target.value)
    this.props.actions.respondInvite({
      receiverEmail: `${this.props.user.email}`,
      contractId: `${e.target.value}`,
      yn: true
    })
    this.notifyConf()
  }

  handleDecline(e) {
    console.log('Sorry, I do not want to go!')
    this.props.actions.respondInvite({
      receiverEmail: `${this.props.user.email}`,
      contractId: `${e.target.value}`,
      yn: false
    })
    this.notifyDecl()
  }

  render() {
    const confirmedEvents = this.props.userConfirmContracts
    const inboxEvents = this.props.userContracts || []
    console.log('inboxEvents', inboxEvents)
    if (inboxEvents.length === 0) {
      return (
        <div className="container">
        <br />
        <br />
        <div className="inboxError">
        <br />
        <br />
          <h1>Invitations:</h1>
          <div className="error">
            Your inbox does not contain any invitations yet.
          </div>
          <button type="button" className="event-info">
            <NavLink to="/events">
              Explore Events
            </NavLink>
          </button>
        </div>
        </div>
      )
    } else {
      return (
        <div className="container">
        <div className="inbox">
        <br />
          <h2> Invitations:</h2>
          {inboxEvents.map(event => {
            console.log('first event', event)
            const responded = event.userContract.responded
            console.log('responsed', responded)
            const response = event.userContract.response
            const friends = event.users.filter(
              friend => friend.id !== this.props.user.id
            )
            console.log('friends const', friends)
            if (!confirmedEvents.includes(event) && !responded) {
              return (
                <div key={event.id} className="invite">
                  <h3>{event.eventName}</h3>
                  <h4>{new Date(event.eventDate).toDateString()}</h4>
                  <h4>Pending Responses:</h4>
                  <ul>
                    {friends.map(friend => {
                      if (!friend.userContract.responded) {
                        return (
                          <div id="pendingFriends" key={friend.name}>
                            <li>
                              <font color="#0B96A8">
                                {friend.name} has not responded yet 😢{' '}
                              </font>
                            </li>
                          </div>
                        )
                      }
                    })}
                  </ul>
                  <h4>Responses:</h4>
                  <ul>
                    {friends.map(friend => {
                      if (friend.userContract.responded) {
                        return (
                          <div id="respondedFriends" key={friend.name}>
                            <li>
                              <font color="#0B96A8">
                                {friend.name} has responded{' '}
                                {friend.userContract.response ? 'yes!' : 'no'}
                              </font>
                            </li>
                          </div>
                        )
                      }
                    })}
                  </ul>
                  <p>
                    Would you like to attend this event? By clicking 'Confirm'
                    you agree to JOYNing this event!
                  </p>
                  <p>We'll take over from here 😊</p>

                  <ToastContainer transition={Zoom} />
                  <ToastContainer transition={Zoom} />

                  <button
                    className="confirm"
                    type="button"
                    value={event.id}
                    onClick={this.handleConfirm}
                  >
                    Confirm
                  </button>

                  <button
                    className="decline"
                    type="button"
                    value={event.id}
                    onClick={this.handleDecline}
                  >
                    Decline
                  </button>

                  <button
                    type="button"
                    className="event-info"
                    value={event.id}
                    onClick={() => history.push(`/events/${event.eventId}`)}
                  >
                    Event Info
                  </button>
                </div>
              )
            } else if (confirmedEvents.includes(event) && response) {
              return (
                <div key={event.id}>
                  <h3>
                    You've responded {response ? '"YES!"' : 'no'} to:{' '}
                    {event.eventName}
                  </h3>
                  <h4>on {new Date(event.eventDate).toDateString()}</h4>
                  <h4>with {friends.map(friend => friend.name).join(', ')}!</h4>
                  <button
                    type="button"
                    className="event-info"
                    value={event.id}
                    onClick={() => history.push(`/events/${event.eventId}`)}
                  >
                    Event Info
                  </button>
                </div>
              )
            }
          })}
          </div>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Inbox))

// import {Link} from 'react-router-dom'

// class Inbox extends Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//       //for now using this.props.inboxEvents, but this will
//       //have to change later to correspond to correct props name
//       const inboxEvents = this.props.inboxEvents || [];
//       if(inboxEvents.length === 0) {
//         return (
//           <div className="inboxError">
//             <h1>Invitations</h1>
//             <div className="error">
//               Your inbox does not contain any invitations yet.
//             </div>
//             <button className="return" type="button">
//               <Link to="/events">Explore Events</Link>
//             </button>
//           </div>
//         )
//       } else {
//         return (
//           <div className="invitations">
//            <h1>Invitations</h1>
//            <div>
//             <button type="button">Confirm</button>
//             <button type="button">Decline</button>
//            </div>
//           </div>
//         )
//       }
//     }
// }

// export default Inbox
