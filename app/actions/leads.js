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

export const addLeadRequest = lead => ({
  type: types.ADD_LEAD_REQUEST,
  lead,
})

export const addLead = lead => ({
  type: types.ADD_LEAD,
  lead,
})

export const getLeadRequest = id => ({
  type: types.GET_LEAD_REQUEST,
  id,
})

export const getLead = lead => ({
  type: types.GET_LEAD,
  lead,
})

export const updateLeadRequest = (id, lead) => ({
  type: types.UPDATE_LEAD_REQUEST,
  id,
  lead,
})

export const updateLead = (id, lead) => ({
  type: types.UPDATE_LEAD,
  id,
  lead,
})

export const deleteLeadRequest = id => ({
  type: types.DELETE_LEAD_REQUEST,
  id,
})

export const deleteLead = id => ({
  type: types.DELETE_LEAD,
  id,
})

export const readTweetsRequest = (resolve, reject) => ({
  type: types.READ_TWEETS_REQUEST,
  resolve,
  reject,
})

export const readGoogleNewsRequest = (resolve, reject) => ({
  type: types.READ_GOOGLE_NEWS_REQUEST,
  resolve,
  reject,
})
