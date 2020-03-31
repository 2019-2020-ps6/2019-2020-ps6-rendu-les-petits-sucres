const { Router } = require('express')

const { User } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const userService = require('./user.service');

const router = new Router()

router.get('/:userId', (req, res) => {
  try {
    res.status(200).json(User.getById(req.params.userId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const user = User.create({ ...req.body })
    res.status(201).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:userId', (req, res) => {
  try {
    res.status(200).json(User.update(req.params.userId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:userId', (req, res) => {
  try {
    User.delete(req.params.userId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/authenticate', authenticate)
router.get('/', (req, res) => {
  try {
    res.status(200).json(User.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router

function authenticate(req, res, next) {
  userService.authenticate(req.body)
      .then(user => user ? res.json(user) : res.status(400).json({ message: 'Identifiant ou mot de passe incorrect' }))
      .catch(err => next(err));
}
