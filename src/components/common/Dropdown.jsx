// src/components/common/Dropdown.jsx
import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

const Dropdown = ({ trigger, children, align = 'right', className = '' }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const alignmentClasses = {
        right: 'right-0',
        left: 'left-0',
        center: 'left-1/2 transform -translate-x-1/2'
    }

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

            {isOpen && (
                <div
                    className={`absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${alignmentClasses[align]}`}
                >
                    <div className="py-1">{children}</div>
                </div>
            )}
        </div>
    )
}

Dropdown.propTypes = {
    trigger: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    align: PropTypes.oneOf(['right', 'left', 'center']),
    className: PropTypes.string
}

export default Dropdown