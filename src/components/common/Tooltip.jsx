// src/components/common/Tooltip.jsx
import { useState } from 'react'
import PropTypes from 'prop-types'

const Tooltip = ({ content, children, position = 'top', className = '' }) => {
    const [isVisible, setIsVisible] = useState(false)

    const positionClasses = {
        top: 'bottom-full mb-2',
        right: 'left-full ml-2',
        bottom: 'top-full mt-2',
        left: 'right-full mr-2'
    }

    return (
        <div className={`relative inline-block ${className}`}>
            <div
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                {children}
            </div>
            {isVisible && (
                <div
                    className={`absolute z-10 w-max max-w-xs px-3 py-2 text-sm text-white bg-gray-800 rounded-md shadow-lg ${positionClasses[position]}`}
                >
                    {content}
                    <div
                        className={`absolute w-2 h-2 bg-gray-800 transform rotate-45 ${position === 'top'
                                ? 'top-full left-1/2 -translate-x-1/2 -mt-1'
                                : position === 'right'
                                    ? 'top-1/2 left-0 -translate-y-1/2 -ml-1'
                                    : position === 'bottom'
                                        ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1'
                                        : 'top-1/2 right-0 -translate-y-1/2 -mr-1'
                            }`}
                    ></div>
                </div>
            )}
        </div>
    )
}

Tooltip.propTypes = {
    content: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    className: PropTypes.string
}

export default Tooltip