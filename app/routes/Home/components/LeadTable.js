import React, { PropTypes } from 'react'
import LeadRow from './LeadRow'

const LeadTable = ({ leads }) => (
  <table className="table table-striped table-hover">
    <thead>
      <tr>
        <th>No.</th>
        <th>Company</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Created At</th>
      </tr>
    </thead>
    {
      leads.length
      ? (
        leads.map((lead, index) => (
          // eslint-disable-next-line no-underscore-dangle
          <LeadRow key={lead._id} index={index + 1} {...lead} />
        ))
      )
      : (
        <tr>
          <td colSpan="6" className="text-muted text-center">There is no lead.</td>
        </tr>
      )
    }
  </table>
)

LeadTable.propTypes = {
  leads: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default LeadTable
