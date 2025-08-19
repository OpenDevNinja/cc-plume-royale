// src/components/games/MathGame/MathGame.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../config/routes'
import GameLayout from '../GamesLayout'
import MathProblem from './MathProblem'
import MathResults from './MathResults'
import { saveGameProgress } from '../../../api/games'

const OPERATIONS = ['+', '-', '*', '/']
const DIFFICULTY_LEVELS = {
    easy: { range: 10, time: 30 },
    medium: { range: 20, time: 20 },
    hard: { range: 50, time: 15 }
}

function MathGame() {
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(60)
    const [gameStarted, setGameStarted] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [currentProblem, setCurrentProblem] = useState(null)
    const [difficulty, setDifficulty] = useState('medium')
    const navigate = useNavigate()

    useEffect(() => {
        if (gameStarted && !gameOver && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
            return () => clearTimeout(timer)
        } else if (timeLeft === 0) {
            endGame()
        }
    }, [timeLeft, gameStarted, gameOver])

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
            case '/':
                b = Math.floor(Math.random() * Math.sqrt(range)) + 1
                answer = Math.floor(Math.random() * Math.sqrt(range)) + 1
                a = answer * b
                break
            default:
                a = 0
                b = 0
                answer = 0
        }

        setCurrentProblem({ a, b, operation, answer })
    }

    const startGame = () => {
        setScore(0)
        setTimeLeft(DIFFICULTY_LEVELS[difficulty].time)
        setGameStarted(true)
        setGameOver(false)
        generateProblem()
    }

    const endGame = async () => {
        setGameOver(true)
        setGameStarted(false)
        try {
            await saveGameProgress({
                gameId: 'math-game',
                score,
                difficulty,
                timePlayed: DIFFICULTY_LEVELS[difficulty].time - timeLeft
            })
        } catch (error) {
            console.error('Failed to save game progress:', error)
        }
    }

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1)
        }
        generateProblem()
    }

    return (
        <GameLayout
            title="Jeu de Mathématiques"
            onBack={() => navigate(ROUTES.CHILD_GAMES)}
        >
            {!gameStarted && !gameOver && (
                <div className="text-center space-y-6">
                    <h2 className="text-2xl font-bold">Choisis la difficulté</h2>
                    <div className="flex justify-center gap-4">
                        {Object.keys(DIFFICULTY_LEVELS).map((level) => (
                            <button
                                key={level}
                                onClick={() => setDifficulty(level)}
                                className={`px-4 py-2 rounded-md ${difficulty === level
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={startGame}
                        className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                    >
                        Commencer le jeu
                    </button>
                </div>
            )}

            {gameStarted && !gameOver && (
                <div className="space-y-8">
                    <div className="flex justify-between items-center">
                        <div className="text-xl font-bold">Score: {score}</div>
                        <div className="text-xl font-bold">Temps: {timeLeft}s</div>
                    </div>

                    <div className="h-2 bg-gray-200 rounded-full">
                        <div
                            className="h-full bg-primary-600 rounded-full"
                            style={{
                                width: `${(timeLeft / DIFFICULTY_LEVELS[difficulty].time) * 100}%`
                            }}
                        ></div>
                    </div>

                    <MathProblem
                        problem={currentProblem}
                        onAnswer={handleAnswer}
                    />
                </div>
            )}

            {gameOver && (
                <MathResults
                    score={score}
                    onRestart={startGame}
                    onBack={() => navigate(ROUTES.CHILD_GAMES)}
                />
            )}
        </GameLayout>
    )
}

export default MathGame