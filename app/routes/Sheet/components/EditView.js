import React, { Component, PropTypes } from 'react'
import FormGroup from 'App/components/FormGroup'

class EditView extends Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = { ...this.props.sheet }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!Object.is(this.props.sheet, nextProps.sheet)) {
      this.setState({ ...nextProps.sheet })
    }
  }

  validateTitle = (title) => {
    if (!title.length) {
      return 'Title is required.'
    }
    return true
  }

  validateSpreadsheetId = (spreadsheetId) => {
    if (!spreadsheetId.length) {
      return 'Spreadsheet ID is required.'
    }
    return true
  }

  validateSheetName = (sheetName) => {
    if (!sheetName.length) {
      return 'Sheet name is required.'
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
    const isTitleValid = this.validateTitle(this.state.title)
    const isSpreadsheetIdValid = this.validateSpreadsheetId(this.state.spreadsheetId)
    const isSheetNameValid = this.validateSheetName(this.state.sheetName)
    const isSubmitDisabled =
      isTitleValid !== true ||
      isSpreadsheetIdValid !== true ||
      isSheetNameValid !== true

    return (
      <div className="row">
        <div className="col-sm-8 col-sm-offset-2">
          <div className="panel panel-default">
            <div className="panel-body">
              <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <FormGroup
                  id="title"
                  label="Title"
                  value={this.state.title}
                  validate={this.validateTitle}
                  onChange={this.handleChange('title')}
                />
                <FormGroup
                  id="spreadsheetId"
                  label="Spreadsheet ID"
                  value={this.state.spreadsheetId}
                  validate={this.validateSpreadsheetId}
                  onChange={this.handleChange('spreadsheetId')}
                />
                <FormGroup
                  id="sheetName"
                  label="Sheet Name"
                  value={this.state.sheetName}
                  validate={this.validateSheetName}
                  onChange={this.handleChange('sheetName')}
                />
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
