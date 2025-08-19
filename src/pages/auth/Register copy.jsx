// src/pages/auth/Register.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../config/routes'
import AuthLayout from '../../components/layout/AuthLayout'
import { useAuth } from '../../hooks/useAuth'
import RegisterForm from '../../components/auth/RegisterForm'
import SocialAuthButtons from '../../components/auth/SocialAuthButtons'

function Register() {
    const { register } = useAuth()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (values) => {
        try {
            await register(values)
            navigate(ROUTES.PARENT_DASHBOARD)
        } catch (err) {
            setError(err.message || 'Une erreur est survenue lors de l\'inscription')
        }
    }

    return (
        <AuthLayout
            title="Créer un compte"
            subtitle="Commencez votre aventure éducative"
        >
            <div className="space-y-6">
                {error && (
                    <div className="rounded-md bg-danger-50 p-4">
                        <div className="text-danger-700">{error}</div>
                    </div>
                )}

                <RegisterForm onSubmit={handleSubmit} />

                <SocialAuthButtons />

                <div className="text-center text-sm text-gray-500">
                    Déjà un compte?{' '}
                    <Link to={ROUTES.LOGIN} className="text-primary-600 hover:text-primary-500">
                        Se connecter
                    </Link>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Register