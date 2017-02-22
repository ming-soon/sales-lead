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

    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeSpreadsheetId = this.handleChangeSpreadsheetId.bind(this)
    this.handleChangeSheetId = this.handleChangeSheetId.bind(this)
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

  validateSheetId = (sheetId) => {
    if (!sheetId.length) {
      return 'Sheet ID is required.'
    }
    return true
  }

  handleChangeTitle(title) {
    this.setState({
      ...this.state,
      title,
    })
  }

  handleChangeSpreadsheetId(spreadsheetId) {
    this.setState({
      ...this.state,
      spreadsheetId,
    })
  }

  handleChangeSheetId(sheetId) {
    this.setState({
      ...this.state,
      sheetId,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    const isTitleValid = this.validateTitle(this.state.title)
    const isSpreadsheetIdValid = this.validateSpreadsheetId(this.state.spreadsheetId)
    const isSheetIdValid = this.validateSheetId(this.state.sheetId)
    const isSubmitDisabled =
      isTitleValid !== true ||
      isSpreadsheetIdValid !== true ||
      isSheetIdValid !== true

    return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <div className="panel panel-default">
            <div className="panel-body">
              <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <FormGroup
                  id="title"
                  label="Title"
                  value={this.state.title}
                  validate={this.validateTitle}
                  onChange={this.handleChangeTitle}
                />
                <FormGroup
                  id="spreadsheetId"
                  label="Spreadsheet ID"
                  value={this.state.spreadsheetId}
                  validate={this.validateSpreadsheetId}
                  onChange={this.handleChangeSpreadsheetId}
                />
                <FormGroup
                  id="sheetId"
                  label="Sheet ID"
                  value={this.state.sheetId}
                  validate={this.validateSheetId}
                  onChange={this.handleChangeSheetId}
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
