const { PlayedQuiz } = require('../../models')

const buildPlayedQuiz = (playedQuizId) => {
    return PlayedQuiz.getById(playedQuizId)
}

const buildPlayedQuizzes = () => {
    const playedQuizzes = PlayedQuiz.get()
    return playedQuizzes.map((playedQuiz) => buildPlayedQuiz(playedQuiz.id))
}

const buildPlayedQuizzesFromUserId = (userId) => {
    const playedQuizzes = PlayedQuiz.get()
    return playedQuizzes.filter((playedQuiz) => (playedQuiz.userId === +userId)).reverse()
}

module.exports = {
    buildPlayedQuiz,
    buildPlayedQuizzes,
    buildPlayedQuizzesFromUserId
}
