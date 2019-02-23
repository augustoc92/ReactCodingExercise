export const isFavouritedSelector = (state, id) => {
  const { favourites: { favourites } } = state
  if (favourites && favourites.some((x) => x === id)) {
    return true
  }
  return false
}
