import { combineReducers } from 'redux'
import user from './user'
import users from './users'
import userUpdated from './userUpdated'
import messages from './messages'

export default combineReducers({
  user,
  users,
  userUpdated,
  messages,
})
