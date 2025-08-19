// src/pages/child/Games/MemoryGame.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import GameLayout from '@/components/games/GamesLayout'
import { useGame } from '@/contexts/GameContext'
import { showSuccessNotification } from '@/utils/notifications'

const cardSymbols = ['🍎', '🍌', '🍒', '🍓', '🍊', '🍋', '🍐', '🍉']

function MemoryGame() {
    const [cards, setCards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [matched, setMatched] = useState([])
    const [moves, setMoves] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const { updateGameProgress } = useGame()
    const navigate = useNavigate()

    // Initialiser le jeu
    useEffect(() => {
        startGame()
    }, [])

    const startGame = () => {
        // Créer des paires de cartes
        const cardPairs = [...cardSymbols, ...cardSymbols]
        // Mélanger les cartes
        const shuffled = cardPairs
            .sort(() => Math.random() - 0.5)
            .map((symbol, index) => ({ id: index, symbol, flipped: false }))

        setCards(shuffled)
        setFlipped([])
        setMatched([])
        setMoves(0)
        setGameOver(false)
    }

    const handleCardClick = (id) => {
        // Ne pas permettre plus de 2 cartes retournées
        if (flipped.length >= 2 || flipped.includes(id) || matched.includes(id)) {
            return
        }

        const newFlipped = [...flipped, id]
        setFlipped(newFlipped)

        // Mettre à jour l'état des cartes
        setCards(cards.map(card =>
            card.id === id ? { ...card, flipped: true } : card
        ))

        // Vérifier les correspondances
        if (newFlipped.length === 2) {
            setMoves(moves + 1)
            const [firstId, secondId] = newFlipped
            const firstCard = cards.find(c => c.id === firstId)
            const secondCard = cards.find(c => c.id === secondId)

            if (firstCard.symbol === secondCard.symbol) {
                setMatched([...matched, firstId, secondId])
                if (matched.length + 2 === cards.length) {
                    endGame()
                }
            } else {
                setTimeout(() => {
                    setCards(cards.map(card =>
                        newFlipped.includes(card.id) ? { ...card, flipped: false } : card
                    ))
                }, 1000)
            }
            setFlipped([])
        }
    }

    const endGame = async () => {
        setGameOver(true)
        const score = Math.floor(1000 / moves) // Score basé sur le nombre de mouvements
        await updateGameProgress('memory-game', {
            score,
            moves,
            timePlayed: moves * 2 // Estimation du temps passé
        })
        showSuccessNotification(`Score final: ${score}`)
    }

    return (
        <GameLayout
            title="Jeu de Mémoire"
            onBack={() => navigate(ROUTES.CHILD_GAMES)}
        >
            <div className="text-center mb-4">
                <p>Mouvements: {moves} | Paires trouvées: {matched.length / 2}</p>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {cards.map(card => (
                    <div
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        className={`h-24 flex items-center justify-center text-4xl rounded-lg cursor-pointer transition-all ${card.flipped || matched.includes(card.id)
                                ? 'bg-white shadow-md'
                                : 'bg-primary-600 text-white hover:bg-primary-700'
                            }`}
                    >
                        {(card.flipped || matched.includes(card.id)) ? card.symbol : '?'}
                    </div>
                ))}
            </div>

            {gameOver && (
                <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold mb-2">Félicitations!</h3>
                    <p>Vous avez complété le jeu en {moves} mouvements.</p>
                    <button
                        onClick={startGame}
                        className="mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                    >
                        Rejouer
                    </button>
                </div>
            )}
        </GameLayout>
    )
}

export default MemoryGame