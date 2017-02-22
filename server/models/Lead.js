import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema({
  company: String,
  name: String,
  email: String,
  phone: String,
  notes: String,
  twitter_screen_name: String,

  tweets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
  }],

  tweet_last_id: String,
}, {
  timestamps: true,
})

const Lead = mongoose.model('Lead', leadSchema)

export default Lead
