import { fetchGet, fetchPost } from './helpers'

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
