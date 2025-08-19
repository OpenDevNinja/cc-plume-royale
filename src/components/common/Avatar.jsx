// src/components/common/Avatar.jsx
import PropTypes from 'prop-types'

const Avatar = ({ src, size = 'md', alt, className = '' }) => {
    const sizeClasses = {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16'
    }

    return (
        <div className={`inline-block rounded-full overflow-hidden ${sizeClasses[size]} ${className}`}>
            {src ? (
                <img src={src} alt={alt} className="h-full w-full object-cover" />
            ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">{alt?.charAt(0)?.toUpperCase() || 'U'}</span>
                </div>
            )}
        </div>
    )
}

Avatar.propTypes = {
    src: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    alt: PropTypes.string,
    className: PropTypes.string
}

export default Avatar