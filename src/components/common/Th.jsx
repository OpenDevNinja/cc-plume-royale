import React from 'react'
import PropTypes from 'prop-types'

const Th = ({ children, className = '', align = 'left', ...props }) => {
    const alignment = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    }

    return (
        <th
            className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${alignment[align]} ${className}`}
            {...props}
        >
            {children}
        </th>
    )
}

Th.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    align: PropTypes.oneOf(['left', 'center', 'right'])
}

export default Th