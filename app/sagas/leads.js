import { call, put, takeEvery } from 'redux-saga/effects'
import { importLeads, loadLeads } from 'App/actions/leads'
import { showMessageRequest } from 'App/actions/messages'
import * as Api from 'App/services/leads'
import * as types from 'App/actions/types'

export function* importLeadsRequest(action) {
  try {
    const leads = yield call(Api.importLeads, action.leads)
    yield put(importLeads(leads))
    yield put(showMessageRequest(`${leads.length} leads is added successfully.`))
  } catch (e) {
    yield put(showMessageRequest(e))
  }
}

export function* loadLeadsRequest() {
  try {
    const leads = yield call(Api.loadLeads)
    yield put(loadLeads(leads))
  } catch (e) {
    yield put(showMessageRequest(e))
  }
}

export function* watchImportLeadsRequest() {
  yield takeEvery(types.IMPORT_LEADS_REQUEST, importLeadsRequest)
}

export function* watchLoadLeadsRequest() {
  yield takeEvery(types.LOAD_LEADS_REQUEST, loadLeadsRequest)
}
