// src/components/common/Breadcrumbs.jsx
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Breadcrumbs = ({ items }) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                {items.map((item, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            {index > 0 && (
                                <svg
                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                            {item.href ? (
                                <Link
                                    to={item.href}
                                    className={`text-sm font-medium ${index === items.length - 1
                                            ? 'text-gray-500 hover:text-gray-700'
                                            : 'text-gray-400 hover:text-gray-500'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-sm font-medium text-gray-500">{item.label}</span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    )
}

Breadcrumbs.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            href: PropTypes.string
        })
    ).isRequired
}

export default Breadcrumbs