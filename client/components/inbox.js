import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {selectMyInvById} from '../store/contract'

class Inbox extends Component {
  constructor(props) {
  super(props)
  this.state = {
    clicked: false
  }
  this.handleConfirm = this.handleConfirm.bind(this)
  this.handleDecline = this.handleDecline.bind(this)
}


async componentDidMount() {
  await this.props.selectMyInvById(this.props.user.id)
  }

notifyConf = () => toast(' 😊  You have confirmed!')
notifyDecl = () => toast(' 🙁  You have declined.')


handleConfirm(e) {
  // console.log('I want to go!', e.target.value)
  this.props.actions.respondInvite({receiverEmail: `${this.props.user.email}`, contractId: `${e.target.value}`, yn: true})
  this.props.actions.selectMyInvById(this.props.user.id)
  this.notifyConf()
}

handleDecline(e) {
  // console.log('Sorry, I do not want to go!')
  this.props.actions.respondInvite({receiverEmail: `${this.props.user.email}`, contractId: `${e.target.value}`, yn: false})
  this.notifyDecl()
}



render() {
  console.log('props', this.props)
  const inboxEvents = this.props.selectedMyInv
  console.log(typeof this.props.selectedMyInv)
  return(
    <div>
    <h2>Mark Your Calendar! 📅 </h2>
    </div>)

  }
  }


const mapStateToProps = state => {
  return {
    selectedMyInv: state.contracts.selectedMyInv,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  selectMyInvById: id => dispatch(selectMyInvById(id)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Inbox)
)
