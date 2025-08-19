// src/components/quizzes/QuizStart.jsx
import Button from '../common/Button'
import Badge from '../common/Badge'

function QuizStart({
    quiz,
    bestScore,
    onStart,
    onBack,
    className = ''
}) {
    return (
        <div className={`text-center space-y-6 ${className}`}>
            <h2 className="text-2xl font-bold">{quiz.title}</h2>

            <div className="flex justify-center gap-2">
                <Badge variant="primary">{quiz.subject}</Badge>
                <Badge variant="secondary">Niveau {quiz.level}</Badge>
                <Badge variant={quiz.difficulty === 'hard' ? 'danger' : 'warning'}>
                    {quiz.difficulty === 'hard' ? 'Difficile' : quiz.difficulty === 'medium' ? 'Moyen' : 'Facile'}
                </Badge>
            </div>

            <p className="text-gray-600">{quiz.description}</p>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Questions</div>
                    <div className="font-bold">{quiz.questionsCount}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Durée</div>
                    <div className="font-bold">{quiz.duration} min</div>
                </div>
            </div>

            {bestScore && (
                <div className="bg-primary-50 text-primary-800 p-4 rounded-lg inline-block">
                    Votre meilleur score: <span className="font-bold">{bestScore}%</span>
                </div>
            )}

            <div className="flex justify-center gap-4 pt-4">
                <Button
                    variant="outline"
                    onClick={onBack}
                >
                    Retour
                </Button>
                <Button
                    onClick={onStart}
                >
                    Commencer le quiz
                </Button>
            </div>
        </div>
    )
}

export default QuizStart