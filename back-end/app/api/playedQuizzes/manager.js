const {PlayedQuiz} = require('../../models')

const buildPlayedQuiz = (playedQuizId) => {
    return PlayedQuiz.getById(playedQuizId)
}

const buildPlayedQuizzes = () => {
    const playedQuizzes = PlayedQuiz.get()
    return playedQuizzes.map((playedQuiz) => buildPlayedQuiz(playedQuiz.id))
}

const buildPlayedQuizzesFromUser = (userId) => {
    const playedQuizzes = PlayedQuiz.get()
    return playedQuizzes.filter((playedQuiz) => (playedQuiz.userId === +userId)).reverse()
}

const deletePlayedQuizzesFromSpecificUser = (userId) => {
    const playedQuizzes = buildPlayedQuizzesFromUser(userId)
    playedQuizzes.forEach((playedQuiz) => PlayedQuiz.delete(playedQuiz.id))
}

module.exports = {
    buildPlayedQuiz,
    buildPlayedQuizzes,
    buildPlayedQuizzesFromUser,
    deletePlayedQuizzesFromSpecificUser,
}
