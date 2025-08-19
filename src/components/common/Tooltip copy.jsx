// src/components/common/Tooltip.jsx
import { useState } from 'react'

function Tooltip({
    children,
    content,
    position = 'top',
    delay = 200
}) {
    const [visible, setVisible] = useState(false)
    const [timeoutId, setTimeoutId] = useState(null)

    const showTooltip = () => {
        const id = setTimeout(() => setVisible(true), delay)
        setTimeoutId(id)
    }

    const hideTooltip = () => {
        clearTimeout(timeoutId)
        setVisible(false)
    }

    const positionClasses = {
        top: 'bottom-full mb-2 left-1/2 transform -translate-x-1/2',
        bottom: 'top-full mt-2 left-1/2 transform -translate-x-1/2',
        left: 'right-full mr-2 top-1/2 transform -translate-y-1/2',
        right: 'left-full ml-2 top-1/2 transform -translate-y-1/2'
    }

    return (
        <div
            className="relative inline-block"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
        >
            {children}
            {visible && (
                <div
                    className={`absolute ${positionClasses[position]} z-10 w-max max-w-xs px-3 py-2 text-sm text-white bg-gray-800 rounded-md shadow-lg`}
                >
                    {content}
                    <div className={`absolute w-2 h-2 bg-gray-800 transform rotate-45 ${position === 'top' ? 'bottom-[-2px] left-1/2 -translate-x-1/2' :
                            position === 'bottom' ? 'top-[-2px] left-1/2 -translate-x-1/2' :
                                position === 'left' ? 'right-[-2px] top-1/2 -translate-y-1/2' :
                                    'left-[-2px] top-1/2 -translate-y-1/2'
                        }`} />
                </div>
            )}
        </div>
    )
}

export default Tooltip