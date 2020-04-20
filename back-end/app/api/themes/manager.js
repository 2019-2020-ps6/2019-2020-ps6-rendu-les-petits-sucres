const { Theme } = require('../../models')

const buildTheme = (themeId) => {
  const theme = Theme.getById(themeId)
  return { ...theme }
}

/**
 * Function buildQuizzes.
 * This function aggregates the questions and answers from the database to build entire quizzes.
 */
const buildThemes = () => {
  const themes = Theme.get()
  return themes.map((theme) => buildTheme(theme.id))
}

module.exports = {
  buildTheme,
  buildThemes,
}
