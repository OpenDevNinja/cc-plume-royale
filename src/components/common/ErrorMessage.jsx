// src/components/common/ErrorMessage.jsx
import PropTypes from 'prop-types'

const ErrorMessage = ({ message, className = '' }) => {
    if (!message) return null

    return (
        <p className={`text-sm text-danger-600 ${className}`}>
            {message}
        </p>
    )
}

ErrorMessage.propTypes = {
    message: PropTypes.string,
    className: PropTypes.string
}

export default ErrorMessage