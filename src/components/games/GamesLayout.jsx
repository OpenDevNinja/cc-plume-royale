// src/components/games/GamesLayout.jsx
import PropTypes from 'prop-types'
import Button from '../common/Button'

const GamesLayout = ({ title, onBack, children }) => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">{title}</h1>
                <Button onClick={onBack} variant="outline">
                    Retour
                </Button>
            </div>
            {children}
        </div>
    )
}

GamesLayout.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default GamesLayout