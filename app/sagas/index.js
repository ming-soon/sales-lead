import { fork } from 'redux-saga/effects'
import { watchLoginUserRequest, watchLogoutUserRequest, watchChangePasswordRequest } from './user'
import { watchLoadUsersRequest, watchAddUserRequest, watchGetUserRequest, watchUpdateUserRequest, watchDeleteUserRequest } from './users'
import { watchLoadSheetsRequest, watchAddSheetRequest, watchGetSheetRequest, watchUpdateSheetRequest, watchDeleteSheetRequest } from './sheets'
import { watchShowMessageRequest } from './messages'

export default function* rootSaga() {
  yield [
    fork(watchLoginUserRequest),
    fork(watchLogoutUserRequest),
    fork(watchChangePasswordRequest),
    fork(watchLoadUsersRequest),
    fork(watchAddUserRequest),
    fork(watchGetUserRequest),
    fork(watchUpdateUserRequest),
    fork(watchDeleteUserRequest),
    fork(watchLoadSheetsRequest),
    fork(watchAddSheetRequest),
    fork(watchGetSheetRequest),
    fork(watchUpdateSheetRequest),
    fork(watchDeleteSheetRequest),
    fork(watchShowMessageRequest),
  ]
}
