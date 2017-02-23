import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { GOOGLE_API_CLIENT_ID, GOOGLE_API_SCOPE } from 'Server/constants'
import { importLeadsRequest, loadLeadsRequest, deleteLeadRequest, readTweetsRequest, readGoogleNewsRequest } from 'App/actions/leads'
import HomeView from '../components/HomeView'

class HomeContainer extends Component {
  static propTypes = {
    sheets: PropTypes.arrayOf(PropTypes.object).isRequired,
    leads: PropTypes.arrayOf(PropTypes.object).isRequired,
    importLeadsRequest: PropTypes.func.isRequired,
    loadLeadsRequest: PropTypes.func.isRequired,
    deleteLeadRequest: PropTypes.func.isRequired,
    readTweetsRequest: PropTypes.func.isRequired,
    readGoogleNewsRequest: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      isGoogleApiLoaded: false,
      isImporting: false,
      isReadingTweets: false,
      isReadingGoogleNews: false,
    }

    this.onImport = this.onImport.bind(this)
    this.onReadTweets = this.onReadTweets.bind(this)
    this.onReadGoogleNews = this.onReadGoogleNews.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.handleAuth = this.handleAuth.bind(this)
    this.importLeads = this.importLeads.bind(this)
  }

  componentDidMount() {
    // Load leads.
    this.props.loadLeadsRequest()

    // Load Google API client library.
    window.gapi.load('client', () => {
      this.setState({
        isGoogleApiLoaded: true,
      })
    })
  }

  /**
   * Called when an Import button is clicked.
   */
  onImport() {
    this.checkAuth(true, this.handleAuth)
  }

  /**
   * Called when a Read Tweets button is clicked.
   */
  onReadTweets() {
    this.setState({
      isReadingTweets: true,
    })

    const promise = new Promise((resolve, reject) => {
      this.props.readTweetsRequest(resolve, reject)
    })

    promise.then(() => {
      this.setState({
        isReadingTweets: false,
      })

      // Re-load leads.
      // FIXME: Find a better way.
      this.props.loadLeadsRequest()
    })
  }

  onReadGoogleNews() {
    this.setState({
      isReadingGoogleNews: true,
    })

    const promise = new Promise((resolve, reject) => {
      this.props.readGoogleNewsRequest(resolve, reject)
    })

    promise.then(() => {
      this.setState({
        isReadingGoogleNews: false,
      })

      // Re-load leads.
      // FIXME: Find a better way.
      this.props.loadLeadsRequest()
    })
  }

  /**
   * Called when a Delete button is clicked on leads rows.
   */
  onDelete(id) {
    this.props.deleteLeadRequest(id)
  }

  checkAuth = (immediate, callback) => {
    window.gapi.auth.authorize({
      client_id: GOOGLE_API_CLIENT_ID,
      scope: GOOGLE_API_SCOPE,
      immediate,
    }, callback)
  }

  handleAuth(authResult) {
    if (authResult && !authResult.error) {
      this.importLeads()
    } else {
      this.checkAuth(false, this.handleAuth)
    }
  }

  /**
   * Import leads from all spreadsheets.
   * @return {[type]} [description]
   */
  importLeads = () => {
    this.setState({
      isImporting: true,
    })

    window.gapi.client.load('sheets', 'v4', () => {
      const promises = []

      this.props.sheets.forEach((sheet) => {
        promises.push(this.importSheet(sheet.spreadsheetId, sheet.sheetName))
      })

      Promise.all(promises).then((results) => {
        let leads = []
        results.forEach((result) => {
          leads = [...leads, ...result]
        })

        // TODO: Update the state after the import in backend is done.
        this.setState({
          isImporting: false,
        })

        this.props.importLeadsRequest(leads)
      })
    })
  }

  /**
   * Import leads from a specific spreadsheet/sheet.
   * @param  {[type]} spreadsheetId [description]
   * @param  {[type]} sheetName     [description]
   * @return {[type]}               [description]
   */
  importSheet = (spreadsheetId, sheetName) => (
    new Promise((resolve) => {
      window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId,
        range: sheetName,
      }).then((response) => {
        if (response.status !== 200) {
          return resolve([])
        }

        // Assume that the first row contains column names.
        return resolve(response.result.values.slice(1))
      })
    })
  )

  /**
   * Render home page.
   */
  render() {
    const { isGoogleApiLoaded, isImporting, isReadingTweets, isReadingGoogleNews } = this.state
    const { leads } = this.props

    return (
      <HomeView
        isGoogleApiLoaded={isGoogleApiLoaded}
        isImporting={isImporting}
        isReadingTweets={isReadingTweets}
        isReadingGoogleNews={isReadingGoogleNews}
        onImport={this.onImport}
        onReadTweets={this.onReadTweets}
        onReadGoogleNews={this.onReadGoogleNews}
        onDelete={this.onDelete}
        leads={leads}
      />
    )
  }
}

const mapStateToProps = state => ({
  sheets: state.sheets,
  leads: state.leads,
})

const mapDispatchToProps = {
  importLeadsRequest,
  loadLeadsRequest,
  deleteLeadRequest,
  readTweetsRequest,
  readGoogleNewsRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
