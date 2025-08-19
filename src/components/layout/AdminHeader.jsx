import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../config/routes'
import Avatar from '../common/Avatar'
import Button from '../common/Button'
import { useAuth } from '../../hooks/useAuth'
import {
  FiBell,          // Notification
  FiSettings,      // Cog/Paramètres
  FiLogOut,        // Déconnexion
  FiSearch         // Recherche
} from "react-icons/fi";


const AdminHeader = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to={ROUTES.ADMIN_DASHBOARD}>
              <img
                className="h-8 w-auto"
                src="/assets/images/logo-admin.png"
                alt="Admin Logo"
              />
            </Link>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md ml-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="ml-4 flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <FiBell className="h-6 w-6" />
            </button>

            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <FiSettings className="h-6 w-6" />
            </button>

            <div className="relative ml-3">
              <div className="flex items-center space-x-2">
                <Avatar src={user?.avatar} size="sm" />
                <span className="text-sm font-medium text-gray-700">
                  {user?.firstName}
                </span>
              </div>

              {/* Dropdown menu */}
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                <Button
                  variant="ghost"
                  icon={FiLogOut}
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader