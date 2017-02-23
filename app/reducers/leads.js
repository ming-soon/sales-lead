import * as types from 'App/actions/types'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case types.IMPORT_LEADS:
      return state.concat(action.leads)
    case types.LOAD_LEADS:
      return action.leads
    case types.ADD_LEAD:
      return [
        ...state,
        action.lead,
      ]
    case types.GET_LEAD:
      return [
        // eslint-disable-next-line no-underscore-dangle
        ...(state.filter(lead => (lead._id !== action.lead._id))),
        action.lead,
      ]
    case types.UPDATE_LEAD:
      return [
        // eslint-disable-next-line no-underscore-dangle
        ...(state.filter(lead => (lead._id !== action.id))),
        action.lead,
      ]
    case types.DELETE_LEAD:
      // eslint-disable-next-line no-underscore-dangle
      return state.filter(lead => (lead._id !== action.id))
    default:
      return state
  }
}
