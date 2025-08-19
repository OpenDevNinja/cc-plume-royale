// src/components/auth/LoginForm.jsx
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../config/routes'
import AuthForm from './AuthForm'
import Input from '../common/Input'
import { useAuth } from '../../hooks/useAuth'
import { showErrorToast } from '../common/Toast'

const LoginForm = () => {
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const result = await login(values)
            if (!result.success) {
                showErrorToast(result.message || 'Email ou mot de passe incorrect')
            }
        } catch (error) {
            showErrorToast('Une erreur est survenue lors de la connexion')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <AuthForm
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSubmit}
        >
            <Input
                label="Adresse email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                required
            />
            <Input
                label="Mot de passe"
                name="password"
                type="password"
                placeholder="••••••••"
                required
            />
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Se souvenir de moi
                    </label>
                </div>
                <div className="text-sm">
                    <button
                        type="button"
                        onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
                        className="font-medium text-primary-600 hover:text-primary-500"
                    >
                        Mot de passe oublié ?
                    </button>
                </div>
            </div>
        </AuthForm>
    )
}

export default LoginForm