// src/components/layout/AuthLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import AuthImageSection from '../auth/AuthImageSection';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
            {/* Section Image */}
            <AuthImageSection />

            {/* Section Formulaire */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="mt-2 text-sm text-gray-600">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {children}

                    <div className="text-center text-sm">
                        <Link
                            to={ROUTES.LOGIN}
                            className="font-medium text-primary-600 hover:text-primary-500"
                        >
                            Retour à la connexion
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;