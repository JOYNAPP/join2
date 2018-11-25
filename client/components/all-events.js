import React, {Component} from 'react'
import history from '../history'

export default class allEvents extends Component {
  render() {
    return (
      <div>
        <h2> All Events:</h2>
        <h3>Drake</h3>
        <img onClick={() => history.push('/event')}src="https://hollywoodstreetking.com/wordpress/wp-content/uploads/2017/03/drake-fans-boycott-concert.jpg" />
      </div>
    )
  }
}
