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
    // make axios call to get all user's inviedToEvents ids
    // make axios(test)/API call to get the events represented by the ids
    // Set local state
    const res = await axios.get('')
    const eventsIds = res.data // should be a array of ints representing event ids
    let events = []
    for (let i = 0; i < eventsIds.length; i++) {
      const event = await axios.get('call API with event[i]')
      events.push(event)
    }
    this.setState({invitedTo: events})
  }
  render() {
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
