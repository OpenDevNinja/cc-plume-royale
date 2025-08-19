// src/components/quizzes/QuizResults.jsx
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../config/routes'
import Button from '../common/Button'
import ProgressCircle from '../common/ProgressCircle'

function QuizResults({
    score,
    totalQuestions,
    correctAnswers,
    timeSpent,
    onRetry
}) {
    const navigate = useNavigate()
    const percentage = Math.round((score / totalQuestions) * 100)
    const performanceLevel =
        percentage >= 90 ? 'Excellent' :
            percentage >= 70 ? 'Bon' :
                percentage >= 50 ? 'Moyen' : 'À améliorer'

    return (
        <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Résultats du Quiz</h2>

            <div className="flex justify-center">
                <ProgressCircle
                    value={percentage}
                    size={120}
                    strokeWidth={10}
                    className="text-3xl font-bold"
                >
                    {percentage}%
                </ProgressCircle>
            </div>

            <div>
                <p className="text-lg font-medium">{performanceLevel}</p>
                <p className="text-gray-600">
                    {correctAnswers} bonnes réponses sur {totalQuestions}
                </p>
                <p className="text-gray-600">Temps: {timeSpent}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-md mx-auto">
                <Button onClick={onRetry} variant="outline">
                    Réessayer
                </Button>
                <Button onClick={() => navigate(ROUTES.CHILD_QUIZZES)}>
                    Voir d'autres quiz
                </Button>
            </div>
        </div>
    )
}

export default QuizResults