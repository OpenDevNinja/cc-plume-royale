// src/components/games/MemoryGame/MemoryCard.jsx
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function MemoryCard({
    id,
    emoji,
    isFlipped,
    isMatched,
    onClick,
    delay = 0
}) {
    const [isLocalFlipped, setIsLocalFlipped] = useState(isFlipped)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        if (isFlipped !== isLocalFlipped) {
            setIsAnimating(true)
            const timer = setTimeout(() => {
                setIsLocalFlipped(isFlipped)
                setIsAnimating(false)
            }, delay)
            return () => clearTimeout(timer)
        }
    }, [isFlipped, isLocalFlipped, delay])

    const handleClick = () => {
        if (!isLocalFlipped && !isMatched && !isAnimating) {
            onClick(id)
        }
    }

    return (
        <button
            onClick={handleClick}
            className={`w-full h-full aspect-square rounded-lg flex items-center justify-center text-4xl transition-all duration-300 transform ${isLocalFlipped ? 'rotate-y-180 bg-white' : 'bg-primary-600'
                } ${isMatched ? 'opacity-50' : 'cursor-pointer hover:scale-105'
                }`}
            disabled={isMatched || isLocalFlipped || isAnimating}
        >
            <div className={`${isLocalFlipped ? 'block' : 'hidden'}`}>
                {emoji}
            </div>
            <div className={`${isLocalFlipped ? 'hidden' : 'block'}`}>
                ❓
            </div>
        </button>
    )
}

MemoryCard.propTypes = {
    id: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    isFlipped: PropTypes.bool.isRequired,
    isMatched: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    delay: PropTypes.number
}

export default MemoryCard