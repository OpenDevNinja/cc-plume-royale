import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../config/routes'
import Avatar from '../common/Avatar'
import Button from '../common/Button'

import { useAuth } from '../../hooks/useAuth'
import {
    FiHome,          // Home
    FiAward,         // Trophy
    FiBookOpen       // Book
} from "react-icons/fi";
const ChildHeader = () => {
    const { user, logout } = useAuth()

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to={ROUTES.CHILD_DASHBOARD} className="flex-shrink-0">
                        <img
                            className="h-8 w-auto"
                            src="/assets/images/logo-child.png"
                            alt="Child Logo"
                        />
                    </Link>

                    {/* Navigation */}
                    <nav className="flex space-x-8">
                        <Link
                            to={ROUTES.CHILD_DASHBOARD}
                            className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        >
                            <FiHome className="h-5 w-5 mr-1" />
                            Accueil
                        </Link>
                        <Link
                            to={ROUTES.CHILD_GAMES}
                            className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        >
                            <FiAward className="h-5 w-5 mr-1" />
                            Jeux
                        </Link>
                        <Link
                            to={ROUTES.CHILD_RESOURCES}
                            className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        >
                            <FiBookOpen className="h-5 w-5 mr-1" />
                            Ressources
                        </Link>
                    </nav>

                    {/* User profile */}
                    <div className="ml-4 flex items-center">
                        <Avatar src={user?.avatar} size="sm" />
                        <span className="ml-2 text-sm font-medium text-gray-700">
                            {user?.firstName}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default ChildHeader