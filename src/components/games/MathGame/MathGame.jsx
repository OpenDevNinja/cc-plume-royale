// src/components/games/MathGame/MathGame.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../config/routes'
import { saveGameProgress } from '../../../data/services/gameService'
import GameLayout from '../GameLayout'
import ProgressBar from '../../common/ProgressBar'
import Button from '../../common/Button'

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
    const [userAnswer, setUserAnswer] = useState('')
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
        setUserAnswer('')
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

    const handleSubmit = (e) => {
        e.preventDefault()
        if (parseInt(userAnswer) === currentProblem.answer) {
            setScore(score + 1)
            generateProblem()
        } else {
            alert(`Incorrect! La bonne réponse était ${currentProblem.answer}`)
            generateProblem()
        }
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
                            <Button
                                key={level}
                                variant={difficulty === level ? 'primary' : 'outline'}
                                onClick={() => setDifficulty(level)}
                            >
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                            </Button>
                        ))}
                    </div>
                    <Button
                        size="lg"
                        onClick={startGame}
                    >
                        Commencer le jeu
                    </Button>
                </div>
            )}

            {gameStarted && !gameOver && (
                <div className="space-y-8">
                    <div className="flex justify-between items-center">
                        <div className="text-xl font-bold">Score: {score}</div>
                        <div className="text-xl font-bold">Temps: {timeLeft}s</div>
                    </div>

                    <ProgressBar
                        value={(timeLeft / DIFFICULTY_LEVELS[difficulty].time) * 100}
                        color="primary"
                    />

                    <div className="text-center py-8">
                        <div className="text-4xl font-bold mb-4">
                            {currentProblem?.a} {currentProblem?.operation} {currentProblem?.b} = ?
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col items-center">
                            <input
                                type="number"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                className="text-2xl p-2 border rounded text-center w-32"
                                autoFocus
                            />
                            <Button type="submit" className="mt-4">
                                Valider
                            </Button>
                        </form>
                    </div>
                </div>
            )}

            {gameOver && (
                <div className="text-center space-y-6">
                    <h2 className="text-2xl font-bold">Jeu terminé!</h2>
                    <p className="text-xl">Ton score final: {score}</p>
                    <div className="flex justify-center gap-4">
                        <Button onClick={startGame}>Rejouer</Button>
                        <Button
                            variant="outline"
                            onClick={() => navigate(ROUTES.CHILD_GAMES)}
                        >
                            Retour aux jeux
                        </Button>
                    </div>
                </div>
            )}
        </GameLayout>
    )
}

export default MathGame