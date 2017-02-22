import * as types from 'App/actions/types'

const initialState = {
  title: '',
  spreadsheetId: '',
  sheetId: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SHEET:
      return {
        password: '',
        ...action.sheet,
      }
    default:
      return state
  }
}
