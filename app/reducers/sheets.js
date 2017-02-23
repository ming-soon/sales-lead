import * as types from 'App/actions/types'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_SHEETS:
      return action.sheets
    case types.ADD_SHEET:
      return [
        ...state,
        action.sheet,
      ]
    case types.UPDATE_SHEET:
      return [
        ...(state.filter(sheet => (sheet._id !== action.id))),
        action.sheet,
      ]
    case types.DELETE_SHEET:
      return state.filter(sheet => (sheet._id !== action.id))
    default:
      return state
  }
}
