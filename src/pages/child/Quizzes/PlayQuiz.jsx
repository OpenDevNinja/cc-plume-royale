import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Button from '@/components/common/Button'
import ProgressBar from '@/components/common/ProgressBar'
import Timer from '@/components/quizzes/QuizTimer'
//  import { CheckIcon, XIcon } from '@heroicons/react/outline'

const quizData = {
    id: 'math-cm1-1',
    title: 'Quiz de Mathématiques - Niveau CM1',
    duration: 300, // 5 minutes
    questions: [
        {
            id: 1,
            text: "Quel est le résultat de 45 + 37 ?",
            options: ["72", "82", "92", "102"],
            correctAnswer: 1
        },
        {
            id: 2,
            text: "Combien de côtés a un hexagone ?",
            options: ["4", "5", "6", "7"],
            correctAnswer: 2
        },
        {
            id: 3,
            text: "Quel est le double de 24 ?",
            options: ["44", "46", "48", "50"],
            correctAnswer: 2
        }
    ]
}

const PlayQuiz = () => {
    const { quizId } = useParams()
    const navigate = useNavigate()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(quizData.duration)
    const [quizCompleted, setQuizCompleted] = useState(false)

    const currentQuestion = quizData.questions[currentQuestionIndex]

    useEffect(() => {
        if (timeLeft > 0 && !quizCompleted) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
            return () => clearTimeout(timer)
        } else if (timeLeft === 0 && !quizCompleted) {
            setQuizCompleted(true)
        }
    }, [timeLeft, quizCompleted])

    const handleAnswerSelect = (answerIndex) => {
        setSelectedAnswer(answerIndex)
    }

    const handleNextQuestion = () => {
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(score + 1)
        }

        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setSelectedAnswer(null)
        } else {
            setQuizCompleted(true)
        }
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    if (quizCompleted) {
        navigate(ROUTES.CHILD_QUIZ_COMPLETED.replace(':id', quizId), {
            state: { score, totalQuestions: quizData.questions.length }
        })
        return null
    }

    return (
        <DashboardLayout title={quizData.title} backLink={ROUTES.CHILD_QUIZZES}>
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-lg font-medium">
                            Question {currentQuestionIndex + 1}/{quizData.questions.length}
                        </div>
                        <div className="text-lg font-medium text-warning-600">
                            <Timer timeLeft={timeLeft} />
                        </div>
                    </div>

                    <ProgressBar
                        value={(currentQuestionIndex / quizData.questions.length) * 100}
                        className="mb-6"
                    />

                    <div className="mb-8">
                        <h3 className="text-xl font-medium mb-6">{currentQuestion.text}</h3>
                        <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`w-full text-left p-4 rounded-lg border transition-all ${selectedAnswer === index
                                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                                        : 'border-gray-200 hover:border-primary-300'
                                        }`}
                                    onClick={() => handleAnswerSelect(index)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            onClick={handleNextQuestion}
                            disabled={selectedAnswer === null}
                            variant="primary"
                        >
                            {currentQuestionIndex < quizData.questions.length - 1 ? 'Question suivante' : 'Terminer le quiz'}
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default PlayQuiz