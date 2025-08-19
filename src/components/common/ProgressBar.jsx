// src/components/common/ProgressBar.jsx
import PropTypes from 'prop-types'

const ProgressBar = ({ value = 0, max = 100, color = 'primary', className = '' }) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))

    const colorClasses = {
        primary: 'bg-primary-600',
        secondary: 'bg-secondary-600',
        success: 'bg-success-600',
        danger: 'bg-danger-600',
        warning: 'bg-warning-600',
        info: 'bg-blue-600',
        gray: 'bg-gray-600'
    }

    return (
        <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
            <div
                className={`h-2.5 rounded-full ${colorClasses[color]}`}
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    )
}

ProgressBar.propTypes = {
    value: PropTypes.number,
    max: PropTypes.number,
    color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'gray']),
    className: PropTypes.string
}

export default ProgressBar