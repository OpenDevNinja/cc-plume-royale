// src/components/games/MathGame/MathResults.jsx
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../config/routes'

const MathResults = ({ score, onRestart, onBack }) => {
    const navigate = useNavigate()

    const getMessage = () => {
        if (score < 5) return "Tu peux faire mieux!"
        if (score < 10) return "Bon travail!"
        return "Excellent!"
    }

    return (
        <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Jeu terminé!</h2>
            <p className="text-xl">Ton score final: {score}</p>
            <p className="text-lg">{getMessage()}</p>
            <div className="flex justify-center gap-4">
                <button
                    onClick={onRestart}
                    className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                >
                    Rejouer
                </button>
                <button
                    onClick={() => navigate(ROUTES.CHILD_GAMES)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                    Retour aux jeux
                </button>
            </div>
        </div>
    )
}

MathResults.propTypes = {
    score: PropTypes.number.isRequired,
    onRestart: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired
}

export default MathResults