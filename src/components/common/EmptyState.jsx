// src/components/common/EmptyState.jsx
import PropTypes from 'prop-types'

const EmptyState = ({
    title,
    description,
    icon,
    action,
    className = ''
}) => {
    return (
        <div className={`text-center ${className}`}>
            {icon && (
                <div className="mx-auto h-12 w-12 text-gray-400">
                    {icon}
                </div>
            )}
            <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
            {description && (
                <p className="mt-1 text-sm text-gray-500">{description}</p>
            )}
            {action && (
                <div className="mt-6">
                    {action}
                </div>
            )}
        </div>
    )
}

EmptyState.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    icon: PropTypes.node,
    action: PropTypes.node,
    className: PropTypes.string
}

export default EmptyState