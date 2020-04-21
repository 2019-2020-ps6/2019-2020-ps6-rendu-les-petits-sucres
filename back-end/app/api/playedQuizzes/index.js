const { Router } = require('express')

const manageAllErrors = require('../../utils/routes/error-management')
const {PlayedQuiz} = require('../../models')

const { buildPlayedQuizzes, buildPlayedQuiz, buildPlayedQuizzesFromUserId } = require("./manager");

const router = new Router()

router.get('/', (req, res) => {
    try {
        const playedQuizzes = buildPlayedQuizzes()
        res.status(200).json(playedQuizzes)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/:playedQuizId', (req, res) => {
    try {
        const quiz = buildPlayedQuiz(req.params.playedQuizId)
        res.status(200).json(quiz)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/user/:userId', (req, res) => {
    try {
        const quiz = buildPlayedQuizzesFromUserId(req.params.userId)
        res.status(200).json(quiz)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
    try {
        const playedQuiz = PlayedQuiz.create({ ...req.body })
        res.status(201).json(playedQuiz)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router
