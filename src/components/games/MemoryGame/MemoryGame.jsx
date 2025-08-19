// src/components/games/MemoryGame/MemoryGame.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../config/routes'
import GameLayout from '../GamesLayout'
import MemoryCard from './MemoryCard'
import MemoryScore from './MemoryScore'
import { saveGameProgress } from '../../../api/games'

const generateCards = () => {
    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼']
    const pairs = [...emojis, ...emojis]
    return pairs
        .map((value, index) => ({ id: `${index}-${value}`, value }))
        .sort(() => Math.random() - 0.5)
}

function MemoryGame() {
    const [cards, setCards] = useState([])
    const [flippedCards, setFlippedCards] = useState([])
    const [matchedCards, setMatchedCards] = useState([])
    const [moves, setMoves] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        startGame()
    }, [])

    useEffect(() => {
        if (flippedCards.length === 2) {
            const [firstId, secondId] = flippedCards
            const firstCard = cards.find(card => card.id === firstId)
            const secondCard = cards.find(card => card.id === secondId)

            if (firstCard.value === secondCard.value) {
                setMatchedCards(prev => [...prev, firstId, secondId])
                setFlippedCards([])
            } else {
                setTimeout(() => setFlippedCards([]), 1000)
            }
            setMoves(prev => prev + 1)
        }
    }, [flippedCards, cards])

    useEffect(() => {
        if (matchedCards.length > 0 && matchedCards.length === cards.length) {
            setGameOver(true)
            saveGameProgress({
                gameId: 'memory-game',
                score: matchedCards.length / 2,
                moves
            })
        }
    }, [matchedCards, cards.length, moves])

    const startGame = () => {
        setCards(generateCards())
        setFlippedCards([])
        setMatchedCards([])
        setMoves(0)
        setGameOver(false)
    }

    const handleCardClick = (card) => {
        if (flippedCards.length < 2 && !flippedCards.includes(card.id)) {
            setFlippedCards(prev => [...prev, card.id])
        }
    }

    return (
        <GameLayout
            title="Jeu de Mémoire"
            onBack={() => navigate(ROUTES.CHILD_GAMES)}
        >
            <MemoryScore
                pairsFound={matchedCards.length / 2}
                totalPairs={cards.length / 2}
                moves={moves}
            />

            <div className="grid grid-cols-4 gap-4 mt-6">
                {cards.map(card => (
                    <MemoryCard
                        key={card.id}
                        card={card}
                        flippedCards={flippedCards}
                        matchedCards={matchedCards}
                        onClick={handleCardClick}
                    />
                ))}
            </div>

            {gameOver && (
                <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold mb-2">Bravo!</h3>
                    <p className="mb-4">Tu as trouvé toutes les paires en {moves} coups!</p>
                    <button
                        onClick={startGame}
                        className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                    >
                        Rejouer
                    </button>
                </div>
            )}
        </GameLayout>
    )
}

export default MemoryGame