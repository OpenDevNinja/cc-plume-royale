// src/components/layout/AuthLayout.jsx
import { Link, Outlet } from 'react-router-dom'
import { ROUTES } from '../../config/routes'

function AuthLayout() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link to={ROUTES.HOME}>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="/assets/images/logo.png"
                        alt="C.C. Plume Royale"
                    />
                </Link>
                
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AuthLayout