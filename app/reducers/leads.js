import * as types from 'App/actions/types'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case types.IMPORT_LEADS:
      return action.leads
    case types.LOAD_LEADS:
      return action.leads
    case types.ADD_LEAD:
      return [
        ...state,
        action.lead,
      ]
    case types.GET_LEAD:
      return [
        ...(state.filter(lead => (lead._id !== action.lead._id))),
        action.lead,
      ]
    case types.UPDATE_LEAD:
      return [
        ...(state.filter(lead => (lead._id !== action.id))),
        action.lead,
      ]
    case types.DELETE_LEAD:
      return state.filter(lead => (lead._id !== action.id))
    default:
      return state
  }
}
