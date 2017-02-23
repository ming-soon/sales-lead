import React, { PropTypes } from 'react'
import Link from 'react-router/lib/Link'

const LeadRow = ({ _id, index, company, name, email, phone,
  notes, tweets, google_news, onDelete }) => (
    <tbody>
      <tr>
        <td>{index}</td>
        <th>{company}</th>
        <td>
          <strong>{name}</strong><br />
          <a href={`mailto:${email}`}>{email}</a><br />
          {phone}
        </td>
        <td>{tweets.length}</td>
        <td>{google_news.length}</td>
        <td className="text-right">
          <Link to={`/leads/${_id}`} className="btn btn-info btn-xs">Edit</Link>
          <button type="button" className="btn btn-danger btn-xs" onClick={() => { onDelete(_id) }}>
            Delete
          </button>
        </td>
      </tr>
      <tr>
        <td />
        <td colSpan="4">
          Notes: {notes}
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
  google_news: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
}

LeadRow.defaultProps = {
  notes: '',
  tweets: [],
  google_news: [],
}

export default LeadRow
