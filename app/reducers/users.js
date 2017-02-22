import * as types from 'App/actions/types'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_USERS:
      return action.users
    case types.ADD_USER:
      return [
        ...state,
        action.user,
      ]
    case types.UPDATE_USER:
      return [
        // eslint-disable-next-line no-underscore-dangle
        ...(state.filter(user => (user._id !== action.id))),
        action.user,
      ]
    case types.DELETE_USER:
      // eslint-disable-next-line no-underscore-dangle
      return state.filter(user => (user._id !== action.id))
    default:
      return state
  }
}
