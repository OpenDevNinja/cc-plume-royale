// src/components/common/SearchInput.jsx
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const SearchInput = ({ value = '', onChange, placeholder = 'Rechercher...', delay = 300, className = '' }) => {
    const [inputValue, setInputValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            onChange(inputValue)
        }, delay)

        return () => {
            clearTimeout(timer)
        }
    }, [inputValue, delay, onChange])

    useEffect(() => {
        setInputValue(value)
    }, [value])

    return (
        <div className={`relative ${className}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </div>
    )
}

SearchInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    delay: PropTypes.number,
    className: PropTypes.string
}

export default SearchInput