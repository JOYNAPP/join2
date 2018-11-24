import React, {Component} from 'react'
import axios from 'axios'

export default class Inbox extends Component {
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
    const res = await axios.get('/api/users/1')
    const eventsIds = res.data // should be a array of ints representing event ids
    let events = []
    for (let i = 0; i < eventsIds.length; i++) {
      const event = await axios.get('call API with event[i]')
      events.push(event)
    }
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
            <button className="return" type="button">
              <Link to="/events">Explore Events</Link>
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

