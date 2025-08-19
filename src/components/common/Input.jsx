// src/components/common/Input.jsx
import PropTypes from 'prop-types'

const Input = ({
    label,
    id,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className={className}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-danger-500"> *</span>}
                </label>
            )}
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`block w-full rounded-md shadow-sm border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${disabled ? 'bg-gray-100' : ''
                    } ${error ? 'border-danger-500' : ''}`}
                {...props}
            />
            {error && <ErrorMessage message={error} className="mt-1" />}
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    className: PropTypes.string
}

export default Input