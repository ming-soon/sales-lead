import { fetchGet, fetchPost, fetchPut, fetchDelete } from './helpers'

export const importLeads = leads => (
  new Promise((resolve, reject) => {
    fetchPost('/leads/bulk', {
      leads,
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
        response.json().then((leadsAdded) => {
          resolve(leadsAdded)
        })
      }
    })
  })
)

export const loadLeads = () => (
  new Promise((resolve, reject) => {
    fetchGet('/leads').then((response) => {
      if (response.status !== 200) {
        response.json().then((json) => {
          let message = json.message
          if (Array.isArray(message)) {
            message = message.join()
          }
          reject(message)
        })
      } else {
        response.json().then((leads) => {
          resolve(leads)
        })
      }
    })
  })
)

export const addLead = lead => (
  new Promise((resolve, reject) => {
    fetchPost('/leads', lead).then((response) => {
      if (response.status !== 200) {
        response.json().then((json) => {
          let message = json.message
          if (Array.isArray(message)) {
            message = message.join()
          }
          reject(message)
        })
      } else {
        response.json().then((leadAdded) => {
          resolve(leadAdded)
        })
      }
    })
  })
)

export const getLead = id => (
  new Promise((resolve, reject) => {
    fetchGet(`/leads/${id}`).then((response) => {
      if (response.status !== 200) {
        response.json().then((json) => {
          let message = json.message
          if (Array.isArray(message)) {
            message = message.join()
          }
          reject(message)
        })
      } else {
        response.json().then((lead) => {
          resolve(lead)
        })
      }
    })
  })
)

export const updateLead = (id, lead) => (
  new Promise((resolve, reject) => {
    fetchPut(`/leads/${id}`, lead).then((response) => {
      if (response.status !== 200) {
        response.json().then((json) => {
          let message = json.message
          if (Array.isArray(message)) {
            message = message.join()
          }
          reject(message)
        })
      } else {
        response.json().then((leadUpdated) => {
          resolve(leadUpdated)
        })
      }
    })
  })
)

export const deleteLead = id => (
  new Promise((resolve) => {
    fetchDelete(`/leads/${id}`).then(() => {
      resolve(id)
    })
  })
)

export const readTweets = () => (
  new Promise((resolve, reject) => {
    fetchGet('/leads/tweets/read').then((response) => {
      if (response.status !== 200) {
        response.json().then((json) => {
          let message = json.message
          if (Array.isArray(message)) {
            message = message.join()
          }
          reject(message)
        })
      } else {
        response.json().then(() => {
          resolve()
        })
      }
    })
  })
)

export const readGoogleNews = () => (
  new Promise((resolve, reject) => {
    fetchGet('/leads/google_news/read').then((response) => {
      if (response.status !== 200) {
        response.json().then((json) => {
          let message = json.message
          if (Array.isArray(message)) {
            message = message.join()
          }
          reject(message)
        })
      } else {
        response.json().then(() => {
          resolve()
        })
      }
    })
  })
)
