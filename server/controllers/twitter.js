import request from 'request'
import Twitter from 'twitter'
import parallel from 'async/parallel'
import serverConfig from 'Server/config/server'
import Lead from 'Server/models/Lead'
import Tweet from 'Server/models/Tweet'

/**
 * Obtain the Application-only bearer token.
 */
const obtainToken = (cb) => {
  const keyEncoded = encodeURIComponent(serverConfig.TWITTER_CONSUMER_KEY)
  const secretEncoded = encodeURIComponent(serverConfig.TWITTER_CONSUMER_SECRET)
  const credentials = `${keyEncoded}:${secretEncoded}`
  const credentialsEncoded = Buffer.from(credentials).toString('base64')

  const options = {
    method: 'POST',
    url: 'https://api.twitter.com/oauth2/token',
    headers: {
      Authorization: `Basic ${credentialsEncoded}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: 'grant_type=client_credentials',
  }

  request(options, (err, res, body) => {
    if (err || !res || res.statusCode !== 200) {
      return cb(err, null)
    }
    const token = JSON.parse(body)
    return cb(null, token.access_token)
  })
}

/**
 * Get a collection of the most recent Tweets posted by the user indicated by the screen_name.
 * @param  {[type]}   client [description]
 * @param  {[type]}   lead   [description]
 * @param  {Function} cb     [description]
 * @return {[type]}          [description]
 */
const getTimeline = (client, lead, cb) => {
  const params = {
    screen_name: lead.twitter_screen_name,
    trim_user: true,
  }

  if (lead.tweet_last_id) {
    params.since_id = lead.tweet_last_id
  }

  client.get('statuses/user_timeline', params, (err, tweets) => { // eslint-disable-line consistent-return
    if (err) {
      return cb(err, [])
    }

    if (tweets.length === 0) {
      return cb(null, [])
    }

    const tweetObjects = tweets.map((tweet) => {
      const hashtags = tweet.entities.hashtags.map(hashtag => hashtag.text)
      return new Tweet({
        tweet_id: tweet.id_str,
        text: tweet.text,
        hashtags,
        created_at: tweet.created_at,
      })
    })

    // Save the oldest Tweet ID.
    lead.tweet_last_id = tweets[0].id_str // eslint-disable-line no-param-reassign
    lead.save()

    Tweet.insertMany(tweetObjects, (err, tweetsAdded) => { // eslint-disable-line no-shadow
      if (err) {
        return cb(err, [])
      }

      return cb(null, tweetsAdded)
    })
  })
}

const getFetch = (req, res, next) => {
  obtainToken((err, token) => { // eslint-disable-line consistent-return
    if (err) {
      return next(err)
    }

    Lead
      .find()
      .exec((err, leads) => { // eslint-disable-line no-shadow, consistent-return
        if (err) {
          return next(err)
        }

        const client = new Twitter({
          consumer_key: serverConfig.TWITTER_CONSUMER_KEY,
          consumer_secret: serverConfig.TWITTER_CONSUMER_SECRET,
          bearer_token: token,
        })

        const asyncTasks = []
        leads.forEach((lead) => {
          if (!lead.twitter_screen_name) {
            return
          }

          asyncTasks.push((cb) => {
            getTimeline(client, lead, (err, tweets) => ( // eslint-disable-line no-shadow
              cb(err, tweets.length)
            ))
          })
        })

        parallel(asyncTasks, (err, results) => { // eslint-disable-line no-shadow
          res.status(200).json(results.length)
        })
      })
  })
}

export default {
  getFetch,
}
