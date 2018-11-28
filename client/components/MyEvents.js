import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {selectMyContractById} from '../store/contract'

class MyEvents extends Component {
  constructor(props) {
  super(props)
  this.state = {
    loaded: false
  }
}


async componentDidMount() {
  await this.props.selectMyContractById(this.props.user.id)
  }

render() {
  console.log('props', this.props)
  const mycontracts = this.props.selectedMyContract.contracts


return(
  <div>
  <h2>Mark Your Calendar! 📅 </h2>

<div>{mycontracts &&
                  mycontracts.filter(contract => contract.fulfilled === true && contract.userContract && contract.userContract.response === true).map((event) => {
return (
<div className="fulfilledEvent" key={event.created}>
<div>
  <h3>You are going to {event.eventName}! 🎉</h3>
  <h4>on {new Date(event.eventDate).toDateString()}</h4>
  <h4>with {event.users.filter(user => user.id !== this.props.user.id).filter(user => user.userContract.response === true).map(user => user.name).join(', and ')}!</h4>
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
    selectedMyContract: state.contracts.selectedMyContract,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  selectMyContractById: id => dispatch(selectMyContractById(id)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyEvents)
)
