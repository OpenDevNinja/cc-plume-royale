// src/components/layout/UserDropdown.jsx
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../config/routes'
import Avatar from '../common/Avatar'
import PropTypes from 'prop-types'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function UserDropdown({ user, logout }) {
    return (
        <Menu as="div" className="relative ml-3">
            <div>
                <Menu.Button className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                    <span className="sr-only">Ouvrir le menu utilisateur</span>
                    <Avatar src={user.avatar} alt={user.name} />
                    <span className="ml-2 text-sm font-medium text-gray-700 hidden md:inline">
                        {user.name}
                    </span>
                    <ChevronDownIcon
                        className="ml-1 h-5 w-5 text-gray-400 hidden md:inline"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {({ active }) => (
                            <Link
                                to={ROUTES.PARENT_PROFILE}
                                className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                )}
                            >
                                Mon profil
                            </Link>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <Link
                                to={ROUTES.PARENT_SETTINGS}
                                className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                )}
                            >
                                Paramètres
                            </Link>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                onClick={logout}
                                className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'w-full text-left px-4 py-2 text-sm text-gray-700'
                                )}
                            >
                                Déconnexion
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

UserDropdown.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

export default UserDropdown