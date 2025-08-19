import React from 'react'
import PropTypes from 'prop-types'

const Tbody = ({ children, className = '', ...props }) => {
    return (
        <tbody className={`bg-white divide-y divide-gray-200 ${className}`} {...props}>
            {children}
        </tbody>
    )
}

Tbody.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}

export default Tbody