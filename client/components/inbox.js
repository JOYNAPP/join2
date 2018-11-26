import React, {Component} from 'react'
import {withRouter, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {me} from '../store'
import {putContract, loadContracts} from '../store/contract'
import history from '../history'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

class Inbox extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   invitedTo: []
    // }
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleDecline = this.handleDecline.bind(this)
  }
  async componentDidMount() {
    // make axios call to get all user's inviedToEvents ids (how to get user id?)
    // make axios(test)/API call to get the events represented by the ids
    // Set local state
    this.props.actions.loadInitialData()
    this.props.actions.loadContracts(2)
    console.log('user id', this.props.user)
    console.log('this state userContracts', this.props.userContracts)
    // const currUserId = this.props.user.id
    // const res = await axios.get(`/api/userContract/${currUserId}/events`)
    // const data = res.data // should be a array of ints representing event ids
    // const contracts = data.contracts
    // console.log('contracts', contracts)

    // for (let i = 0; i < contracts.length; i++) {
    //   const event = await axios.get('call API with event[i]')
    //   events.push(event)
    // }
  }
  notifyConf = () => toast(' 😊  You have confirmed!')
  notifyDecl = () => toast(' 🙁  You have declined.')
  
  handleConfirm(e) {
    console.log('I want to go!', e.target.value)
    this.props.actions.respondInvite({receiverEmail: `${this.props.user.email}`, contractId: `${e.target.value}`, yn: true})
    this.notifyConf()
  }

  handleDecline(e) {
    console.log('Sorry, I do not want to go!')
    this.props.actions.respondInvite({receiverEmail: `${this.props.user.email}`, contractId: `${e.target.value}`, yn: false})
    this.notifyDecl()
  }
  render() {
    const inboxEvents = this.props.userContracts || []
    if (inboxEvents.length === 0) {
      return (
        <div className="inboxError">
          <h1>Invitations</h1>
          <div className="error">
            Your inbox does not contain any invitations yet.
          </div>
          <button type="button">
            <NavLink to="/events" className="return">
              Explore Events
            </NavLink>
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <h2> Inbox:</h2>
          {inboxEvents.map(event => {
            return (
              <div key={event.id}>
                <h3>Event Id: {event.id}</h3>
                <h3>{event.name}</h3>
                <h5>{event.date}</h5>
                <h5>{event.ticketPrice}</h5>
                <p>
                  Would you like to attend this event? By clicking 'Confirm' you
                  agree to JOINing this event!
                </p>
                <p>We take over from here :)</p>
                <ToastContainer transition={Zoom}/>
                <ToastContainer transition={Zoom}/>
                
                <button
                  type="button"
                  value={event.id}
                  onClick={this.handleConfirm}
                >
                  Confirm
                </button>
                
                <button
                  type="button"
                  value={event.id}
                  onClick={this.handleDecline}
                >
                  Decline
                </button>
                
                <button type="button" value={event.id}
                onClick={() => history.push(`/event/${event.id}`)}>
                  Event Info
                </button>
              </div>
            )
          })}
        </div>
      )
    }
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    userContracts: state.contract.userContracts
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
