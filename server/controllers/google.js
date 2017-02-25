import parser from 'rss-parser'
import parallel from 'async/parallel'
import Lead from 'Server/models/Lead'
import GoogleNews from 'Server/models/GoogleNews'

const getGoogleNews = (lead, cb) => {
  const rssUrl = `https://news.google.com/news?q=${encodeURIComponent(lead.company)}&output=rss`

  parser.parseURL(rssUrl, (err, parsed) => { // eslint-disable-line no-shadow
    if (err) {
      return cb(err, [])
    }

    if (parsed.feed.entries.length === 0) {
      return cb(null, [])
    }

    const newsObjects = []
    parsed.feed.entries.forEach((entry) => {
      const existing = lead.google_news.find(news => (
        new Date(news.published_at).getTime() === new Date(entry.pubDate).getTime()
      ))

      if (existing) {
        return
      }

      newsObjects.push(new GoogleNews({
        title: entry.title,
        link: entry.link,
        published_at: entry.pubDate,
        lead: lead._id,
      }))
    })

    if (newsObjects.length === 0) {
      return cb(null, [])
    }

    GoogleNews.insertMany(newsObjects, (err, newsAdded) => { // eslint-disable-line no-shadow
      if (err) {
        return cb(err, [])
      }

      // Save news to leads.
      lead.google_news.push(...newsAdded)

      lead.save()

      return cb(null, newsAdded)
    })
  })
}

const readGoogleNews = (req, res, next) => {
  Lead
    .find()
    .populate('google_news')
    .exec((err, leads) => { // eslint-disable-line no-shadow
      if (err) {
        return next(err)
      }

      const asyncTasks = leads.map(lead => (cb) => {
        getGoogleNews(lead, (err, news) => ( // eslint-disable-line no-shadow
          cb(err, news.length)
        ))
      })

      parallel(asyncTasks, (err, results) => { // eslint-disable-line no-shadow
        res.status(200).json(results.length)
      })
    })
}

export default {
  readGoogleNews,
}
