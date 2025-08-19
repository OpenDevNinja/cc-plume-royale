import React from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../config/routes'

import {
    FiHome,            // Home
    FiBookOpen,        // Book
    
    FiAward,           // Trophy
    FiUser             // User
} from "react-icons/fi";
import { MdOutlineExtension } from 'react-icons/md';

const ChildSidebar = () => {
    const navItems = [
        {
            name: 'Mon Tableau',
            icon: FiHome,
            path: ROUTES.CHILD_DASHBOARD
        },
        {
            name: 'Ressources',
            icon: FiBookOpen,
            path: ROUTES.CHILD_RESOURCES
        },
        {
            name: 'Jeux',
            icon: MdOutlineExtension,
            path: ROUTES.CHILD_GAMES
        },
        {
            name: 'Mes Badges',
            icon: FiAward,
            path: ROUTES.CHILD_BADGES
        },
        {
            name: 'Mon Profil',
            icon: FiUser,
            path: ROUTES.CHILD_PROFILE
        }
    ]

    return (
        <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
                <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center px-4">
                        <img
                            className="h-8 w-auto"
                            src="/assets/images/logo-child.png"
                            alt="Child Logo"
                        />
                    </div>

                    {/* Navigation */}
                    <nav className="mt-5 flex-1 px-2 space-y-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
                                        ? 'bg-primary-50 text-primary-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`
                                }
                            >
                                <item.icon
                                    className={`mr-3 h-5 w-5 ${location.pathname === item.path
                                            ? 'text-primary-500'
                                            : 'text-gray-400 group-hover:text-gray-500'
                                        }`}
                                />
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default ChildSidebar