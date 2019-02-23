import { ActionType } from 'redux-promise-middleware'
import { FETCH_FAVOURITES_TYPE, TOGGLE_FAVOURITE_TYPE } from '../actions'

const initialState = {
  loadingFavourites: false,
  favourites: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_FAVOURITES_TYPE}_${ActionType.Pending}`:
      return {
        ...state,
        loadingFavourites: true
      }
    case `${FETCH_FAVOURITES_TYPE}_${ActionType.Fulfilled}`:
      return {
        ...state,
        loadingFavourites: false,
        error: undefined,
        favourites: action.payload
      }
    case `${FETCH_FAVOURITES_TYPE}_${ActionType.Rejected}`:
      return {
        ...state,
        error: action.payload
      }
    case TOGGLE_FAVOURITE_TYPE:
      const favourites = state.favourites
      const favouritesArray = [...favourites]
      const idToAdd = action.payload.entityId
      if (favourites && favourites.some(x => x === idToAdd)) {
        favouritesArray.splice(favourites.indexOf(idToAdd), 1)
      } else {
        favouritesArray.push(idToAdd)
      }
      return {
        ...state,
        favourites: favouritesArray
      }

    default:
      return state
  }
}

export default reducer
