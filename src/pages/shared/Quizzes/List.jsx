import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../../config/routes'
import Card from '../../../common/Card'
import Badge from '../../../common/Badge'
import { StarRating } from '../../../common/StarRating'

const quizzes = [
    {
        id: 'math-cm1-1',
        title: 'Quiz de Mathématiques CM1',
        subject: 'math',
        level: 'cm1',
        questionCount: 15,
        difficulty: 'medium',
        rating: 4.5
    },
    {
        id: 'french-ce2-2',
        title: 'Conjugaison CE2',
        subject: 'french',
        level: 'ce2',
        questionCount: 10,
        difficulty: 'easy',
        rating: 4.2
    },
    {
        id: 'science-cm2-1',
        title: 'Sciences CM2 - Écosystèmes',
        subject: 'science',
        level: 'cm2',
        questionCount: 12,
        difficulty: 'hard',
        rating: 4.7
    }
]

const QuizList = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map(quiz => (
                <Link
                    key={quiz.id}
                    to={ROUTES.CHILD_PLAY_QUIZ.replace(':id', quiz.id)}
                    className="hover:opacity-90 transition-opacity"
                >
                    <Card className="h-full hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <h3 className="text-lg font-bold">{quiz.title}</h3>
                            <div className="mt-2 flex items-center space-x-2">
                                <Badge color={
                                    quiz.subject === 'math' ? 'primary' :
                                        quiz.subject === 'french' ? 'secondary' : 'success'
                                }>
                                    {quiz.subject === 'math' && 'Maths'}
                                    {quiz.subject === 'french' && 'Français'}
                                    {quiz.subject === 'science' && 'Sciences'}
                                </Badge>
                                <Badge color="gray">
                                    {quiz.level.toUpperCase()}
                                </Badge>
                                <Badge color={
                                    quiz.difficulty === 'easy' ? 'success' :
                                        quiz.difficulty === 'medium' ? 'warning' : 'danger'
                                }>
                                    {quiz.difficulty === 'easy' && 'Facile'}
                                    {quiz.difficulty === 'medium' && 'Moyen'}
                                    {quiz.difficulty === 'hard' && 'Difficile'}
                                </Badge>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                    {quiz.questionCount} questions
                                </span>
                                <StarRating rating={quiz.rating} />
                            </div>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    )
}

export default QuizList