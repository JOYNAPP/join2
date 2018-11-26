import React, {Component} from 'react'
import history from '../history'
import axios from 'axios'
import eventbrite from 'eventbrite'

const sdk = eventbrite({token: 'AF36NVFKHSLG27TQBBWF'})

export default class allEvents extends Component {
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
        {/* <h3>Drake</h3>
        <img
          onClick={() => history.push('/event')}
          src="https://hollywoodstreetking.com/wordpress/wp-content/uploads/2017/03/drake-fans-boycott-concert.jpg"
        /> */}
        {this.state.events.map(event => {
          return (
            <div key={event.id}>
              <h3>
                <a onClick={() => history.push('/event')}>{event.name}</a>
              </h3>
              <div>{event.date}</div>
              <br />
            </div>
          )
        })}
      </div>
    )
  }
}
