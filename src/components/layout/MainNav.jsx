// src/components/layout/MainNav.jsx
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function MainNav({ navigation }) {
    const location = useLocation()

    return (
        <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
                <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                        location.pathname === item.href
                            ? 'border-primary-500 text-gray-900'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                    )}
                >
                    {item.name}
                </Link>
            ))}
        </nav>
    )
}

MainNav.propTypes = {
    navigation: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired
        })
    ).isRequired
}

export default MainNav