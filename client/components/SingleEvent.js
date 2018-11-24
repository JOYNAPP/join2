import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import FriendList from './FriendList'
import store, { fetchAllUsers } from '../store';

class SingleEvent extends Component {
    constructor() {
        super();
        this.state = {
            friends: ['Uma', 'Maria', 'Liv']
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


