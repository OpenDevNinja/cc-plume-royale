// src/components/common/Modal.jsx
import { useEffect } from 'react'
import PropTypes from 'prop-types'

const Modal = ({ isOpen, onClose, title, children, size = 'md', className = '' }) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'auto'
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl'
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div
                        className="absolute inset-0 bg-gray-500 opacity-75"
                        onClick={onClose}
                    ></div>
                </div>

                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>

                <div
                    className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${sizeClasses[size]} w-full ${className}`}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                {title && (
                                    <h3
                                        className="text-lg leading-6 font-medium text-gray-900 mb-4"
                                        id="modal-headline"
                                    >
                                        {title}
                                    </h3>
                                )}
                                <div className="mt-2">{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl']),
    className: PropTypes.string
}

export default Modal