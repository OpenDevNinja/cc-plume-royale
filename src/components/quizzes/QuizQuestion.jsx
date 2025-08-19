// src/components/quizzes/QuizQuestion.jsx
import { useState } from 'react'
import Button from '../common/Button'

function QuizQuestion({
    question,
    questionIndex,
    totalQuestions,
    onAnswer,
    onNext,
    onPrev
}) {
    const [selectedOption, setSelectedOption] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = () => {
        setIsSubmitted(true)
        onAnswer(selectedOption)
    }

    const handleNext = () => {
        setIsSubmitted(false)
        setSelectedOption(null)
        onNext()
    }

    const isCorrect = selectedOption === question.correctAnswer

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-gray-500">
                        Question {questionIndex + 1} sur {totalQuestions}
                    </span>
                    <span className="text-sm font-medium text-gray-500">
                        Points: {question.points}
                    </span>
                </div>

                <h3 className="text-xl font-medium mb-6">{question.text}</h3>

                <div className="space-y-3">
                    {question.options.map((option, index) => {
                        let optionClasses = "p-4 border rounded-lg cursor-pointer"

                        if (isSubmitted) {
                            if (index === question.correctAnswer) {
                                optionClasses += " bg-success-50 border-success-300"
                            } else if (index === selectedOption && !isCorrect) {
                                optionClasses += " bg-danger-50 border-danger-300"
                            }
                        } else {
                            optionClasses += selectedOption === index
                                ? " bg-primary-50 border-primary-300"
                                : " hover:bg-gray-50"
                        }

                        return (
                            <div
                                key={index}
                                className={optionClasses}
                                onClick={() => !isSubmitted && setSelectedOption(index)}
                            >
                                {option}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="flex justify-between">
                <Button
                    onClick={onPrev}
                    disabled={questionIndex === 0}
                    variant="outline"
                >
                    Précédent
                </Button>

                {!isSubmitted ? (
                    <Button
                        onClick={handleSubmit}
                        disabled={selectedOption === null}
                    >
                        Valider
                    </Button>
                ) : (
                    <Button onClick={handleNext}>
                        {questionIndex < totalQuestions - 1 ? 'Suivant' : 'Terminer'}
                    </Button>
                )}
            </div>

            {isSubmitted && (
                <div className={`p-4 rounded-lg ${isCorrect ? 'bg-success-50 text-success-700' : 'bg-danger-50 text-danger-700'
                    }`}>
                    {isCorrect
                        ? question.explanation || 'Correct! Bien joué!'
                        : question.explanation || `Incorrect. La bonne réponse était: ${question.options[question.correctAnswer]}`}
                </div>
            )}
        </div>
    )
}

export default QuizQuestion