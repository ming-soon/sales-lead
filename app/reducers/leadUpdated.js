import * as types from 'App/actions/types'

const initialState = {
  company: '',
  name: '',
  email: '',
  phone: '',
  notes: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LEAD:
      return action.lead
    default:
      return state
  }
}