// src/components/common/Rating.jsx
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function Rating({
    value = 0,
    max = 5,
    onChange,
    interactive = false,
    size = 'md',
    className = ''
}) {
    const [rating, setRating] = useState(value)
    const [hover, setHover] = useState(null)

    useEffect(() => {
        setRating(value)
    }, [value])

    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    }

    const handleClick = (newValue) => {
        if (interactive && onChange) {
            setRating(newValue)
            onChange(newValue)
        }
    }

    return (
        <div className={`flex ${className}`}>
            {[...Array(max)].map((_, index) => {
                const ratingValue = index + 1
                return (
                    <button
                        key={index}
                        type="button"
                        className={`${sizes[size]} ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={() => handleClick(ratingValue)}
                        onMouseEnter={() => interactive && setHover(ratingValue)}
                        onMouseLeave={() => interactive && setHover(null)}
                        disabled={!interactive}
                    >
                        <svg
                            className={`w-full h-full ${(hover || rating) >= ratingValue
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </button>
                )
            })}
        </div>
    )
}

Rating.propTypes = {
    value: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func,
    interactive: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string
}

export default Rating