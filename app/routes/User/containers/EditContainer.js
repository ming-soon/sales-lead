import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/lib/Link'
import { addUserRequest, getUserRequest, updateUserRequest } from 'App/actions/users'
import EditView from '../components/EditView'

class EditContainer extends Component {
  static propTypes = {
    addUserRequest: PropTypes.func.isRequired,
    updateUserRequest: PropTypes.func.isRequired,
    getUserRequest: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.isAdding = props.params.id === undefined

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (!this.isAdding) {
      this.props.getUserRequest(this.props.params.id)
    }
  }

  handleSubmit(user) {
    if (this.isAdding) {
      this.props.addUserRequest(user)
    } else {
      this.props.updateUserRequest(this.props.params.id, user)
    }
  }

  render() {
    const { user } = this.props

    return (
      <div>
        <div className="page-header clearfix">
          <h3 className="pull-left">
            {this.isAdding ? 'Add New User' : `Edit User - ${user.username}`}
          </h3>
          <div className="pull-right text-right">
            <Link to="/users" className="btn btn-default btn-sm">Go Back</Link>
          </div>
        </div>
        <EditView
          isAdding={this.isAdding}
          user={user}
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.userUpdated,
})

const mapDispatchToProps = {
  addUserRequest,
  updateUserRequest,
  getUserRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)
