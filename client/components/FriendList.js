import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {postContract} from '../store/contract'


class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenFriends: []
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }

    handleClick(e) {
        console.log('state', this.state)
        console.log('event target click', e.target.checked)
        let friend = e.target.value
        if (e.target.checked) {
            this.setState({
                chosenFriends: [...this.state.chosenFriends, friend]
            })
        } else if (!e.target.checked){
            let oldState = [...this.state.chosenFriends]
            let newState = oldState.filter(person => person !== friend)
            this.setState({
                chosenFriends: [...newState]
            })
        }
    }
    handleOnSubmit(){
        let friends = this.state.chosenFriends.map(friend => Number(friend))
        this.props.createContract({
            eventId: 78900,
            friends: friends
        })
        console.log('You are going with', this.state.chosenFriends, '!')
        console.log('friends', friends)
    }

    render() {
    const friends = this.props.friends

  return (

    <div>
      <h3 className='friend-list'>Choose Friends:</h3>

      <table>
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          {
            friends.map(friend =>
              <tr className='black' key={friend.userId}>
                <td><input type="checkbox" value= {friend.userId} name={friend.name} onClick={this.handleClick}/></td>
                <td>
                {
                  friend.name
                }
                </td>
              </tr>
            )
          }
        </tbody>
      </table>

    <button type="button" onClick={this.handleOnSubmit}>Ask Your Friends To JOIN!</button>

    </div>
  )
}
}

const mapDispatchToProps = (dispatch) => ({
        createContract: (contract) => dispatch(postContract(contract))
      })

export default withRouter(connect(null, mapDispatchToProps)(FriendList))