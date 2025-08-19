import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const DashboardLayout = ({ title, children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />

            <div className="lg:pl-64 flex flex-col">
                <Header title={title} />

                <main className="flex-1 pb-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {children || <Outlet />}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout