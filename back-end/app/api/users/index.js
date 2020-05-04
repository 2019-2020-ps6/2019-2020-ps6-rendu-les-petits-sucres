const {Router} = require('express')

const {User} = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const {deletePlayedQuizzesFromSpecificUser} = require("../playedQuizzes/manager");

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
        const user = User.create({...req.body})
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
        deletePlayedQuizzesFromSpecificUser(req.params.userId)
        User.delete(req.params.userId)
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/', (req, res) => {
    try {
        res.status(200).json(User.get())
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/authenticate', (req, res) => {
    try {
        const users = User.get();
        const user = users.find(u => u.username === req.body.username && u.password === req.body.password);
        const userIsAdmin = users.find(u => u.username === req.body.username && u.password === req.body.password && u.isAdmin);
        if (userIsAdmin) {
            res.json(userIsAdmin);
        } else if (user && !userIsAdmin) {
            res.status(400).json({message: 'Vous n\'êtes pas un administrateur !'})
        } else {
            res.status(400).json({message: 'Identifiant ou mot de passe incorrect'})
        }
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/patient/authenticate', (req, res) => {
    try {
        const users = User.get();
        const user = users.find(u => u.username === req.body.username);
        res.json(user);
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router
