import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {postContract} from '../store/contract'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


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
    notify = () => toast('Your invites have been sent!')

    handleOnSubmit(){

        this.props.createContract({
            eventId: this.props.event.id,
            eventName: this.props.event.name.text,
            eventDate: this.props.event.start.local,
            friends: [...this.state.chosenFriends, this.props.user.id]
        })
        console.log('You are going with', this.state.chosenFriends, '!', 'eventName', this.props.event.name.text,)
        this.notify()
    }

    render() {
    const friends = this.props.friends
    if (this.state.clickedInvite) {
      return (
          <div>You wanna go!</div>
      )
  } else {
  return (

    <div>
      <h3 className='friend-list'>Choose Friends:</h3>
      <table>
        <tbody>
          {
            friends.filter(friend => friend.id !== this.props.user.id ).map(friend =>
              <tr className='black' key={friend.id}>
                <td><input type="checkbox" value= {friend.id} name={friend.name} onClick={this.handleClick}/></td>
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
  <div>
    <button type="button" className="event-info" onClick={this.handleOnSubmit}>Ask Your Friends To JOYN!</button>
    <ToastContainer />
  </div>
    </div>
  )
        }
}
}

const mapDispatchToProps = (dispatch) => ({
        createContract: (contract) => dispatch(postContract(contract))
      })

export default withRouter(connect(null, mapDispatchToProps)(FriendList))