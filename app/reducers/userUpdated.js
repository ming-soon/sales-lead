import * as types from 'App/actions/types'
import { USER_TYPE_USER } from 'Server/constants'

const initialState = {
  username: '',
  password: '',
  type: USER_TYPE_USER,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER:
      return {
        password: '',
        ...action.user,
      }
    default:
      return state
  }
}
