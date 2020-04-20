const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const UserRouter = require('./users')
const PlayedQuizzesRouter = require('./playedQuizzes')
const ThemesRouter = require('./themes')


const router = new Router()
router.get('/status', (req, res) => res.status(200).json('OK'))
router.use('/quizzes', QuizzesRouter)
router.use('/themes', ThemesRouter)
router.use('/users', UserRouter)
router.use('/playedQuizzes', PlayedQuizzesRouter)

module.exports = router
