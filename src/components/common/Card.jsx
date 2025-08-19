// src/components/common/Card.jsx
import PropTypes from 'prop-types'

const Card = ({ children, className = '', hoverEffect = false, ...props }) => {
    return (
        <div
            className={`bg-white overflow-hidden shadow rounded-lg ${hoverEffect ? 'hover:shadow-md transition-shadow duration-200' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    hoverEffect: PropTypes.bool
}

export default Card