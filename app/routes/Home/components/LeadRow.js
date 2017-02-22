import React, { PropTypes } from 'react'
import { filterDate } from 'App/utils'

const LeadRow = ({ index, company, name, email, phone, notes, createdAt }) => (
  <tr>
    <td>{index}</td>
    <td>{company}</td>
    <td>{name}</td>
    <td>{email}</td>
    <td>{phone}</td>
    <td>{notes}</td>
    <td>{filterDate(createdAt)}</td>
  </tr>
)

LeadRow.propTypes = {
  index: PropTypes.number.isRequired,
  company: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  notes: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
}

LeadRow.defaultProps = {
  notes: '',
}

export default LeadRow
