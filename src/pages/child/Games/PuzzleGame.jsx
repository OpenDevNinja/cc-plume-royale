// src/pages/child/Games/PuzzleGame.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import GameLayout from '@/components/games/GamesLayout'
import { useGame } from '@/contexts/GameContext'
import { shuffleArray } from '@/utils/helpers'

const PuzzleGame = () => {
    const [puzzlePieces, setPuzzlePieces] = useState([])
    const [selectedPiece, setSelectedPiece] = useState(null)
    const [moves, setMoves] = useState(0)
    const [time, setTime] = useState(0)
    const [gameStarted, setGameStarted] = useState(false)
    const { updateGameProgress } = useGame()
    const navigate = useNavigate()

    // Initialiser le puzzle
    useEffect(() => {
        const initialPieces = Array.from({ length: 9 }, (_, i) => ({
            id: i,
            number: i + 1,
            position: i
        }))
        setPuzzlePieces(shuffleArray(initialPieces))
    }, [])

    // Timer
    useEffect(() => {
        let timer
        if (gameStarted) {
            timer = setInterval(() => {
                setTime(prev => prev + 1)
            }, 1000)
        }
        return () => clearInterval(timer)
    }, [gameStarted])

    const handlePieceClick = (piece) => {
        if (!gameStarted) setGameStarted(true)

        if (!selectedPiece) {
            setSelectedPiece(piece)
            return
        }

        // Échanger les pièces
        setPuzzlePieces(prev => {
            const newPieces = [...prev]
            const piece1Index = newPieces.findIndex(p => p.id === piece.id)
            const piece2Index = newPieces.findIndex(p => p.id === selectedPiece.id)
                ;[newPieces[piece1Index].position, newPieces[piece2Index].position] =
                    [newPieces[piece2Index].position, newPieces[piece1Index].position]
            return newPieces
        })

        setSelectedPiece(null)
        setMoves(prev => prev + 1)
    }

    const checkCompletion = () => {
        return puzzlePieces.every((piece, index) => piece.position === index)
    }

    useEffect(() => {
        if (gameStarted && checkCompletion()) {
            const score = Math.max(0, 1000 - (moves * 10) - (time * 2))
            updateGameProgress('puzzle-game', { score, moves, time })
            setGameStarted(false)
        }
    }, [puzzlePieces, gameStarted, moves, time, updateGameProgress])

    return (
        <GameLayout
            title="Jeu de Puzzle"
            onBack={() => navigate(ROUTES.CHILD_GAMES)}
            stats={[
                { label: 'Mouvements', value: moves },
                { label: 'Temps', value: `${time}s` }
            ]}
        >
            <div className="grid grid-cols-3 gap-2 w-64 h-64 mx-auto">
                {puzzlePieces.sort((a, b) => a.position - b.position).map(piece => (
                    <button
                        key={piece.id}
                        onClick={() => handlePieceClick(piece)}
                        className={`flex items-center justify-center text-2xl font-bold rounded-lg ${selectedPiece?.id === piece.id
                                ? 'bg-primary-200 border-2 border-primary-500'
                                : 'bg-gray-100 hover:bg-gray-200'
                            } ${piece.position === piece.id ? 'bg-green-100' : ''
                            }`}
                    >
                        {piece.number}
                    </button>
                ))}
            </div>

            {checkCompletion() && (
                <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-green-600">Puzzle complété!</h3>
                    <p className="mt-2">Score: {Math.max(0, 1000 - (moves * 10) - (time * 2))}</p>
                    <button
                        onClick={() => {
                            setPuzzlePieces(shuffleArray(puzzlePieces))
                            setMoves(0)
                            setTime(0)
                            setGameStarted(false)
                        }}
                        className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg"
                    >
                        Rejouer
                    </button>
                </div>
            )}
        </GameLayout>
    )
}

export default PuzzleGame