import React, { Component, PropTypes } from 'react'
import FormGroup from 'App/components/FormGroup'

class EditView extends Component {
  static propTypes = {
    lead: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = { ...this.props.lead }

    this.handleChangeCompany = this.handleChangeCompany.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePhone = this.handleChangePhone.bind(this)
    this.handleChangeNotes = this.handleChangeNotes.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!Object.is(this.props.lead, nextProps.lead)) {
      this.setState({ ...nextProps.lead })
    }
  }

  validateCompany = (company) => {
    if (!company.length) {
      return 'Company is required.'
    }
    return true
  }

  handleChangeCompany(company) {
    this.setState({
      ...this.state,
      company,
    })
  }

  handleChangeName(name) {
    this.setState({
      ...this.state,
      name,
    })
  }

  handleChangeEmail(email) {
    this.setState({
      ...this.state,
      email,
    })
  }

  handleChangePhone(phone) {
    this.setState({
      ...this.state,
      phone,
    })
  }

  handleChangeNotes(notes) {
    this.setState({
      ...this.state,
      notes,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    const isCompanyValid = this.validateCompany(this.state.company)
    const isSubmitDisabled = isCompanyValid !== true

    return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <div className="panel panel-default">
            <div className="panel-body">
              <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <FormGroup
                  id="company"
                  label="Company"
                  value={this.state.company}
                  validate={this.validateCompany}
                  onChange={this.handleChangeCompany}
                />
                <FormGroup
                  id="name"
                  label="Name"
                  value={this.state.name}
                  onChange={this.handleChangeName}
                />
                <FormGroup
                  id="email"
                  label="Email"
                  value={this.state.email}
                  onChange={this.handleChangeEmail}
                />
                <FormGroup
                  id="phone"
                  label="Phone"
                  value={this.state.phone}
                  onChange={this.handleChangePhone}
                />
                <FormGroup
                  id="notes"
                  label="Notes"
                  value={this.state.notes}
                  onChange={this.handleChangeNotes}
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
