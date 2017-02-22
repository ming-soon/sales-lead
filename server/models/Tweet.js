import mongoose from 'mongoose'

const tweetSchema = new mongoose.Schema({
  tweet_id: String,
  text: String,
  hashtags: [String],
  created_at: Date,

  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
  },
})

const Tweet = mongoose.model('Tweet', tweetSchema)

export default Tweet
