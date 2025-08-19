import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const RadioGroupContext = createContext()

const RadioGroup = ({ children, value, onChange, className = '' }) => {
    return (
        <RadioGroupContext.Provider value={{ value, onChange }}>
            <div className={className}>{children}</div>
        </RadioGroupContext.Provider>
    )
}

const RadioOption = ({ value, children }) => {
    const { value: selectedValue, onChange } = useContext(RadioGroupContext)

    return (
        <label className="flex items-center space-x-3 cursor-pointer">
            <input
                type="radio"
                checked={selectedValue === value}
                onChange={() => onChange(value)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span>{children}</span>
        </label>
    )
}

RadioGroup.propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}

RadioOption.propTypes = {
    value: PropTypes.any.isRequired,
    children: PropTypes.node.isRequired
}

RadioGroup.Option = RadioOption

export default RadioGroup