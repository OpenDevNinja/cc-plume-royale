// src/components/games/PuzzleGame/PuzzlePiece.jsx
import PropTypes from 'prop-types'

const PuzzlePiece = ({ index, value, image, size, isEmpty, onClick }) => {
    if (isEmpty) {
        return <div className="bg-gray-300 rounded" />
    }

    const row = Math.floor(value / size)
    const col = value % size
    const backgroundPosition = `${(col / (size - 1)) * 100}% ${(row / (size - 1)) * 100}%`
    const backgroundSize = `${size * 100}%`

    return (
        <button
            onClick={onClick}
            className="overflow-hidden rounded hover:opacity-90 transition-opacity"
            style={{
                backgroundImage: `url(${image})`,
                backgroundPosition,
                backgroundSize
            }}
        />
    )
}

PuzzlePiece.propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    isEmpty: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

export default PuzzlePiece