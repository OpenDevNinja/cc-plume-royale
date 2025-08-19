// src/components/games/PuzzleGame/PuzzleGame.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../config/routes'
import GameLayout from '../GamesLayout'
import PuzzleBoard from './PuzzleBoard'
import { saveGameProgress } from '../../../api/games'

const PUZZLE_IMAGES = [
    '/assets/images/puzzle1.jpg',
    '/assets/images/puzzle2.jpg',
    '/assets/images/puzzle3.jpg'
]

function PuzzleGame() {
    const [level, setLevel] = useState(3) // 3x3 grid
    const [selectedImage, setSelectedImage] = useState(PUZZLE_IMAGES[0])
    const [gameStarted, setGameStarted] = useState(false)
    const [timeTaken, setTimeTaken] = useState(0)
    const [timer, setTimer] = useState(null)
    const navigate = useNavigate()

    const startGame = () => {
        setGameStarted(true)
        setTimeTaken(0)
        const startTime = Date.now()
        const timerId = setInterval(() => {
            setTimeTaken(Math.floor((Date.now() - startTime) / 1000))
        }, 1000)
        setTimer(timerId)
    }

    const handleComplete = () => {
        clearInterval(timer)
        saveGameProgress({
            gameId: 'puzzle-game',
            level,
            timeTaken
        })
    }

    const restartGame = () => {
        clearInterval(timer)
        setGameStarted(false)
    }

    return (
        <GameLayout
            title="Puzzle"
            onBack={() => navigate(ROUTES.CHILD_GAMES)}
        >
            {!gameStarted ? (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium mb-2">Choisis un niveau</h3>
                        <div className="flex gap-2">
                            {[3, 4, 5].map((lvl) => (
                                <button
                                    key={lvl}
                                    onClick={() => setLevel(lvl)}
                                    className={`px-4 py-2 rounded ${level === lvl
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                        }`}
                                >
                                    {lvl}x{lvl}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium mb-2">Choisis une image</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {PUZZLE_IMAGES.map((img) => (
                                <button
                                    key={img}
                                    onClick={() => setSelectedImage(img)}
                                    className={`border-2 rounded overflow-hidden ${selectedImage === img ? 'border-primary-600' : 'border-transparent'
                                        }`}
                                >
                                    <img src={img} alt="Puzzle" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={startGame}
                        className="px-6 py-3 bg-primary-600 text-white rounded hover:bg-primary-700"
                    >
                        Commencer
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <div className="mb-4 text-lg">
                        Temps: {timeTaken} secondes
                    </div>
                    <PuzzleBoard
                        size={level}
                        image={selectedImage}
                        onComplete={handleComplete}
                    />
                    <button
                        onClick={restartGame}
                        className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                        Recommencer
                    </button>
                </div>
            )}
        </GameLayout>
    )
}

export default PuzzleGame