import { call, put, takeEvery } from 'redux-saga/effects'
import browserHistory from 'react-router/lib/browserHistory'
import { importLeads, loadLeads, addLead, getLead, updateLead, deleteLead } from 'App/actions/leads'
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

export function* addLeadRequest(action) {
  try {
    const lead = yield call(Api.addLead, action.lead)
    yield put(addLead(lead))
    yield put(showMessageRequest('Lead is added successfully.'))
    yield call(browserHistory.push, '/')
  } catch (e) {
    yield put(showMessageRequest(e))
  }
}

export function* getLeadRequest(action) {
  try {
    const lead = yield call(Api.getLead, action.id)
    yield put(getLead(lead))
  } catch (e) {
    yield put(showMessageRequest(e))
  }
}

export function* updateLeadRequest(action) {
  try {
    const lead = yield call(Api.updateLead, action.id, action.lead)
    yield put(updateLead(action.id, lead))
    yield put(showMessageRequest('Lead is updated successfully.'))
    yield call(browserHistory.push, '/')
  } catch (e) {
    yield put(showMessageRequest(e))
  }
}

export function* deleteLeadRequest(action) {
  try {
    yield call(Api.deleteLead, action.id)
    yield put(deleteLead(action.id))
    yield put(showMessageRequest('Lead is deleted successfully.'))
  } catch (e) {
    yield put(showMessageRequest(e))
  }
}

export function* readTweetsRequest(action) {
  try {
    yield call(Api.readTweets)
    yield call(action.resolve)
  } catch (e) {
    yield put(showMessageRequest(e))
    yield call(action.reject)
  }
}

export function* readGoogleNewsRequest(action) {
  try {
    yield call(Api.readGoogleNews)
    yield call(action.resolve)
  } catch (e) {
    yield put(showMessageRequest(e))
    yield call(action.reject)
  }
}

export function* watchImportLeadsRequest() {
  yield takeEvery(types.IMPORT_LEADS_REQUEST, importLeadsRequest)
}

export function* watchLoadLeadsRequest() {
  yield takeEvery(types.LOAD_LEADS_REQUEST, loadLeadsRequest)
}

export function* watchAddLeadRequest() {
  yield takeEvery(types.ADD_LEAD_REQUEST, addLeadRequest)
}

export function* watchGetLeadRequest() {
  yield takeEvery(types.GET_LEAD_REQUEST, getLeadRequest)
}

export function* watchUpdateLeadRequest() {
  yield takeEvery(types.UPDATE_LEAD_REQUEST, updateLeadRequest)
}

export function* watchDeleteLeadRequest() {
  yield takeEvery(types.DELETE_LEAD_REQUEST, deleteLeadRequest)
}

export function* watchReadTweetsRequest() {
  yield takeEvery(types.READ_TWEETS_REQUEST, readTweetsRequest)
}

export function* watchReadGoogleNewsRequest() {
  yield takeEvery(types.READ_GOOGLE_NEWS_REQUEST, readGoogleNewsRequest)
}
