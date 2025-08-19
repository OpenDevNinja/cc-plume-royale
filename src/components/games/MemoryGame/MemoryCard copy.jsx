// src/components/games/MemoryGame/MemoryCard.jsx
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const MemoryCard = ({ card, flippedCards, matchedCards, onClick }) => {
    const [isFlipped, setIsFlipped] = useState(false)

    useEffect(() => {
        setIsFlipped(flippedCards.includes(card.id) || matchedCards.includes(card.id))
    }, [flippedCards, matchedCards, card.id])

    const handleClick = () => {
        if (!isFlipped && flippedCards.length < 2) {
            onClick(card)
        }
    }

    return (
        <button
            onClick={handleClick}
            className={`w-full h-full aspect-square rounded-lg shadow-md transition-transform duration-300 transform ${isFlipped ? 'rotate-y-180' : ''
                }`}
            disabled={matchedCards.includes(card.id)}
        >
            <div className="relative w-full h-full">
                <div
                    className={`absolute inset-0 bg-primary-600 rounded-lg flex items-center justify-center text-white text-4xl font-bold backface-hidden ${isFlipped ? 'rotate-y-180' : ''
                        }`}
                >
                    ?
                </div>
                <div
                    className={`absolute inset-0 bg-white rounded-lg flex items-center justify-center text-4xl font-bold backface-hidden ${isFlipped ? '' : 'rotate-y-180'
                        }`}
                >
                    {card.value}
                </div>
            </div>
        </button>
    )
}

MemoryCard.propTypes = {
    card: PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    }).isRequired,
    flippedCards: PropTypes.arrayOf(PropTypes.string).isRequired,
    matchedCards: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClick: PropTypes.func.isRequired
}

export default MemoryCard