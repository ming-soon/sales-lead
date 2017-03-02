import React, { PropTypes } from 'react'
import Link from 'react-router/lib/Link'
import { TWEET_TYPE_POST, TWEET_TYPE_MENTION } from 'Server/constants'

const LeadRow = ({ _id, index, company, contacts, tweets, google_news, onDelete }) => (
  <tbody>
    <tr>
      <td>{index}</td>
      <th>{company}</th>
      <td>{tweets.filter(tweet => tweet.type === TWEET_TYPE_POST).length}</td>
      <td>{tweets.filter(tweet => tweet.type === TWEET_TYPE_MENTION).length}</td>
      <td>{google_news.length}</td>
      <td className="text-right">
        <Link to={`/leads/${_id}`} className="btn btn-info btn-xs">Edit</Link>
        <button type="button" className="btn btn-danger btn-xs" onClick={() => { onDelete(_id) }}>
          Delete
        </button>
      </td>
    </tr>
    {
      contacts.map(contact => (
        <tr key={contact._id}>
          <td />
          <td>
            <strong>{contact.name}</strong><br />
            <a href={`mailto:${contact.email}`}>{contact.email}</a><br />
            {contact.phone}
          </td>
          <td colSpan="3">
            Notes: {contact.notes}
          </td>
          <td />
        </tr>
      ))
    }
  </tbody>
)

LeadRow.propTypes = {
  _id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  company: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object),
  tweets: PropTypes.arrayOf(PropTypes.object),
  google_news: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
}

LeadRow.defaultProps = {
  contacts: [],
  tweets: [],
  google_news: [],
}

export default LeadRow
