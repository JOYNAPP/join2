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

  componentDidMount() {
    sdk.request('/users/me').then(res => {
      console.log(res)
    })
  }

  render() {
    return (
      <div>
        <h2> All Events:</h2>
      </div>
    )
  }
}
