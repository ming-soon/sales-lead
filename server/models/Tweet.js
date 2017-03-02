import mongoose from 'mongoose'
import { TWEET_TYPE_POST, TWEET_TYPES } from 'Server/constants'

const tweetSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: TWEET_TYPES,
    default: TWEET_TYPE_POST,
  },
  tweet_id: String,
  text: String,
  hashtags: [String],
  created_at: Date,

  user: {
    id: String,
    name: String,
    screen_name: String,
  },

  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
  },
})

const Tweet = mongoose.model('Tweet', tweetSchema)

export default Tweet
