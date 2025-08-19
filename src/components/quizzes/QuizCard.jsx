// src/components/quizzes/QuizCard.jsx
import { Link } from 'react-router-dom'
import Badge from '../common/Badge'
import Button from '../common/Button'
import { ROUTES } from '../../../config/routes'

function QuizCard({
    quiz,
    showActions = true,
    className = ''
}) {
    return (
        <div className={`border rounded-lg overflow-hidden shadow-sm ${className}`}>
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-medium">{quiz.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{quiz.subject} • Niveau {quiz.level}</p>
                    </div>
                    <Badge variant={quiz.difficulty === 'hard' ? 'danger' : quiz.difficulty === 'medium' ? 'warning' : 'success'}>
                        {quiz.difficulty === 'hard' ? 'Difficile' : quiz.difficulty === 'medium' ? 'Moyen' : 'Facile'}
                    </Badge>
                </div>

                <p className="mt-3 text-gray-700 text-sm">{quiz.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                    <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {quiz.duration} min
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        {quiz.questionsCount} questions
                    </div>
                </div>
            </div>

            {showActions && (
                <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                    <span className="text-sm font-medium">
                        {quiz.bestScore ? `Meilleur score: ${quiz.bestScore}%` : 'Pas encore tenté'}
                    </span>
                    <Button
                        as={Link}
                        to={`${ROUTES.CHILD_PLAY_QUIZ}/${quiz.id}`}
                        size="sm"
                    >
                        Commencer
                    </Button>
                </div>
            )}
        </div>
    )
}

export default QuizCard