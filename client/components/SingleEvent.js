import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import FriendList from './FriendList'
import store, { fetchAllUsers } from '../store';

class SingleEvent extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //      friends: [{name: 'Uma', userId: 1}, {name: 'Maria', userId: 2},{name: 'Liv', userId: 3}, {name: 'Lucas', userId: 4}]
 
        // }
        console.log('something in single event')
    }

    componentDidMount(){
        this.props.fetchAllUsers()

    }
    render() {
        const users = this.props.users || []
        // console.log('props in single event', props)
        console.log('state', this.state)
        console.log('this props users', this.props.users)
        return (

            <div>
                <div className='grid-child'>
                <div className='user-orders'>
                <div className='event-image'>
                    <img src="https://hollywoodstreetking.com/wordpress/wp-content/uploads/2017/03/drake-fans-boycott-concert.jpg" />
                </div>
                        <div><h2 className='order-details' id='left-float'>Who Do You Want To Go With?</h2></div>
                        {users.length ? 
                        <FriendList friends ={users} />
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
        users: state.user.allUsers
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsers: function() {
            dispatch(fetchAllUsers())
        }

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleEvent))


