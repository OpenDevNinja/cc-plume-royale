// src/components/common/Modal.jsx
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

function Modal({
    isOpen,
    onClose,
    title,
    children,
    actionText,
    onAction,
    cancelText = 'Annuler',
    size = 'md',
    disableBackdropClose = false
}) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

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
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity"
                    onClick={!disableBackdropClose ? onClose : undefined}
                >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                <div className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${sizeClasses[size]} w-full`}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {title}
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                onClick={onClose}
                            >
                                <span className="sr-only">Close</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-4">
                            {children}
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        {onAction && (
                            <Button
                                onClick={onAction}
                                className="w-full sm:ml-3 sm:w-auto"
                            >
                                {actionText}
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="mt-3 w-full sm:mt-0 sm:w-auto"
                        >
                            {cancelText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    actionText: PropTypes.string,
    onAction: PropTypes.func,
    cancelText: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl']),
    disableBackdropClose: PropTypes.bool
}

export default Modal