import React from 'react'
import PropTypes from 'prop-types'

const Tr = ({ children, className = '', hover = false, ...props }) => {
    return (
        <tr
            className={`${hover ? 'hover:bg-gray-50' : ''} ${className}`}
            {...props}
        >
            {children}
        </tr>
    )
}

Tr.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    hover: PropTypes.bool
}

export default Tr