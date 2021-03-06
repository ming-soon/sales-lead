import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import clientConfig from 'Server/config/client'
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
      sortBy: 'none',
      leads: [...this.props.leads],
    }

    this.onImport = this.onImport.bind(this)
    this.onReadTweets = this.onReadTweets.bind(this)
    this.onReadGoogleNews = this.onReadGoogleNews.bind(this)
    this.onChangeSortBy = this.onChangeSortBy.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.handleAuth = this.handleAuth.bind(this)
    this.importLeads = this.importLeads.bind(this)
  }

  componentDidMount() {
    // Load only when needed.
    if (this.props.leads.length === 0) {
      // Load leads.
      this.props.loadLeadsRequest()
    }

    // Load Google API client library.
    window.gapi.load('client', () => {
      this.setState({
        isGoogleApiLoaded: true,
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      leads: [...nextProps.leads],
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

  onChangeSortBy(event) {
    const sortBy = event.target.value

    const leads = [...this.props.leads].sort((leadA, leadB) => {
      if (sortBy === 'news') {
        const newsA = leadA.google_news ? leadA.google_news.length : 0
        const newsB = leadB.google_news ? leadB.google_news.length : 0
        return newsB - newsA
      } else if (sortBy === 'tweet') {
        const tweetA = leadA.tweets ? leadA.tweets.length : 0
        const tweetB = leadB.tweets ? leadB.tweets.length : 0
        return tweetB - tweetA
      }

      // Fallback to the created_at.
      const dateA = new Date(leadA.created_at).getTime()
      const dateB = new Date(leadB.created_at).getTime()
      return dateA - dateB
    })

    this.setState({
      sortBy,
      leads,
    })
  }

  /**
   * Called when a Delete button is clicked on leads rows.
   */
  onDelete(id) {
    if (confirm('Are you sure you want to delete the lead?')) {
      this.props.deleteLeadRequest(id)
    }
  }

  checkAuth = (immediate, callback) => {
    window.gapi.auth.authorize({
      client_id: clientConfig.GOOGLE_API_CLIENT_ID,
      scope: clientConfig.GOOGLE_API_SCOPE,
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
    const { isGoogleApiLoaded, isImporting,
      isReadingTweets, isReadingGoogleNews, sortBy, leads } = this.state

    return (
      <HomeView
        isGoogleApiLoaded={isGoogleApiLoaded}
        isImporting={isImporting}
        isReadingTweets={isReadingTweets}
        isReadingGoogleNews={isReadingGoogleNews}
        onImport={this.onImport}
        onReadTweets={this.onReadTweets}
        onReadGoogleNews={this.onReadGoogleNews}
        onChangeSortBy={this.onChangeSortBy}
        onDelete={this.onDelete}
        sortBy={sortBy}
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
