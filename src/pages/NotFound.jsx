import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../config/routes'
import Button from '../components/common/Button'

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <h1 className="text-9xl font-bold text-primary-600">404</h1>
                <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
                    Page non trouvée
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                    Désolé, nous n'avons pas trouvé la page que vous recherchez.
                </p>
                <div className="mt-8">
                    <Button
                        as={Link}
                        to={ROUTES.HOME}
                        variant="primary"
                        size="lg"
                    >
                        Retour à l'accueil
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NotFound