import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import FriendList from './FriendList'
import store, { fetchAllUsers } from '../store';

class SingleEvent extends Component {
    constructor() {
        super();
        this.state = {
            friends: [{name: 'Uma', userId: 1}, {name: 'Maria', userId: 2},{name: 'Liv', userId: 3}, {name: 'Lucas', userId: 4}]
        }
        console.log('something in single event')
    }

    render() {
        const { props } = this.props
        console.log('props in single event', props)
        console.log('state', this.state)
        return (

            <div>
                <div className='grid-child'>
                <div className='user-orders'>
                <div className='event-image'>
                    <img src="https://hollywoodstreetking.com/wordpress/wp-content/uploads/2017/03/drake-fans-boycott-concert.jpg" />
                </div>
                        <div><h2 className='order-details' id='left-float'>Who Do You Want To Go With?</h2></div>
                        <FriendList friends ={this.state.friends} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
  }

export default withRouter(connect(mapStateToProps)(SingleEvent))


