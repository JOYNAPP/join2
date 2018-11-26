import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import history from '../history'
import axios from 'axios'
import mockData from '../../server/api/mock-event'

export default class allEvents extends Component {
  constructor() {
    super()
    this.state = {
      events: []
    }
  }

  async componentDidMount() {
    const res = await axios.get('/api/events')
    const events = res.data
    console.table('dringus', events)
    this.setState({events: events})
    console.table(events)
  }

  render() {
    return (
      <div>
        <h2> All Events:</h2>
        {this.state.events.map(event => {
          return (
            <div className="event-list" key={event.id}>
              <h3>
                <Link to={`/events/${event.id}`}>{event.name.text}</Link>
              </h3>
              <div>Date: {event.start.local}</div>
              <img src={event.logo} onClick={() => history.push('/event')} />
              <br />
              <br />
            </div>
          )
        })}
      </div>
    )
  }
}
