// src/components/games/MemoryGame/MemoryScore.jsx
import PropTypes from 'prop-types'

const MemoryScore = ({ pairsFound, totalPairs, moves }) => {
    return (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
            <div className="text-center">
                <p className="text-sm text-gray-500">Paires trouvées</p>
                <p className="text-xl font-bold">
                    {pairsFound} / {totalPairs}
                </p>
            </div>
            <div className="text-center">
                <p className="text-sm text-gray-500">Coups</p>
                <p className="text-xl font-bold">{moves}</p>
            </div>
        </div>
    )
}

MemoryScore.propTypes = {
    pairsFound: PropTypes.number.isRequired,
    totalPairs: PropTypes.number.isRequired,
    moves: PropTypes.number.isRequired
}

export default MemoryScore