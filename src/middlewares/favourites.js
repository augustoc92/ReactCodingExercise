/* global fetch:false */
import get from 'lodash/get'
import { fetchFavouritesActionCreator, REHYDRATED } from '../actions'
import { getFavouritesApiUrl } from '../selectors/config'

const fetchFavourites = async (apiUrl) => {
  let url = apiUrl
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json'
    }
  })

  const data = await response.json()
  const favourites = data

  if (!response.ok || !favourites) {
    const error = new Error(get(data, ['error', 'message']) || 'Failed to fetch favourites')
    error.status = response.status
    throw error
  }

  return favourites
}

// REHYDRATED WILL BE TRIGGER  BOTH STORES ACTION
// AND FETCH DATA ONCE FOR THE APP WHEN LAUNCHED
export default store => next => action => {
  const ret = next(action)
  if (action.type === REHYDRATED) {
    const state = store.getState()
    const apiUrl = getFavouritesApiUrl(state)
    store.dispatch(fetchFavouritesActionCreator(fetchFavourites(apiUrl)))
  }

  return ret
}
