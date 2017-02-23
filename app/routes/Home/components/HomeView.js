import React, { PropTypes } from 'react'
import Link from 'react-router/lib/Link'
import LeadTable from './LeadTable'

const HomeView = ({ isGoogleApiLoaded, isImporting, isReadingTweets, isReadingGoogleNews,
  onImport, onReadTweets, onReadGoogleNews, onDelete, leads }) => (
    <div>
      <div className="page-header">
        <h3>Sales Leads</h3>
      </div>
      <div className="text-right clearfix">
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
  onDelete: PropTypes.func.isRequired,
  leads: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default HomeView
