import mongoose from 'mongoose'

const googleNewsSchema = new mongoose.Schema({
  title: String,
  link: String,
  published_at: Date,

  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
  },
})

const GoogleNews = mongoose.model('GoogleNews', googleNewsSchema)

export default GoogleNews
