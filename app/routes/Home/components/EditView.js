/* eslint-disable jsx-a11y/label-has-for, react/no-array-index-key */
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

    this.handleAddContact = this.handleAddContact.bind(this)
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

  handleContactChange = (index, field) => (value) => {
    const contacts = [...this.state.contacts]
    contacts[index][field] = value
    this.setState(contacts)
  }

  handleAddContact(event) {
    event.preventDefault()

    this.setState({
      contacts: [
        ...this.state.contacts,
        {
          name: '',
          email: '',
          phone: '',
          notes: '',
        },
      ],
    })
  }

  handleDeleteContact = (index) => {
    const contacts = [...this.state.contacts]
    contacts.splice(index, 1)
    this.setState({
      contacts,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    const isCompanyValid = this.validateCompany(this.state.company)
    const isSubmitDisabled = isCompanyValid !== true

    const { contacts } = this.state

    return (
      <div className="row">
        <div className="col-sm-8 col-sm-offset-2">
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
                  id="twitter_screen_name"
                  label="Twitter Screen Name"
                  value={this.state.twitter_screen_name}
                  onChange={this.handleChange('twitter_screen_name')}
                />
                {
                  contacts.map((contact, index) => (
                    <div key={index}>
                      <div className="form-group">
                        <label className="control-label col-sm-3">Contact Details</label>
                        <div className="col-sm-9 text-right">
                          <button type="button" className="btn btn-info btn-sm" onClick={this.handleAddContact}>
                            Add New Contact
                          </button>
                          <button type="button" className="btn btn-danger btn-sm" onClick={() => this.handleDeleteContact(index)}>
                            Delete Contact
                          </button>
                        </div>
                      </div>
                      <hr />
                      <FormGroup
                        id="name"
                        label="Name"
                        value={contact.name}
                        onChange={this.handleContactChange(index, 'name')}
                      />
                      <FormGroup
                        id="email"
                        label="Email"
                        value={contact.email}
                        onChange={this.handleContactChange(index, 'email')}
                      />
                      <FormGroup
                        id="phone"
                        label="Phone"
                        value={contact.phone}
                        onChange={this.handleContactChange(index, 'phone')}
                      />
                      <FormGroup
                        id="notes"
                        type="textarea"
                        label="Notes"
                        value={contact.notes || ''}
                        onChange={this.handleContactChange(index, 'notes')}
                      />
                    </div>
                  ))
                }
                <div className="form-group no-margin-bottom">
                  <div className="col-sm-9 col-sm-offset-3">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitDisabled}>Save</button>
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
