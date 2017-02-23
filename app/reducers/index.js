import { combineReducers } from 'redux'
import user from './user'
import users from './users'
import userUpdated from './userUpdated'
import sheets from './sheets'
import sheetUpdated from './sheetUpdated'
import leads from './leads'
import messages from './messages'

export default combineReducers({
  user,
  users,
  userUpdated,
  sheets,
  sheetUpdated,
  leads,
  messages,
})
