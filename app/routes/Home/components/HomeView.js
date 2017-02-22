import React, { PropTypes } from 'react'
import LeadTable from './LeadTable'

const HomeView = ({ isGoogleApiLoaded, isImporting, onImport, leads }) => (
  <div>
    <div className="page-header">
      <h3>Sales Leads</h3>
    </div>
    <div className="clearfix">
      <button type="button" className="btn btn-primary btn-sm pull-right" onClick={onImport} disabled={!isGoogleApiLoaded || isImporting}>
        { !isImporting ? 'Import Leads' : 'Importing...' }
      </button>
    </div>
    <LeadTable
      leads={leads}
    />
    <script src="https://apis.google.com/js/api.js" />
  </div>
)

HomeView.propTypes = {
  isGoogleApiLoaded: PropTypes.bool.isRequired,
  isImporting: PropTypes.bool.isRequired,
  onImport: PropTypes.func.isRequired,
  leads: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default HomeView
