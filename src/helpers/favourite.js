/* global fetch:false */
import get from 'lodash/get'

const toggleFavouriteId = (favourites, id) => {
  if (favourites.some(x => x === id)) {
    deleteFavourites(id)
  } else {
    putFavourites(id)
  }
}

const putFavourites = async (Id) => {
  let url = 'http://localhost:3000/api/favourites'
  url += `/${Id}`
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json'
    }
  })
  const data = await response.json()
  const favourites = data

  if (!response.ok || !favourites) {
    const error = new Error(get(data, ['error', 'message']) || 'Failed to update favourites')
    error.status = response.status
    throw error
  }

  return favourites
}

const deleteFavourites = async (Id) => {
  let url = 'http://localhost:3000/api/favourites'
  url += `/${Id}`
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json'
    }
  })
  const data = await response.json()
  const favourites = data

  if (!response.ok || !favourites) {
    const error = new Error(get(data, ['error', 'message']) || 'Failed to update favourites')
    error.status = response.status
    throw error
  }

  return favourites
}

export default toggleFavouriteId
