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

  handleChange = field => (value) => {
    const newState = {}
    newState[field] = value
    this.setState(newState)
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
                  onChange={this.handleChange('company')}
                />
                <FormGroup
                  id="name"
                  label="Name"
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                />
                <FormGroup
                  id="email"
                  label="Email"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                />
                <FormGroup
                  id="phone"
                  label="Phone"
                  value={this.state.phone}
                  onChange={this.handleChange('phone')}
                />
                <FormGroup
                  id="notes"
                  label="Notes"
                  value={this.state.notes}
                  onChange={this.handleChange('notes')}
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
