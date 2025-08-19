// src/components/common/Badge.jsx
import PropTypes from 'prop-types'

const Badge = ({ children, variant = 'primary', className = '' }) => {
    const variantClasses = {
        primary: 'bg-primary-100 text-primary-800',
        secondary: 'bg-secondary-100 text-secondary-800',
        success: 'bg-success-100 text-success-800',
        danger: 'bg-danger-100 text-danger-800',
        warning: 'bg-warning-100 text-warning-800',
        info: 'bg-blue-100 text-blue-800',
        gray: 'bg-gray-100 text-gray-800'
    }

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
        >
            {children}
        </span>
    )
}

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'gray']),
    className: PropTypes.string
}

export default Badge