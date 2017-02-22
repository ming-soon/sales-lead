import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema({
  company: String,
  name: String,
  email: String,
  phone: String,
  notes: String,
}, {
  timestamps: true,
})

const Lead = mongoose.model('Lead', leadSchema)

export default Lead
