// src/components/auth/ForgotPasswordForm.jsx
import { useState } from 'react'
import AuthForm from './AuthForm'
import Input from '../common/Input'
import { forgotPassword } from '../../api/auth'
import { showSuccessToast, showErrorToast } from '../common/Toast'

const ForgotPasswordForm = ({ onSuccess }) => {
    const [emailSent, setEmailSent] = useState(false)

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await forgotPassword(values)
            setEmailSent(true)
            showSuccessToast('Un email de réinitialisation a été envoyé')
            onSuccess?.()
        } catch (error) {
            showErrorToast(error.message || 'Une erreur est survenue')
        } finally {
            setSubmitting(false)
        }
    }

    if (emailSent) {
        return (
            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Un email avec les instructions pour réinitialiser votre mot de passe a été envoyé.
                </p>
            </div>
        )
    }

    return (
        <AuthForm
            initialValues={{ email: '' }}
            onSubmit={handleSubmit}
            submitText="Envoyer les instructions"
        >
            <Input
                label="Adresse email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                required
            />
        </AuthForm>
    )
}

export default ForgotPasswordForm