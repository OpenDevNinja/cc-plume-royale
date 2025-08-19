// src/components/auth/RegisterForm.jsx
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../config/routes'
import AuthForm from './AuthForm'
import Input from '../common/Input'
import { register } from '../../api/auth'
import { showSuccessToast, showErrorToast } from '../common/Toast'

const RegisterForm = () => {
    const navigate = useNavigate()

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await register(values)
            showSuccessToast('Compte créé avec succès! Veuillez vous connecter.')
            navigate(ROUTES.LOGIN)
        } catch (error) {
            showErrorToast(error.message || "Erreur lors de la création du compte")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <AuthForm
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: 'parent'
            }}
            onSubmit={handleSubmit}
            submitText="Créer un compte"
        >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                    label="Prénom"
                    name="firstName"
                    type="text"
                    placeholder="Jean"
                    required
                />
                <Input
                    label="Nom"
                    name="lastName"
                    type="text"
                    placeholder="Dupont"
                    required
                />
            </div>
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
            <Input
                label="Confirmer le mot de passe"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
            />
        </AuthForm>
    )
}

export default RegisterForm