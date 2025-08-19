import React from 'react'
import PropTypes from 'prop-types'

const Thead = ({ children, className = '', ...props }) => {
    return (
        <thead className={`bg-gray-50 ${className}`} {...props}>
            {children}
        </thead>
    )
}

Thead.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}

export default Thead 