import { call, put, takeEvery } from 'redux-saga/effects'
import browserHistory from 'react-router/lib/browserHistory'
import { loadSheets, addSheet, getSheet, updateSheet, deleteSheet } from 'App/actions/sheets'
import { showMessageRequest } from 'App/actions/messages'
import * as Api from 'App/services/sheets'
import * as types from 'App/actions/types'

export function* loadSheetsRequest() {
  try {
    const sheets = yield call(Api.loadSheets)
    yield put(loadSheets(sheets))
  } catch (e) {
    yield put(showMessageRequest(e))
  }
}

export function* addSheetRequest(action) {
  try {
    const sheet = yield call(Api.addSheet, action.sheet)
    yield put(addSheet(sheet))
    yield put(showMessageRequest('Sheet is added successfully.'))
    yield call(browserHistory.push, '/sheets')
  } catch (e) {
    yield put(showMessageRequest(e))
  }
}

export function* getSheetRequest(action) {
  try {
    const sheet = yield call(Api.getSheet, action.id)
    yield put(getSheet(sheet))
  } catch (e) {
    yield put(showMessageRequest(e))
  }
}

export function* updateSheetRequest(action) {
  try {
    const sheet = yield call(Api.updateSheet, action.id, action.sheet)
    yield put(updateSheet(action.id, sheet))
    yield put(showMessageRequest('Sheet is updated successfully.'))
    yield call(browserHistory.push, '/sheets')
  } catch (e) {
    yield put(showMessageRequest(e))
  }
}


export function* deleteSheetRequest(action) {
  try {
    yield call(Api.deleteSheet, action.id)
    yield put(deleteSheet(action.id))
    yield put(showMessageRequest('Sheet is deleted successfully.'))
  } catch (e) {
    yield put(showMessageRequest(e))
  }
}

export function* watchLoadSheetsRequest() {
  yield takeEvery(types.LOAD_SHEETS_REQUEST, loadSheetsRequest)
}

export function* watchAddSheetRequest() {
  yield takeEvery(types.ADD_SHEET_REQUEST, addSheetRequest)
}

export function* watchGetSheetRequest() {
  yield takeEvery(types.GET_SHEET_REQUEST, getSheetRequest)
}

export function* watchUpdateSheetRequest() {
  yield takeEvery(types.UPDATE_SHEET_REQUEST, updateSheetRequest)
}

export function* watchDeleteSheetRequest() {
  yield takeEvery(types.DELETE_SHEET_REQUEST, deleteSheetRequest)
}
