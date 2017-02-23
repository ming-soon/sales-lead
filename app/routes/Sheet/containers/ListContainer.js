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
        <div className="page-header clearfix">
          <h3 className="pull-left">Google Sheets</h3>
          <div className="pull-right text-right">
            <Link to="sheets/add" className="btn btn-primary btn-sm">Add New Sheet</Link>
          </div>
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
