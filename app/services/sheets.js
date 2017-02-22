import { fetchGet, fetchPost, fetchPut, fetchDelete } from './helpers'

export const loadSheets = () => (
  new Promise((resolve, reject) => {
    fetchGet('/sheets').then((response) => {
      if (response.status !== 200) {
        response.json().then((json) => {
          let message = json.message
          if (Array.isArray(message)) {
            message = message.join()
          }
          reject(message)
        })
      } else {
        response.json().then((sheets) => {
          resolve(sheets)
        })
      }
    })
  })
)

export const addSheet = sheet => (
  new Promise((resolve, reject) => {
    fetchPost('/sheets', {
      title: sheet.title,
      spreadsheetId: sheet.spreadsheetId,
      sheetName: sheet.sheetName,
    }).then((response) => {
      if (response.status !== 200) {
        response.json().then((json) => {
          let message = json.message
          if (Array.isArray(message)) {
            message = message.join()
          }
          reject(message)
        })
      } else {
        response.json().then((sheetAdded) => {
          resolve(sheetAdded)
        })
      }
    })
  })
)

export const getSheet = id => (
  new Promise((resolve, reject) => {
    fetchGet(`/sheets/${id}`).then((response) => {
      if (response.status !== 200) {
        response.json().then((json) => {
          let message = json.message
          if (Array.isArray(message)) {
            message = message.join()
          }
          reject(message)
        })
      } else {
        response.json().then((sheet) => {
          resolve(sheet)
        })
      }
    })
  })
)

export const updateSheet = (id, sheet) => (
  new Promise((resolve, reject) => {
    fetchPut(`/sheets/${id}`, {
      title: sheet.title,
      spreadsheetId: sheet.spreadsheetId,
      sheetName: sheet.sheetName,
    }).then((response) => {
      if (response.status !== 200) {
        response.json().then((json) => {
          let message = json.message
          if (Array.isArray(message)) {
            message = message.join()
          }
          reject(message)
        })
      } else {
        response.json().then((sheetUpdated) => {
          resolve(sheetUpdated)
        })
      }
    })
  })
)

export const deleteSheet = id => (
  new Promise((resolve) => {
    fetchDelete(`/sheets/${id}`).then(() => {
      resolve(id)
    })
  })
)
