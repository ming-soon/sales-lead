import React, { PropTypes } from 'react'
import Link from 'react-router/lib/Link'
import { filterDate } from 'App/utils'

const ListItem = ({ _id, index, title, spreadsheetId, sheetId, createdAt, onDelete }) => (
  <tr>
    <td>{index}</td>
    <td>{title}</td>
    <td>{spreadsheetId}</td>
    <td>{sheetId}</td>
    <td>{filterDate(createdAt)}</td>
    <td className="text-right">
      <Link to={`/sheets/${_id}`} className="btn btn-info btn-xs">Edit</Link>
      <button type="button" className="btn btn-danger btn-xs" onClick={() => { onDelete(_id) }}>
        Delete
      </button>
    </td>
  </tr>
)

ListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  spreadsheetId: PropTypes.string.isRequired,
  sheetId: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default ListItem
