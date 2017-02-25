import mongoose from 'mongoose'
import Contact from './Contact'
import Tweet from './Tweet'
import GoogleNews from './GoogleNews'

const leadSchema = new mongoose.Schema({
  company: {
    type: String,
    unique: true,
  },
  twitter_screen_name: String,
  tweet_last_id: String,

  contacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
  }],

  tweets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
  }],

  google_news: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GoogleNews',
  }],
}, {
  timestamps: true,
})

/**
 * The remove middleware.
 */
leadSchema.post('remove', (lead) => {
  Contact.remove({ lead: lead._id }).exec()
  Tweet.remove({ lead: lead._id }).exec()
  GoogleNews.remove({ lead: lead._id }).exec()
})

const Lead = mongoose.model('Lead', leadSchema)

export default Lead
