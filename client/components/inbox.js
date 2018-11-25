import React, {Component} from 'react'
import { withRouter, NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import {me} from '../store'

class Inbox extends Component {
  constructor() {
    super()
    this.state = {
      invitedTo: []
    }
  }
  async componentDidMount() {
    // make axios call to get all user's inviedToEvents ids (how to get user id?)
    // make axios(test)/API call to get the events represented by the ids
    // Set local state
    this.props.loadInitialData()
    console.log('this props user', this.props.user)
      const currUserId = this.props.user.id
      const res = await axios.get(`/api/userContract/${currUserId}/events`)
      const data = res.data // should be a array of ints representing event ids
      const contracts = data.contracts
      console.log('contracts', contracts)
      let events = [...contracts]
      // for (let i = 0; i < contracts.length; i++) {
      //   const event = await axios.get('call API with event[i]')
      //   events.push(event)
      // }
      this.setState({invitedTo: events})
    
  }
  render() {
          const inboxEvents = this.state.invitedTo || [];
      if(inboxEvents.length === 0) {
        return (
          <div className="inboxError">
            <h1>Invitations</h1>
            <div className="error">
              Your inbox does not contain any invitations yet.
            </div>
            <button type="button">
              <NavLink to="/events" className="return">Explore Events</NavLink>
            </button>
          </div>
        )
      } else {
    return (
      <div>
        <h2> Inbox:</h2>
        {this.state.invitedTo.map(event => {
          return (
            <div key={event.id}>
            <h3>Contract Id of: {event.id}</h3>
              <h3>{event.name}</h3>
              <h5>{event.date}</h5>
              <h5>{event.ticketPrice}</h5>
              <button type="button">Confirm</button>
              <button type="button">Decline</button>
            </div>
          )
        })}
      </div>
    )
  }
}
}
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}
export default withRouter(connect(mapState, mapDispatch)(Inbox))

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

