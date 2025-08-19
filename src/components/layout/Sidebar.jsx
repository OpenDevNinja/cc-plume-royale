// src/components/layout/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'


function Sidebar({ navigation }) {
    const { pathname } = useLocation()

    return (
        <aside className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-64 border-r border-gray-100 bg-gradient-to-b from-white to-gray-50">
                <div className="flex flex-col flex-1 pt-6 pb-4 overflow-y-auto">
                    <nav className="flex-1 px-4 space-y-2">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={`nav-${item.name}`}
                                    to={item.href}
                                    className={classNames(
                                        isActive
                                            ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-500'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                                        'group flex items-center px-3 py-2.5 text-sm font-medium rounded-r-md transition-all duration-200 ease-in-out'
                                    )}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    <item.icon
                                        className={classNames(
                                            isActive
                                                ? 'text-primary-500'
                                                : 'text-gray-400 group-hover:text-gray-600',
                                            'mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200'
                                        )}
                                        aria-hidden="true"
                                    />
                                    <span className="truncate">{item.name}</span>
                                    {isActive && (
                                        <span className="ml-auto w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                                    )}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* Footer optionnel pour la Sidebar */}
                <div className="p-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500 text-center">
                        Version 
                    </div>
                </div>
            </div>
        </aside>
    )
}

Sidebar.propTypes = {
    navigation: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
            icon: PropTypes.elementType.isRequired
        })
    ).isRequired
}

export default Sidebar