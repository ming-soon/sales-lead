import React, { PropTypes } from 'react'
import Link from 'react-router/lib/Link'
import LeadTable from './LeadTable'
import Style from '../style.scss'

const HomeView = ({ isGoogleApiLoaded, isImporting, isReadingTweets, isReadingGoogleNews,
  sortBy, onImport, onReadTweets, onReadGoogleNews, onChangeSortBy, onDelete, leads }) => (
    <div>
      <div className="page-header clearfix">
        <h3 className="pull-left">Sales Leads</h3>
        <div className="text-right pull-right">
          <Link to="leads/add" className="btn btn-primary btn-sm">Add New Lead</Link>
          <button type="button" className="btn btn-danger btn-sm" onClick={onImport} disabled={!isGoogleApiLoaded || isImporting}>
            { !isImporting ? 'Import Leads' : 'Importing...' }
          </button>
          <button type="button" className="btn btn-warning btn-sm" onClick={onReadTweets} disabled={isReadingTweets}>
            { !isReadingTweets ? 'Read Tweets' : 'Reading...' }
          </button>
          <button type="button" className="btn btn-warning btn-sm" onClick={onReadGoogleNews} disabled={isReadingGoogleNews}>
            { !isReadingGoogleNews ? 'Read News' : 'Reading...' }
          </button>
        </div>
      </div>
      <div className={Style.sortContainer}>
        <strong>Sort by:</strong>
        <select className="form-control input-sm" value={sortBy} onChange={onChangeSortBy}>
          <option value="none">None</option>
          <option value="tweet">Tweet</option>
          <option value="news">News</option>
        </select>
      </div>
      <LeadTable
        leads={leads}
        onDelete={onDelete}
      />
      <script src="https://apis.google.com/js/api.js" />
    </div>
)

HomeView.propTypes = {
  isGoogleApiLoaded: PropTypes.bool.isRequired,
  isImporting: PropTypes.bool.isRequired,
  isReadingTweets: PropTypes.bool.isRequired,
  isReadingGoogleNews: PropTypes.bool.isRequired,
  onImport: PropTypes.func.isRequired,
  onReadTweets: PropTypes.func.isRequired,
  onReadGoogleNews: PropTypes.func.isRequired,
  onChangeSortBy: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  leads: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default HomeView
