import React, { useState } from 'react'
import Button from '@/components/common/Button'

import {
    FiChevronDown,    // Chevron down
    FiCheck           // Checkmark
} from "react-icons/fi";

const FilterDropdown = ({
    options = [],
    value,
    onChange,
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={`relative ${className}`}>
            <Button
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center"
            >
                <span>{options.find(o => o.value === value)?.label || 'Filtrer'}</span>
                <FiChevronDown className="ml-2 h-4 w-4" />
            </Button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            className={`w-full text-left px-4 py-2 text-sm flex items-center ${value === option.value
                                ? 'bg-primary-100 text-primary-700'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            onClick={() => {
                                onChange(option.value)
                                setIsOpen(false)
                            }}
                        >
                            {value === option.value && (
                                <FiCheck className="h-4 w-4 mr-2" />
                            )}
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FilterDropdown