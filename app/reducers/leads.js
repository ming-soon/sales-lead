import * as types from 'App/actions/types'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case types.IMPORT_LEADS:
      return state.concat(action.leads)
    case types.LOAD_LEADS:
      return action.leads
    default:
      return state
  }
}
