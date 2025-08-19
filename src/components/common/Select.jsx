// src/components/common/Select.jsx
import PropTypes from 'prop-types'

const Select = ({
    label,
    id,
    name,
    value,
    onChange,
    options = [],
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
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${disabled ? 'bg-gray-100' : ''
                    } ${error ? 'border-danger-500' : ''}`}
                {...props}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <ErrorMessage message={error} className="mt-1" />}
        </div>
    )
}

Select.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.any.isRequired,
            label: PropTypes.string.isRequired
        })
    ),
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    className: PropTypes.string
}

export default Select