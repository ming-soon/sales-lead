import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addLeadRequest, getLeadRequest, updateLeadRequest } from 'App/actions/leads'
import EditView from '../components/EditView'

class EditContainer extends Component {
  static propTypes = {
    addLeadRequest: PropTypes.func.isRequired,
    updateLeadRequest: PropTypes.func.isRequired,
    getLeadRequest: PropTypes.func.isRequired,
    lead: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.isAdding = props.params.id === undefined

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (!this.isAdding) {
      this.props.getLeadRequest(this.props.params.id)
    }
  }

  handleSubmit(lead) {
    if (this.isAdding) {
      this.props.addLeadRequest(lead)
    } else {
      this.props.updateLeadRequest(this.props.params.id, lead)
    }
  }

  render() {
    const { lead } = this.props

    return (
      <div>
        <div className="page-header">
          <h3>
            {this.isAdding ? 'Add New Lead' : 'Edit Lead'}
          </h3>
        </div>
        <EditView
          lead={lead}
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let lead
  if (ownProps.params.id === undefined) {
    lead = {
      company: '',
      name: '',
      email: '',
      phone: '',
      notes: '',
      twitter_screen_name: '',
    }
  } else {
    // eslint-disable-next-line no-underscore-dangle
    lead = state.leads.find(_lead => _lead._id === ownProps.params.id)
  }

  return {
    lead,
  }
}

const mapDispatchToProps = {
  addLeadRequest,
  updateLeadRequest,
  getLeadRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)
