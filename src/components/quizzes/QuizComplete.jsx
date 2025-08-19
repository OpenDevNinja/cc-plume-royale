// src/components/quizzes/QuizComplete.jsx
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../config/routes'
import Button from '../common/Button'
import PropTypes from 'prop-types'

const QuizComplete = ({ score, totalQuestions, timeTaken }) => {
    const percentage = Math.round((score / totalQuestions) * 100)
    let message = ''
    let emoji = ''

    if (percentage >= 80) {
        message = 'Excellent travail!'
        emoji = '🎉'
    } else if (percentage >= 60) {
        message = 'Bon travail!'
        emoji = '👍'
    } else if (percentage >= 40) {
        message = 'Pas mal!'
        emoji = '😊'
    } else {
        message = 'Continue à pratiquer!'
        emoji = '💪'
    }

    return (
        <div className="text-center py-8">
            <div className="text-6xl mb-4">{emoji}</div>
            <h2 className="text-2xl font-bold mb-2">{message}</h2>
            <p className="text-lg mb-6">
                Tu as obtenu {score} bonnes réponses sur {totalQuestions} ({percentage}%) en {timeTaken} secondes.
            </p>
            <div className="flex justify-center space-x-4">
                <Link to={ROUTES.CHILD_QUIZZES}>
                    <Button variant="outline">Retour aux quiz</Button>
                </Link>
                <Link to={`${ROUTES.CHILD_PLAY_QUIZ}/${quiz.id}`}>
                    <Button>Rejouer</Button>
                </Link>
            </div>
        </div>
    )
}

QuizComplete.propTypes = {
    score: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    timeTaken: PropTypes.number.isRequired
}

export default QuizComplete