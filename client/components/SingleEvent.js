import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import FriendList from './FriendList'
import { fetchAllUsers, loadContracts, me, fetchEvent} from '../store';

class SingleEvent extends Component {
    constructor(props) {
        super(props);
        console.log('something in single event')
    }

    componentDidMount(){
        this.props.loadInitialData()
        this.props.fetchAllUsers()
        this.props.loadContracts(this.props.user.id)

        const eventId = this.props.match.params.eventId
        this.props.fetchEvent(eventId)

    }
    render() {
        const users = this.props.users || []
        const user = this.props.user
        const event = this.props.event
        console.log('props', this.props)
        console.log('user', user)
        return (
        // {
            //if user is already INVITED to event loading, show 'YOURE INVITED' view
            //if use if already GOING to event loading, show 'YAY YOURE GOING' view
        // }
            <div>
                <div className='grid-child'>
                <div className='user-orders'>
                <h2>{event.name}</h2>
                <h3>{event.date}</h3>
                <div className='event-image'>
                    <img src="https://hollywoodstreetking.com/wordpress/wp-content/uploads/2017/03/drake-fans-boycott-concert.jpg" />
                </div>
                        <div><h2 className='order-details' id='left-float'>Who Do You Want To Go With?</h2></div>
                        {users.length ?
                        <FriendList friends ={users} user={user} />
                        : <div>There are no users right now!</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        users: state.user.allUsers,
        contracts: state.contract.userContracts,
        event: state.event.singleEvent
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsers: function() {
            dispatch(fetchAllUsers())
        },
        loadContracts: function(userId) {
            dispatch(loadContracts(userId))
          },
          loadInitialData: function() {
            dispatch(me())
          },
          fetchEvent: function(eventId) {
              dispatch(fetchEvent(eventId))
          }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleEvent))


