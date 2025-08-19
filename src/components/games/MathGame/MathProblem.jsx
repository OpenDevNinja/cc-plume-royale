// src/components/games/MathGame/MathProblem.jsx
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const MathProblem = ({ problem, onAnswer }) => {
    const [userAnswer, setUserAnswer] = useState('')
    const [feedback, setFeedback] = useState(null)

    useEffect(() => {
        setUserAnswer('')
        setFeedback(null)
    }, [problem])

    const handleSubmit = (e) => {
        e.preventDefault()
        const isCorrect = parseInt(userAnswer) === problem.answer
        setFeedback(isCorrect ? 'Correct!' : `Incorrect! La réponse était ${problem.answer}`)
        setTimeout(() => {
            onAnswer(isCorrect)
        }, 1000)
    }

    return (
        <div className="text-center py-8">
            <div className="text-4xl font-bold mb-4">
                {problem?.a} {problem?.operation} {problem?.b} = ?
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="text-2xl p-2 border rounded text-center w-32 mb-4"
                    autoFocus
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                >
                    Valider
                </button>
            </form>
            {feedback && (
                <div className={`mt-4 text-lg ${feedback.includes('Correct') ? 'text-success-600' : 'text-danger-600'
                    }`}>
                    {feedback}
                </div>
            )}
        </div>
    )
}

MathProblem.propTypes = {
    problem: PropTypes.shape({
        a: PropTypes.number.isRequired,
        b: PropTypes.number.isRequired,
        operation: PropTypes.string.isRequired,
        answer: PropTypes.number.isRequired
    }).isRequired,
    onAnswer: PropTypes.func.isRequired
}

export default MathProblem