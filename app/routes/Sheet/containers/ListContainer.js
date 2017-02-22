import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/lib/Link'
import { loadSheetsRequest, deleteSheetRequest } from 'App/actions/sheets'
import ListTable from '../components/ListTable'

class ListContainer extends Component {
  static propTypes = {
    loadSheetsRequest: PropTypes.func.isRequired,
    deleteSheetRequest: PropTypes.func.isRequired,
    sheets: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props)

    this.onDelete = this.onDelete.bind(this)
  }

  componentDidMount() {
    this.props.loadSheetsRequest()
  }

  onDelete(id) {
    this.props.deleteSheetRequest(id)
  }

  render() {
    const { sheets } = this.props

    return (
      <div>
        <div className="page-header">
          <h3>Google Sheets</h3>
        </div>
        <div className="clearfix">
          <Link to="sheets/add" className="btn btn-primary btn-sm pull-right">Add New Sheet</Link>
        </div>
        <ListTable sheets={sheets} onDelete={this.onDelete} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sheets: state.sheets,
})

const mapDispatchToProps = {
  loadSheetsRequest,
  deleteSheetRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
