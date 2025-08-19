// src/components/layout/MobileNav.jsx
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function MobileNav({ navigation }) {
    const [open, setOpen] = useState(false)
    const location = useLocation()

    return (
        <>
            <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                onClick={() => setOpen(true)}
            >
                <span className="sr-only">Ouvrir le menu</span>
                <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-40 md:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="hidden sm:block sm:fixed sm:inset-0 sm:bg-gray-600 sm:bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto h-full">
                                <div className="px-4 pt-5 pb-2 flex">
                                    <button
                                        type="button"
                                        className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Fermer le menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="mt-6 px-4">
                                    <nav className="grid gap-y-8">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    location.pathname === item.href
                                                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                                                        : 'border-transparent text-gray-600 hover:bg-gray-50',
                                                    '-m-3 p-3 flex items-center rounded-md border-l-4'
                                                )}
                                                onClick={() => setOpen(false)}
                                            >
                                                <item.icon
                                                    className={classNames(
                                                        location.pathname === item.href
                                                            ? 'text-primary-500'
                                                            : 'text-gray-400',
                                                        'flex-shrink-0 h-6 w-6'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                <span className="ml-3 text-base font-medium">{item.name}</span>
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

MobileNav.propTypes = {
    navigation: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
            icon: PropTypes.elementType.isRequired
        })
    ).isRequired
}

export default MobileNav