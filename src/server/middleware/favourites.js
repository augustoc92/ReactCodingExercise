import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.json(req.session.favourites || [])
})

router.put('/:id', (req, res) => {
  const favourites = req.session.favourites = (req.session.favourites || [])
  const id = +req.params.id
  if (favourites.indexOf(id) < 0) {
    favourites.push(id)
  }
  res.json(favourites)
})

router.delete('/:id', (req, res) => {
  const favourites = req.session.favourites = (req.session.favourites || [])
  const id = +req.params.id
  const index = favourites.indexOf(id)
  if (index >= 0) {
    favourites.splice(index, 1)
  }

  res.json(favourites)
})

export default router
