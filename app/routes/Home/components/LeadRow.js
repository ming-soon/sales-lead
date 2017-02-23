import React, { PropTypes } from 'react'
import Link from 'react-router/lib/Link'

const LeadRow = ({ _id, index, company, name, email, phone, notes, tweets, onDelete }) => (
  <tbody>
    <tr>
      <td>{index}</td>
      <td>{company}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{tweets.length}</td>
      <td className="text-right">
        <Link to={`/leads/${_id}`} className="btn btn-info btn-xs">Edit</Link>
        <button type="button" className="btn btn-danger btn-xs" onClick={() => { onDelete(_id) }}>
          Delete
        </button>
      </td>
    </tr>
    <tr>
      <td />
      <td colSpan="5">
        <strong>Notes:</strong> {notes}
      </td>
      <td />
    </tr>
  </tbody>
)

LeadRow.propTypes = {
  _id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  company: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  notes: PropTypes.string,
  tweets: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
}

LeadRow.defaultProps = {
  notes: '',
  tweets: [],
}

export default LeadRow
