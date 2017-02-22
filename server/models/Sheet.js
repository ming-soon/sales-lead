import mongoose from 'mongoose'

const sheetSchema = new mongoose.Schema({
  title: String,
  spreadsheetId: String,
  sheetId: String,
}, {
  timestamps: true,
})

const Sheet = mongoose.model('Sheet', sheetSchema)

export default Sheet
