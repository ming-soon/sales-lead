import React, { PropTypes } from 'react'
import ListItem from '../components/ListItem'

const ListTable = ({ sheets, onDelete }) => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>No.</th>
        <th>Title</th>
        <th>Spreadsheet ID</th>
        <th>Sheet Name</th>
        <th>Created At</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {
        sheets.length
        ? (
          sheets.map((sheet, index) => (
            <ListItem key={sheet._id} index={index + 1} {...sheet} onDelete={onDelete} />
          ))
        )
        : (
          <tr>
            <td colSpan="6" className="text-muted text-center">There is no sheet.</td>
          </tr>
        )
      }
    </tbody>
  </table>
)

ListTable.propTypes = {
  sheets: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default ListTable
