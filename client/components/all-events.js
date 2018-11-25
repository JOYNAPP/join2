import React, {Component} from 'react'
import axios from 'axios'
import eventbrite from 'eventbrite'

const sdk = eventbrite({token: 'AF36NVFKHSLG27TQBBWF'})

export default class allEvent extends Component {
  constructor() {
    super()
    this.state = {
      events: []
    }
  }

  async componentDidMount() {
    // sdk.request('/users/me').then(res => {
    //   console.log(res)
    // })
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
          return <div key={event.id}> {event.name} </div>
        })}
      </div>
    )
  }
}
