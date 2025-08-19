// src/components/common/Icon.jsx
import PropTypes from 'prop-types'

const Icon = ({
    icon,
    size = 'md',
    color = 'currentColor',
    className = ''
}) => {
    const sizeClasses = {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
        xl: 'h-8 w-8'
    }

    return (
        <svg
            className={`${sizeClasses[size]} ${className}`}
            fill="none"
            stroke={color}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            {icon}
        </svg>
    )
}

Icon.propTypes = {
    icon: PropTypes.node.isRequired,
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    color: PropTypes.string,
    className: PropTypes.string
}

export default Icon