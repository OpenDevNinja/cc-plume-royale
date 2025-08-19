// src/pages/child/Games/MathGame.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import GameLayout from '@/components/games/GamesLayout'
import { useGame } from '@/contexts/GameContext'
import { showSuccessNotification } from '@/utils/notifications'

const OPERATIONS = ['+', '-', '*']
const DIFFICULTY_LEVELS = {
    easy: { range: 10, time: 60 },
    medium: { range: 20, time: 45 },
    hard: { range: 50, time: 30 }
}

function MathGame() {
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(0)
    const [gameActive, setGameActive] = useState(false)
    const [currentProblem, setCurrentProblem] = useState(null)
    const [userAnswer, setUserAnswer] = useState('')
    const [difficulty, setDifficulty] = useState('medium')
    const { updateGameProgress } = useGame()
    const navigate = useNavigate()

    const generateProblem = () => {
        const operation = OPERATIONS[Math.floor(Math.random() * OPERATIONS.length)]
        const { range } = DIFFICULTY_LEVELS[difficulty]
        let a, b, answer

        switch (operation) {
            case '+':
                a = Math.floor(Math.random() * range)
                b = Math.floor(Math.random() * range)
                answer = a + b
                break
            case '-':
                a = Math.floor(Math.random() * range)
                b = Math.floor(Math.random() * range)
                answer = a - b
                break
            case '*':
                a = Math.floor(Math.random() * Math.sqrt(range))
                b = Math.floor(Math.random() * Math.sqrt(range))
                answer = a * b
                break
            default:
                a = 0
                b = 0
                answer = 0
        }

        setCurrentProblem({ a, b, operation, answer })
        setUserAnswer('')
    }

    const startGame = () => {
        setScore(0)
        setTimeLeft(DIFFICULTY_LEVELS[difficulty].time)
        setGameActive(true)
        generateProblem()
    }

    const endGame = async () => {
        setGameActive(false)
        await updateGameProgress('math-game', {
            score,
            difficulty,
            timePlayed: DIFFICULTY_LEVELS[difficulty].time - timeLeft
        })
        showSuccessNotification(`Score final: ${score}`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (parseInt(userAnswer) === currentProblem.answer) {
            setScore(score + 1)
            generateProblem()
        } else {
            alert(`Incorrect! La réponse était ${currentProblem.answer}`)
            generateProblem()
        }
    }

    useEffect(() => {
        let timer
        if (gameActive && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
        } else if (timeLeft === 0 && gameActive) {
            endGame()
        }
        return () => clearTimeout(timer)
    }, [timeLeft, gameActive])

    return (
        <GameLayout
            title="Jeu de Mathématiques"
            onBack={() => navigate(ROUTES.CHILD_GAMES)}
        >
            {!gameActive ? (
                <div className="text-center space-y-6">
                    <h2 className="text-2xl font-bold">Choisis la difficulté</h2>
                    <div className="flex justify-center gap-4">
                        {Object.keys(DIFFICULTY_LEVELS).map((level) => (
                            <button
                                key={level}
                                onClick={() => setDifficulty(level)}
                                className={`px-4 py-2 rounded-lg ${difficulty === level
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}
                            >
                                {capitalize(level)}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={startGame}
                        className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                        Commencer
                    </button>
                </div>
            ) : (
                <div className="space-y-8 text-center">
                    <div className="flex justify-between">
                        <div>Score: {score}</div>
                        <div>Temps: {timeLeft}s</div>
                    </div>

                    <div className="text-4xl font-bold my-8">
                        {currentProblem?.a} {currentProblem?.operation} {currentProblem?.b} = ?
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="number"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className="text-2xl p-2 border rounded text-center w-32"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded"
                        >
                            Valider
                        </button>
                    </form>
                </div>
            )}
        </GameLayout>
    )
}

export default MathGame