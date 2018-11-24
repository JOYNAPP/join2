import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Inbox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      //for now using this.props.inboxEvents, but this will 
      //have to change later to correspond to correct props name
      const inboxEvents = this.props.inboxEvents || [];
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
          <div className="invitations">
           <h1>Invitations</h1>
           <div>
            <button type="button">Confirm</button>
            <button type="button">Decline</button>
           </div>
          </div>
        )
      }
    }
}

export default Inbox