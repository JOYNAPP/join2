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
    const res = await axios.get(
      `https://www.eventbriteapi.com/v3/events/search/?q=$drake&token=AF36NVFKHSLG27TQBBWF`
    )
    const events = res.data.events
    console.log('dringus', events)
    this.setState({events: events})
    console.table(events)
  }

  render() {
    const events = this.state.events || []
    console.log('THESE EVENTS:', this.state.events)
    return (
      <div>
        {this.state.events &&
          this.state.events.map(event => {
            const date = new Date(event.start.local).toDateString()
            return (
              <div className="event-list" key={event.id}>
                <h3>
                  <Link to={`/events/${event.id}`}>{event.name.text}</Link>
                </h3>
                <div>Date: {date}</div>
                <p>
                  {event.description.text.length > 399
                    ? event.description.text.slice(0, 400) + '...'
                    : event.description.text}
                </p>
                {event.logo ? (
                  <img src={event.logo.url} />
                ) : (
                  <img src="https://allmods.net/wp-content/uploads/2018/08/no-image-available.png" />
                )}
                <br />
                <br />
              </div>
            )
          })}
      </div>
    )
  }
}
