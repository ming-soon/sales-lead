import { fork } from 'redux-saga/effects'
import { watchLoginUserRequest, watchLogoutUserRequest, watchChangePasswordRequest } from './user'
import { watchLoadUsersRequest, watchAddUserRequest, watchGetUserRequest, watchUpdateUserRequest, watchDeleteUserRequest } from './users'
import { watchLoadSheetsRequest, watchAddSheetRequest, watchGetSheetRequest, watchUpdateSheetRequest, watchDeleteSheetRequest } from './sheets'
import { watchImportLeadsRequest, watchLoadLeadsRequest } from './leads'
import { watchShowMessageRequest } from './messages'

export default function* rootSaga() {
  yield [
    // Authentication.
    fork(watchLoginUserRequest),
    fork(watchLogoutUserRequest),
    fork(watchChangePasswordRequest),
    // Users.
    fork(watchLoadUsersRequest),
    fork(watchAddUserRequest),
    fork(watchGetUserRequest),
    fork(watchUpdateUserRequest),
    fork(watchDeleteUserRequest),
    // Sheets.
    fork(watchLoadSheetsRequest),
    fork(watchAddSheetRequest),
    fork(watchGetSheetRequest),
    fork(watchUpdateSheetRequest),
    fork(watchDeleteSheetRequest),
    // Leads.
    fork(watchImportLeadsRequest),
    fork(watchLoadLeadsRequest),
    // Messages.
    fork(watchShowMessageRequest),
  ]
}
