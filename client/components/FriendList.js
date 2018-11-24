import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'


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
        console.log('You are going with', this.state.chosenFriends, '!')
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
              <tr className='black' key={friend}>
                <td><input type="checkbox" value={friend} onClick={this.handleClick}/></td>
                <td>
                {
                  friend
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

export default FriendList
