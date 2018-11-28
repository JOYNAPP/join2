import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import history from '../history'
import axios from 'axios'
import mockData from '../../server/api/mock-event'
import {connect} from 'react-redux'
import {me} from '../store'

class allEvents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
  }

  async componentDidMount() {
    const res = await axios.get(
      `https://www.eventbriteapi.com/v3/events/search/?q=$drake&token=AF36NVFKHSLG27TQBBWF`
    )
    const events = res.data.events
    this.setState({events: events})
    console.table(events)
    console.log('user', this.props.user)
  }

  render() {
    const events = this.state.events || []
    console.log('THESE EVENTS:', this.state.events)
    return (
      <div className="container">
      <hr />
          <h4 id="subtitle">Welcome to JOYN, {this.props.user.name}! Where you invite friends to exciting, upcoming events, and only when everyone confirms will we buy the tickets! <font color="#352480">Attend Events Together. JOYN!</font> 😊</h4>
        <hr />

        {this.state.events &&
          this.state.events.map(event => {
            const date = new Date(event.start.local).toDateString()
            return (
              
              <div className="card" key={event.id}>
                {event.logo ? (
                  <img className="card-img-top" alt="Card image cap" src={event.logo.url} />
                ) : (
                  <img className="card-img-top" alt="Card image cap" src="https://allmods.net/wp-content/uploads/2018/08/no-image-available.png" />
                )}
                <div className="card-body">
                <h3 className="card-title">
                  <Link to={`/events/${event.id}`}>{event.name.text}</Link>
                </h3>
                <div className="date"><p>Date: {date}</p></div>
                <p className="card-text">
                  {event.description.text.length > 399
                    ? event.description.text.slice(0, 400) + '...'
                    : event.description.text}
                </p>
                <br />
                <br />
              </div>
        
            </div>
            )
    
          })}
        </div>
    )
  }
}
import { format } from 'path';

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
  }
 }
 
 const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadInitialData: function() {
        dispatch(me())
      }
      }
    }
  }
 
 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(allEvents))
