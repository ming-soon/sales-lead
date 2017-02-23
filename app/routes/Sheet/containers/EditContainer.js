import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/lib/Link'
import { addSheetRequest, getSheetRequest, updateSheetRequest } from 'App/actions/sheets'
import EditView from '../components/EditView'

class EditContainer extends Component {
  static propTypes = {
    addSheetRequest: PropTypes.func.isRequired,
    updateSheetRequest: PropTypes.func.isRequired,
    getSheetRequest: PropTypes.func.isRequired,
    sheet: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.isAdding = props.params.id === undefined

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (!this.isAdding) {
      this.props.getSheetRequest(this.props.params.id)
    }
  }

  handleSubmit(sheet) {
    if (this.isAdding) {
      this.props.addSheetRequest(sheet)
    } else {
      this.props.updateSheetRequest(this.props.params.id, sheet)
    }
  }

  render() {
    const { sheet } = this.props

    return (
      <div>
        <div className="page-header clearfix">
          <h3 className="pull-left">
            {this.isAdding ? 'Add New Sheet' : 'Edit Sheet'}
          </h3>
          <div className="pull-right text-right">
            <Link to="/sheets" className="btn btn-default btn-sm">Go Back</Link>
          </div>
        </div>
        <div>
          <p>
            The Spreadsheet ID is the value between the &quot;/d&quot; and the &quot;/edit&quot;
            in the URL of your spreadsheet.
          </p>
          <pre>https://docs.google.com/spreadsheets/d/<strong>1p3eGLLRu7YYvxs-RnH8NDBMU5JCpPfspuxKchWiLHMs</strong>/edit#gid=1431219714</pre>
        </div>
        <EditView
          sheet={sheet}
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let sheet
  if (ownProps.params.id === undefined) {
    sheet = {
      title: '',
      spreadsheetId: '',
      sheetName: '',
    }
  } else {
    sheet = state.sheets.find(_sheet => _sheet._id === ownProps.params.id)
  }

  return {
    sheet,
  }
}

const mapDispatchToProps = {
  addSheetRequest,
  updateSheetRequest,
  getSheetRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)
