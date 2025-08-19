// src/components/games/PuzzleGame/PuzzleBoard.jsx
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import PuzzlePiece from './PuzzlePiece'

const PuzzleBoard = ({ size, image, onComplete }) => {
    const [pieces, setPieces] = useState([])
    const [emptyIndex, setEmptyIndex] = useState(size * size - 1)
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        initializePuzzle()
    }, [size, image])

    const initializePuzzle = () => {
        const totalPieces = size * size
        const puzzlePieces = Array.from({ length: totalPieces - 1 }, (_, i) => i + 1)
        const shuffledPieces = shuffleArray([...puzzlePieces])

        setPieces(shuffledPieces)
        setEmptyIndex(totalPieces - 1)
        setIsComplete(false)
    }

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[array[i], array[j]] = [array[j], array[i]]
        }
        return array
    }

    const handlePieceClick = (index) => {
        if (isComplete) return

        const row = Math.floor(index / size)
        const col = index % size
        const emptyRow = Math.floor(emptyIndex / size)
        const emptyCol = emptyIndex % size

        const isAdjacent =
            (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
            (Math.abs(col - emptyCol) === 1 && row === emptyRow)

        if (isAdjacent) {
            const newPieces = [...pieces]
            newPieces[index] = pieces[emptyIndex] || null
            setPieces(newPieces)
            setEmptyIndex(index)

            checkCompletion(newPieces)
        }
    }

    const checkCompletion = (currentPieces) => {
        const isSolved = currentPieces.every(
            (piece, index) => piece === index + 1 || index === emptyIndex
        )

        if (isSolved) {
            setIsComplete(true)
            onComplete()
        }
    }

    return (
        <div
            className="grid gap-1 bg-gray-200 p-1 rounded-lg"
            style={{
                gridTemplateColumns: `repeat(${size}, 1fr)`,
                width: '400px',
                height: '400px'
            }}
        >
            {Array.from({ length: size * size }).map((_, index) => (
                <PuzzlePiece
                    key={index}
                    index={index}
                    value={pieces[index]}
                    image={image}
                    size={size}
                    isEmpty={index === emptyIndex}
                    onClick={() => handlePieceClick(index)}
                />
            ))}
        </div>
    )
}

PuzzleBoard.propTypes = {
    size: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired
}

export default PuzzleBoard