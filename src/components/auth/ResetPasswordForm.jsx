// src/components/auth/ResetPasswordForm.jsx
import { useNavigate, useSearchParams } from 'react-router-dom'
import AuthForm from './AuthForm'
import Input from '../common/Input'
import { resetPassword } from '../../api/auth'
import { showSuccessToast, showErrorToast } from '../common/Toast'

const ResetPasswordForm = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const token = searchParams.get('token')

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await resetPassword({ ...values, token })
            showSuccessToast('Mot de passe réinitialisé avec succès!')
            navigate('/login')
        } catch (error) {
            showErrorToast(error.message || 'Erreur lors de la réinitialisation')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <AuthForm
            initialValues={{ password: '', confirmPassword: '' }}
            onSubmit={handleSubmit}
            submitText="Réinitialiser le mot de passe"
        >
            <Input
                label="Nouveau mot de passe"
                name="password"
                type="password"
                placeholder="••••••••"
                required
            />
            <Input
                label="Confirmer le nouveau mot de passe"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
            />
        </AuthForm>
    )
}

export default ResetPasswordForm