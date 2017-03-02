import React, { PropTypes } from 'react'
import LeadRow from './LeadRow'
import Style from '../style.scss'

const LeadTable = ({ leads, onDelete }) => (
  <table className="table table-striped table-hover">
    <thead>
      <tr>
        <th>No.</th>
        <th>Company</th>
        <th>Tweets Posted</th>
        <th>Tweets Mentioned</th>
        <th>News</th>
        <th className={Style.actionColumn} />
      </tr>
    </thead>
    {
      leads.length
      ? (
        leads.map((lead, index) => (
          <LeadRow key={lead._id} index={index + 1} {...lead} onDelete={onDelete} />
        ))
      )
      : (
        <tbody>
          <tr>
            <td colSpan="6" className="text-muted text-center">There is no lead.</td>
          </tr>
        </tbody>
      )
    }
  </table>
)

LeadTable.propTypes = {
  leads: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default LeadTable
