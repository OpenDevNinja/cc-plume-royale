// src/components/common/Pagination.jsx
import PropTypes from 'prop-types'

const Pagination = ({ currentPage, totalPages, onPageChange, className = '' }) => {
    if (totalPages <= 1) return null

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }

    return (
        <div className={`flex items-center justify-between ${className}`}>
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
            >
                Précédent
            </button>
            <div className="hidden md:flex">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`mx-1 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${page === currentPage
                                ? 'bg-primary-600 text-white border-primary-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
            >
                Suivant
            </button>
        </div>
    )
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default Pagination