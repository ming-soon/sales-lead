import * as types from './types'

export const loadSheetsRequest = () => ({
  type: types.LOAD_SHEETS_REQUEST,
})

export const loadSheets = sheets => ({
  type: types.LOAD_SHEETS,
  sheets,
})

export const addSheetRequest = sheet => ({
  type: types.ADD_SHEET_REQUEST,
  sheet,
})

export const addSheet = sheet => ({
  type: types.ADD_SHEET,
  sheet,
})

export const getSheetRequest = id => ({
  type: types.GET_SHEET_REQUEST,
  id,
})

export const getSheet = sheet => ({
  type: types.GET_SHEET,
  sheet,
})

export const updateSheetRequest = (id, sheet) => ({
  type: types.UPDATE_SHEET_REQUEST,
  id,
  sheet,
})

export const updateSheet = (id, sheet) => ({
  type: types.UPDATE_SHEET,
  id,
  sheet,
})

export const deleteSheetRequest = id => ({
  type: types.DELETE_SHEET_REQUEST,
  id,
})

export const deleteSheet = id => ({
  type: types.DELETE_SHEET,
  id,
})
