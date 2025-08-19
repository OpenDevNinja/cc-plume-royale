// src/components/common/Button.jsx
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    rounded = 'md',
    fullWidth = false,
    disabled = false,
    loading = false,
    className = '',
    ...props
}) => {
    const baseClasses = 'font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

    const variantClasses = {
        primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
        secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white focus:ring-secondary-500',
        outline: 'border border-gray-300 hover:border-gray-400 bg-white text-gray-700 focus:ring-primary-500',
        danger: 'bg-danger-600 hover:bg-danger-700 text-white focus:ring-danger-500',
        success: 'bg-success-600 hover:bg-success-700 text-white focus:ring-success-500',
        ghost: 'hover:bg-gray-100 text-gray-700 focus:ring-primary-500'
    }

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    }

    const roundedClasses = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full'
    }

    const classes = classNames(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        roundedClasses[rounded],
        {
            'w-full': fullWidth,
            'opacity-50 cursor-not-allowed': disabled || loading,
            'pointer-events-none': disabled || loading
        },
        className
    )

    return (
        <button className={classes} disabled={disabled || loading} {...props}>
            {loading ? (
                <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Chargement...
                </span>
            ) : children}
        </button>
    )
}

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger', 'success', 'ghost']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'full']),
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
}

export default Button