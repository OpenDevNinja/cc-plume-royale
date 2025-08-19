import React from 'react'
import PropTypes from 'prop-types'

const Td = ({ children, className = '', align = 'left', ...props }) => {
    const alignment = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    }

    return (
        <td
            className={`px-6 py-4 whitespace-nowrap ${alignment[align]} ${className}`}
            {...props}
        >
            {children}
        </td>
    )
}

Td.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    align: PropTypes.oneOf(['left', 'center', 'right'])
}

export default Td