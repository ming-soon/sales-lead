import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  notes: String,

  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
  },
})

const Contact = mongoose.model('Contact', contactSchema)

export default Contact
