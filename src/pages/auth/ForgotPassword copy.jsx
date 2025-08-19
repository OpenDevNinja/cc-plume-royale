// src/pages/auth/ForgotPassword.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import { requestPasswordReset } from '@/data/services/authService'
import { showSuccessNotification } from '@/utils/notifications'


function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsSubmitting(true)
            await requestPasswordReset(email)
            showSuccessNotification('Email de réinitialisation envoyé!')
            setMessage('Un email avec les instructions a été envoyé à votre adresse.')
        } catch (error) {
            setMessage(error.message || 'Une erreur est survenue')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Adresse email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {message && (
                    <div className="rounded-md bg-blue-50 p-4">
                        <p className="text-sm text-blue-700">{message}</p>
                    </div>
                )}

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                >
                    Envoyer les instructions
                </Button>
            </form>

            <div className="mt-6 text-center text-sm">
                <Link to={ROUTES.LOGIN} className="text-primary-600 hover:text-primary-500">
                    Retour à la connexion
                </Link>
            </div>
        </>
    )
}

export default ForgotPassword