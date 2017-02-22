import React, { Component, PropTypes } from 'react'
import FormGroup from 'App/components/FormGroup'
import { getAllUserTypes } from 'App/utils'

class EditView extends Component {
  static propTypes = {
    isAdding: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = { ...this.props.user }

    this.userTypes = getAllUserTypes()

    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangeType = this.handleChangeType.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!Object.is(this.props.user, nextProps.user)) {
      this.setState({ ...nextProps.user })
    }
  }

  validateUsername = (username) => {
    if (!username.length) {
      return 'Username is required.'
    }
    return true
  }

  validatePassword = (password) => {
    if (!password.length) {
      return 'Password is required.'
    }
    return true
  }

  validateType = (type) => {
    const index = this.userTypes.findIndex(option => option.value === type)
    if (index === -1) {
      return 'Type is invalid.'
    }
    return true
  }

  handleChangeUsername(username) {
    this.setState({
      ...this.state,
      username,
    })
  }

  handleChangePassword(password) {
    this.setState({
      ...this.state,
      password,
    })
  }

  handleChangeType(type) {
    this.setState({
      ...this.state,
      type,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    const { isAdding } = this.props

    const isUsernameValid = this.validateUsername(this.state.username)
    const isPasswordValid = this.validatePassword(this.state.password)
    const isTypeValid = this.validateType(this.state.type)
    const isSubmitDisabled =
      isUsernameValid !== true ||
      isPasswordValid !== true ||
      isTypeValid !== true

    return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <div className="panel panel-default">
            <div className="panel-body">
              <form className="form-horizontal" onSubmit={this.handleSubmit}>
                {
                  isAdding && (
                    <FormGroup
                      id="username"
                      label="Username"
                      value={this.state.username}
                      validate={this.validateUsername}
                      onChange={this.handleChangeUsername}
                    />
                  )
                }
                <FormGroup
                  type="password"
                  id="password"
                  label="Password"
                  value={this.state.password}
                  validate={this.validatePassword}
                  onChange={this.handleChangePassword}
                />
                <FormGroup
                  type="select"
                  id="type"
                  label="Type"
                  value={this.state.type}
                  options={this.userTypes}
                  validate={this.validateType}
                  onChange={this.handleChangeType}
                />
                <div className="form-group no-margin-bottom">
                  <div className="col-sm-9 col-sm-offset-3">
                    <button type="submit" className="btn btn-default" disabled={isSubmitDisabled}>Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditView
