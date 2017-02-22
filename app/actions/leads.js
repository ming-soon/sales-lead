import * as types from './types'

export const importLeadsRequest = leads => ({
  type: types.IMPORT_LEADS_REQUEST,
  leads,
})

export const importLeads = leads => ({
  type: types.IMPORT_LEADS,
  leads,
})

export const loadLeadsRequest = () => ({
  type: types.LOAD_LEADS_REQUEST,
})

export const loadLeads = leads => ({
  type: types.LOAD_LEADS,
  leads,
})
