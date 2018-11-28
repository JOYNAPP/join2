import React, {Component} from 'react'
import {withRouter, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {me} from '../store'
import {putContract, loadContracts} from '../store/contract'
import history from '../history'

class MyEvents extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    this.props.actions.loadInitialData()
    this.props.actions.loadContracts(this.props.user.id)
  }

  render() {
    console.log('this props in MY Events', this.props)
    const userEvents = this.props.userContracts
    const fulfilledEvents = userEvents.filter(event => event.fulfilled)
    return (
      <div>
              <h2>Mark Your Calendar! 📅 </h2>

      <div>{fulfilledEvents.map((event) => {
         return (
           <div className="fulfilledEvent" key={event.created}>
            <div>
              <h3>You are going to {event.eventName}! 🎉</h3>
              <h4>on {new Date(event.eventDate).toDateString()}</h4>
              <h4>with {event.users.map(user => user.name).join(', ')}!</h4>
            </div>
            </div>
          )
        }
        )}
        </div>
        <br/>
        <br/>
        </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    userContracts: state.contract.userContracts,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadInitialData: function() {
        dispatch(me())
      },
      loadContracts: function(userId) {
        dispatch(loadContracts(userId))
      },
      respondInvite: function(response) {
        dispatch(putContract(response))
      }
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyEvents))

